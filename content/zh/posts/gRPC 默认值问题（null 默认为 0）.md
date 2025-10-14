---
date: 'gRPC 默认值问题（null 默认为 0）'
title: '2025 10 15_02 07 18'
tags: ["problem","grpc"]
author: "Dorianyang"
author: ["Me"] 
showToc: true
TocOpen: false
draft: false
hidemeta: false
comments: true
disableHLJS: false # to disable highlightjs
disableShare: false
disableHLJS: false
hideSummary: false
searchHidden: true
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