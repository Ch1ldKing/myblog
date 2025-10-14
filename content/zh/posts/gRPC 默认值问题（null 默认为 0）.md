---
title: gRPC 必须有默认值导致问题（null 默认为 0）
date: 2024-09-15T11:30:03+00:00
tags:
  - problem
  - grpc
  - go
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
 gRPC 任何类型必须有一个默认值，这就导致如果是 int 类型无法区分是数值 0 还是默认值 0.
 我的场景是在完成一个前端的 K 线分析，这就导致后端本来有些值返回的是 None（JSON 处理为 Null），引入 grpc 后变为 0，导致计算结果是错的
所以设定一个特殊值，来解析为 null，返回给前端