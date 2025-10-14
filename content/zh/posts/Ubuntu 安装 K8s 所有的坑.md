---
title: Maple-Theme 配合 Maple-font
date: 2025-10-15T04:10:14+08:00
lastmod: 2025-10-15T04:10:14+08:00
tags:
  - problem
  - ubuntu
  - kubernetes
  - cicd
  - nacos
author: Dorianyang
draft: false
showToc: true
TocOpen: false
hidemeta: false
comments: true
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
ShowRssButtonInSectionTermList: true
UseHugoToc: true
---
### 在ubuntu 安装时，手动配置 ipv4，name servers 和 searchdomains 是什么
4. Name Servers（DNS 服务器）
用于解析域名。例如：
	•	8.8.8.8, 8.8.4.4（Google DNS）
	•	或者你网络提供商的 DNS，如 114.114.114.114

填写多个时用 逗号分隔。

5. Search Domains（搜索域）
这个选项是为了方便局域网域名解析。举个例子：
	•	如果你填写了 example.com，当你在终端中访问 server1，系统会自动尝试解析为 server1.example.com。
	•	多个域名可以用空格分隔：example.com local.lan

这主要用于企业或学校内的内网环境，不填也可以。

### 我使用虚拟机和 NAT 网络，如何配置代理？我的宿主机上使用 Clash
确认 Clash 开放了公网访问（监听 0.0.0.0）

编辑 Clash 的配置文件 ~/.config/clash/config.yaml 或 clash.meta.yaml，确保监听地址改为：
```yaml
mixed-port: 7890
allow-lan: true   # ✅ 允许局域网设备访问 Clash
bind-address: 0.0.0.0  # ✅ 不要写 127.0.0.1
```
在虚拟机中设置代理
在 Ubuntu 虚拟机里，可以这样设置环境变量方式配置代理：
```bash
export http_proxy="http://192.168.79.1:7890"
export https_proxy="http://192.168.79.1:7890"
export all_proxy="socks5://192.168.79.1:7891"
```
### K8s 安装软件仓库地址
关于 https://github.com/kubernetes/kubernetes/issues/123673 ，
Kubernetes 更改了其软件包仓库（repository）的地址。旧的仓库地址（通常是 apt.kubernetes.io）已弃用，并迁移到了新的地址 pkgs.k8s.io

首先我们要删除原来的/etc/apt/sources.list.d/kubernetes.list或者是中央sources.list中的k8s相关
然后
```bash
echo "deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```
```
$ curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
```
/etc/apt/keyrings/这个文件夹可能需要自己创建
然后
```bash
sudo apt update

sudo apt install -y kubelet kubeadm kubectl
```
### K8s初始化
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
`kubectl get nodes 

### 删除pods
只需要删除对应的配置文件即可，比如
```zsh
kubectl delete -f kube-flannel.yml
```
### 安装网络组件
在安装前，需要运行
```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```
### 安装MySQL Pod
注意一定要有PV和PVC，否则PVC无法正确创建。不是所有的环境都能够自动配置StorageLCass
### 安装Nacos
https://github.com/nacos-group/nacos-k8s/blob/master/README-CN.md
### 彻底恢复 PV
```
kubectl get pv mysql-data-pv
```
删除整个claimRef块

### NodePort 与 ClusterIP
准确来说设置 NodePort 没什么影响，只是会扩大暴露范围，并且它是有范围的
```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    name: mysql
spec:
  type: NodePort                   # <— makes it reachable on the node’s IP
  selector:
    name: mysql
  ports:
    - port:     33066              # <— the “internal” ClusterIP port (clients in-cluster)
      targetPort: 3306             # <— the container’s actual listening port
      nodePort:   33066            # <— the port on each node’s IP
```
范围可调
## Nacos pod has unbound immediate PersistentVolumeClaims
```bash
$ kubectl get pvc data-nacos-0

NAME           STATUS    VOLUME   CAPACITY   ACCESS MODES   STORAGECLASS          AGE

data-nacos-0   Pending                                      managed-nfs-storage   3d19h
```
查看它的情况
```bash
kubectl describe pvc data-nacos-0

...Waiting for a volume to be created either by the external provisioner 'fuseim.pri/ifs' or manually by the system administrator
```
此处显示，也就是我们的nfs-storageclass的设置
```bash
provisioner: fuseim.pri/ifs
```
但在我们的nfs-development中
```yaml
env:
  - name: PROVISIONER_NAME
    value: k8s-sigs.io/nfs-subdir-external-provisioner
```
所以需要修改nfs-storageclass
```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-nfs-storage
provisioner: k8s-sigs.io/nfs-subdir-external-provisioner    # ← must match PROVISIONER_NAME
parameters:
  server: "192.168.79.143"           # your NFS server
  share:  "/nfs/data/nfs-share"      # the same NFS_PATH you gave the pod
  archiveOnDelete: "false"
reclaimPolicy: Delete
volumeBindingMode: Immediate
```
这时候删除data-nacos-0
#### kubectl delete pvc data-nacos-0 会卡住
先看看是否有阻碍它的finalizers
```bash
kubectl get pvc data-nacos-0 -o jsonpath='{.metadata.finalizers}'
# e.g. ["kubernetes.io/pvc-protection"]
```
然后清除
```bash
kubectl patch pvc data-nacos-0 \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge
```
然后删除其绑定的 pv
```bash
kubectl get pv

kubectl delete pv <pv-name>
```
pv大概率也会卡住，所以也要清除
```bash
kubectl patch pv mysql-data-pv \
  -p '{"metadata":{"finalizers":[]}}' \
  --type=merge
```

#### 删除 pvc 和 pv 后，nacos-0 还没有重新创建
```bash
kubectl get sts nacos
```
如果看到 nacos 仍然存在，说明控制器还在，只是还没机会重建 Pod
```bash
kubectl delete pod nacos-0
```
删除掉旧 pod
```bash
kubectl get pods -l app=nacos
```
### 安装nacos镜像无法访问
使用这个
```bash
docker pull nacos-registry.cn-hangzhou.cr.aliyuncs.com/nacos/nacos-server:v${nacos.version}
```
### 安装ingress-controller
```bash
kubectl apply \
  -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```
nacos-ingress.yaml
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nacos-ingress
spec:
  rules:
    - host: nacos-web.nacos-demo.com
      http:
        paths:
          - path: /nacos
            pathType: Prefix
            backend:
              service:
                name: nacos-headless
                port:
                  name: server
```
检查服务
```bash
kubectl get svc -n ingress-nginx
```
输出，说明绑定在 32530
```bash
NAME                                 TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             NodePort    10.108.58.154   <none>        80:32530/TCP,443:31811/TCP   11h
ingress-nginx-controller-admission   ClusterIP   10.96.204.241   <none>        443/TCP                      11h
```
### Ingress的NodePort访问不到
在 DNS 中添加解析后，还是无法访问
```bash
# root @ sc-master in ~ [13:01:37] 
$ sudo vi /etc/hosts

# root @ sc-master in ~ [13:33:23] 
$ ping nacos-web.nacos-demo.com
PING nacos-web.nacos-demo.com (192.168.79.144) 56(84) bytes of data.
64 bytes from sc-node1 (192.168.79.144): icmp_seq=1 ttl=64 time=1.41 ms
64 bytes from sc-node1 (192.168.79.144): icmp_seq=2 ttl=64 time=0.308 ms
64 bytes from sc-node1 (192.168.79.144): icmp_seq=3 ttl=64 time=0.300 ms
64 bytes from sc-node1 (192.168.79.144): icmp_seq=4 ttl=64 time=0.401 ms
64 bytes from sc-node1 (192.168.79.144): icmp_seq=5 ttl=64 time=0.333 ms
64 bytes from sc-node1 (192.168.79.144): icmp_seq=6 ttl=64 time=0.279 ms
^C
--- nacos-web.nacos-demo.com ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5078ms
rtt min/avg/max/mdev = 0.279/0.505/1.409/0.406 ms

# root @ sc-master in ~ [13:33:46] 
$ nc nacos-web.nacos-demo.com 32530
^C

# root @ sc-master in ~ [13:37:14] C:130
$ kubectl get ingress nacos-ingress -n default
NAME            CLASS    HOSTS                      ADDRESS   PORTS   AGE
nacos-ingress   <none>   nacos-web.nacos-demo.com             80      12h
```

可以看到 Class 是空的，查看日志
```bash
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx --tail 20 -f
# log 中包含
W0501 17:18:40.042396       6 controller.go:328] ignoring ingress default/nacos-ingress in default based on annotation : ingress does not contain a valid IngressClass
```
所以要给 Ingress **指定 IngressClass**
```yaml
spec:
  ingressClassName: nginx
  rules:
  - host: nacos-web.nacos-demo.com
    http:
      paths:
      - path: /nacos
        pathType: Prefix
        backend:
          service:
            name: nacos-headless
            port:
              name: server
```

然后 apply，可以看到
```bash
I0502 06:48:38.590512 … “creating ingress” ingress="default/nacos-ingress" ingressclass="nginx"
I0502 06:48:38.645059 … “Backend successfully reloaded”
I0502 06:49:02.167770 … “updating Ingress status” … newValue=[{"ip":"10.108.58.154"}]
```

再验证
```bash
kubectl get ingress nacos-ingress -n default

NAME            CLASS   HOSTS                          ADDRESS         PORTS   AGE
nacos-ingress   nginx   nacos-web.nacos-demo.com       10.108.58.154   80      10m
```

集群内部HTTP 请求可以得到回复
```bash
$ curl -H "Host: nacos-web.nacos-demo.com" \
     http://10.108.58.154/nacos/index.html -v
*   Trying 10.108.58.154:80...
* TCP_NODELAY set
* Connected to 10.108.58.154 (10.108.58.154) port 80 (#0)
> GET /nacos/index.html HTTP/1.1
> Host: nacos-web.nacos-demo.com
> User-Agent: curl/7.68.0
> Accept: */*
> 
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 
```

#### 集群外部还是请求不到32530端口
这是因为我们 DNS 设置为
```bash
vim /etc/hosts
...
192.168.79.144   nacos-web.nacos-demo.com
```
但是官方的 nginx-ingress.yaml中
```yaml
spec:
  type: NodePort
  externalTrafficPolicy: Local
  ports:
    - name: http
      port: 80
      nodePort: 32530
    …
```
我们验证一下是不是这样配置
```bash
kubectl get svc ingress-nginx-controller -n ingress-nginx -o yaml | grep externalTrafficPolicy

# 如果显示
externalTrafficPolicy: Local
```
就说明只有本地一个 IP 能访问，而不是 VPC 中的每个 Pod 都能访问。我们必须修改 DNS
```bash
192.168.79.145   nacos-web.nacos-demo.com
```
或者我们修改官方 yaml 的策略，这样任意 Node 上 NodePort 都能生效
```bash
kubectl patch svc ingress-nginx-controller -n ingress-nginx \
  -p '{"spec":{"externalTrafficPolicy":"Cluster"}}'
```
## Helm 安装Jenkins
```bash
$ helm repo add jenkinsci https://charts.jenkins.io
helm repo update

helm install jenkins jenkinsci/jenkins \
  --namespace cicd --create-namespace \
  --set controller.serviceType=ClusterIP \
  --set controller.ingress.enabled=true \
  --set controller.ingress.hostName=jenkins.example.com \
  --set persistence.size=10Gi
  --set persistence.storageClass=managed-nfs-storage
  --set 'controller.env[0].name=TZ' \
  --set 'controller.env[0].value=Asia/Shanghai'
  --set controller.ingress.ingressClassName=nginx \
  --set controller.ingress.annotations."kubernetes\.io/ingress\.class"=nginx
```
查看初始密码
```bash
kubectl exec -n cicd -it jenkins-0 -c jenkins -- cat /run/secrets/additional/chart-admin-password && echo
```
## error: unknown command "port‑forward" for "kubectl"
复制下面这个,-是 ASCII 字符
```bash
kubectl port-forward -n cicd svc/jenkins 8080:8080
```
### Jenkins登录后报错
我们查看日志
```bash
$ kubectl logs -n cicd jenkins-0 -c jenkins \
  | grep -C5 <此处填写logging ID>

# 看到以下内容
java.nio.file.NoSuchFileException: /var/jenkins_home/secrets/org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices.mac
        at java.base/sun.nio.fs.UnixException.translateToIOException(Unknown Source)
        at java.base/sun.nio.fs.UnixException.rethrowAsIOException(Unknown Source)
        at java.base/sun.nio.fs.UnixException.rethrowAsIOException(Unknown Source)
        at java.base/sun.nio.fs.UnixFileSystemProvider.newByteChannel(Unknown Source)
```
文件不存在。这个错误是由于创建文件到以下路径: $JENKINS_HOME/secrets/…mac.
但是在我们的步骤中，我们使用 nfs-subdir-external-provisioner，正常来说是自动创建了 pvc

查看 nfs-share/下，确实存在 pvc。那么就是权限问题
Jenkins 默认不用 root 用户允许，不像 nacos。所以不具有权限，而是使用UID/GID 1000:1000
所以我们可以手工 chown，但太麻烦
```bash
helm upgrade jenkins jenkinsci/jenkins \
  --namespace cicd \
  --reuse-values \
  --set 'controller.securityContext.fsGroup=1000'
```
设置fsGroup
这样就 ok 了

### Jenkins K8S中无法配置 maven 和 jdk
原因很简单。如果我们直接在全局 tool 中配置环境变量，是行不通的。因为实际上他对应的是Jenkins所在机器，而这个机器是k8s的一个 pod。我们把maven和jdk安装进去是十分费力的。

而且如果采用自动安装的方式，我遇到了JDK有一个脚本只符合bash的重定位语法，而ubuntu默认是dash。这个也很难解决

最后采取了配置静态节点的方法，不使用k8s插件了。配置到一台节点上进行构建
### Ubuntu虚拟机创建 20G 但只有 10G
需要进行 LVM 扩容
### Jenkins构建后节点磁盘空间问题
```bash
du -sh * | sort -h   # 查看各文件夹大小排序
```
最后发现是 docker 里面镜像太多使用了很多空间。containerd 占用也多，不过我没清
```bash
cd /var/lib/docker
# 删除所有未运行容器、悬空镜像、网络、构建缓存、未挂载卷
docker system prune -a --volumes --force
```
然后在 Jenkinsfile 中添加
```groovy
post {
    always {
        sh 'docker system prune -af --volumes'
    }
}
```
### DockerHub 限速问题
```bash
# 1. 删除旧的 secret
kubectl delete secret dockerhub-auth -n cicd

# 2. 重新创建（把下面的 <用户名>、<PAT>、<email> 换成正确的）
kubectl create secret docker-registry dockerhub-auth \
  --docker-server=https://index.docker.io/v1/ \
  --docker-username=<DockerID> \
  --docker-password=<新的PAT_or_密码> \
  --docker-email=<邮箱地址> \
  -n cicd
# 3. 应用到 Jenkins Chart 默认 SA 叫 "jenkins"（你也可以 helm get values 看真实名字）
# 这边我用helm部署自带了sa
kubectl patch serviceaccount jenkins -n cicd \
  -p='{"imagePullSecrets":[{"name":"dockerhub-auth"}]}'
```

不过最好还是推到阿里云私有仓库，懒得搞了，实验先这样


不过在这个过程中还发现可能是我的代理服务器问题。
```bash
$ kubectl describe pod jenkins -n cicd

...
failed to fetch anonymous token: Get "https://auth.docker.io/token?scope=repository%3Ajenkins%2Fjenkins%3Apull&service=registry.docker.io": EOF
```
中间换过一次全局代理，可能是clash 有 bug。可以重启一下
### Springboot bootstrap问题
需要引入 maven 依赖，才能使用
### dashboard token
```bash
sudo kubectl -n kubernetes-dashboard create token dashboard-admin --duration=24h
```
### k8s驱逐问题
在原有的`/var/lib/kubelet/config.yaml`中添加一条。注意是顶级的，不需要 tab
```yaml
evictionHard:
	imagefs.available: "15%" # 镜像文件系统可用空间低于15%时触发驱逐 (如果您的镜像存储和节点根文件系统是分开的)
	imagefs.inodesFree: "5%" # 镜像文件系统可用inode低于5%时触发驱逐
	memory.available: "100Mi" # 节点可用内存低于100Mi时触发驱逐
	nodefs.available: "10%" # 节点根文件系统可用空间低于10%时触发驱逐 (这是您主要关注的)
	nodefs.inodesFree: "5%" # 节点根文件系统可用inode低于5%时触发驱逐
```
### Sentinel识别不到服务
需要增加一个暴露的port用于与sentinel连接
### helm部署RabbitMQ
```bash
    echo "Username      : user"
    echo "Password      : $(kubectl get secret --namespace default rabbitmq -o jsonpath="{.data.rabbitmq-password}" | base64 -d)"
    echo "ErLang Cookie : $(kubectl get secret --namespace default rabbitmq -o jsonpath="{.data.rabbitmq-erlang-cookie}" | base64 -d)"
```



