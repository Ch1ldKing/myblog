---
title: React报错 The requested module does not provide an export named 'Subtask'
date: 2025-10-16T03:00:23+08:00
lastmod: 2025-10-16T03:00:23+08:00
tags:
  - problem
  - React
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
format.ts:1 Uncaught SyntaxError: The requested module '/src/types/index.ts' does not provide an export named 'Subtask' (at format.ts:1:10)

![CleanShot 2025-10-16 at 03.25.35@2x.png](https://s2.loli.net/2025/10/16/32w8e9TXmdv1SQj.png)

添加 type 即可