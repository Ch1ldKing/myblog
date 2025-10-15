---
title: 2在一个 Git 仓库中聚合两个项目
date: 2025-10-15T14:22:14+08:00
lastmod: 2025-10-15T14:22:14+08:00
tags:
  - git
author: Dorianyang
draft: true
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
现在我们有两个仓库，servicecomp 和 srvc-frontend，我想把他们在一个仓库中聚合一下（比如前后端项目），使用 subtree
```zsh
# 0) 若父仓库已误把两个子仓库当普通目录 add 了，先从索引移除（不删本地文件）
git rm --cached -r servicecomp srvc-frontend || true

# 1) 临时挪开本地已有目录（subtree 会自己创建对应目录）
mv servicecomp servicecomp.tmp
mv srvc-frontend srvc-frontend.tmp
```

两个子项目的远端 URL 加进来，起两个新名字
```zsh
# 2) 后端 servicecomp
git remote add servicecomp-origin git@github.com:Ch1ldKing/HITCS-CloudNative-SpringCloud.git
git fetch servicecomp-origin
git subtree add --prefix=servicecomp servicecomp-origin main -m "Add servicecomp via subtree"

# 3) 前端 srvc-frontend（URL 和分支名请替换）
git remote add srvc-frontend-origin <你的前端仓库URL>
git fetch srvc-frontend-origin
git subtree add --prefix=srvc-frontend srvc-frontend-origin <分支名> -m "Add srvc-frontend via subtree"

```
### 错误 1
```zsh
$ git subtree add --prefix=servicecomp servicecomp-origin main -m "Add servicecomp via subtree"

fatal: ambiguous argument 'HEAD': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
fatal: working tree has modifications.  Cannot add.
```

1. **fatal: ambiguous argument 'HEAD'**
    
    你的仓库目前还没有任何提交（即没有 HEAD），所以 Git 无法在基础版本上合并 subtree。
    
2. **fatal: working tree has modifications**
    
    表示当前工作区有未提交的更改（比如 .gitignore 或其它修改）。

先任意提交一个内容，然后再操作
```zsh
git commit -m "Initial commit before adding subtrees"
```
### 错误 2
```zsh
$ git subtree add --prefix=servicecomp servicecomp-origin main -m "Add servicecomp via subtree"

fatal: prefix 'servicecomp' already exists.
```

确保你已经执行了 `mv` 来产生 folder.tmp 进行备份，然后删除这个 folder 就行