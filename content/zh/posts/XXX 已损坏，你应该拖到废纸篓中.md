---
title: XXX 已损坏，你应该拖到废纸篓中
date: 2025-10-16T03:19:13+08:00
lastmod: 2025-10-16T03:19:13+08:00
tags:
  - problem
  - MacOS
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
这是由于 MacOS 不允许不信任的应用
打开终端，输入（先别运行
```zsh
sudo xattr -d com.apple.quarantine 
```
然后打开你的 FInder -> 应用程序，将有问题的 APP 拖进终端，然后大概是这种效果
```zsh
sudo xattr -d com.apple.quarantine /Applications/PicGo.app
```
这时候再运行，就能打开了。真打不开的就是你版本没下载对或者程序真的有问题