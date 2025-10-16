---
title: iSelect-分布式机器学习计算系统半场香槟总结
date: 2025-10-17T01:15:37+08:00
lastmod: 2025-10-17T01:15:37+08:00
tags:
  - log
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
# 展示
后端采用主从架构
![CleanShot 2025-10-17 at 01.17.56@2x.png](https://s2.loli.net/2025/10/17/Ds4Be6Ydc2NGjng.png)

架构图
![CleanShot 2025-10-17 at 01.18.42@2x.png](https://s2.loli.net/2025/10/17/tiNXlQFak4WO8j7.png)

前端采用 React 编写，实现动态监控各 worker 状态，监控任务完成情况
![mac_1760635181156.png](https://s2.loli.net/2025/10/17/1wxzWyItmHOeF9V.png)
![mac_1760635207713.png](https://s2.loli.net/2025/10/17/pmBI5njGhb92geX.png)
# Backgroud
这是一个用于分布式机器学习的场景。与 Hadoop 等大数据分布式处理不同，同时也与 Tensorflow 有一定差异。我们解决的场景是 *自有算法* ，可以定制化开发组件作为算子，并且支持按照订户分离

举个例子：一个用户来自 XX 公司，他需要计算某个文件。公司一定不希望该文件外传，因此我们在其公司搭建一个集群，仅与我们的主节点通信，并且通信中**不含有**任何该文件的具体细节，仅实现负载均衡和任务状态监控

# 技术细节
1. Go 的模块化和高性能，所以我选择 Go
2. 定制化算子用 Go 也太离谱了...这部分用 Python 写，并且提供统一接口供 Go 远程调用，工厂模式
3. 为了增加性能及未来可能的分布式性，我们抛弃了 SQL，使用 Mongo 存储数据。而对于登录信息，由于是强校验，仍然使用 PostgreSQL
4. 为了高效内存处理及内存信息持久化，所有的全局变量及数组统一使用 Redis 进行管理
5. Worker 使用 Docker 进行打包，以便于在集群安装
6. 日志统一化，可视化，使用 ELK
7. 前端选用 React，因为想学学 React，没用 vue