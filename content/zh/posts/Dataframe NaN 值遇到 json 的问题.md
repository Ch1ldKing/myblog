---
title: "Dataframe NaN 值遇到 json 的问题"
date: 2024-09-15T11:30:03+00:00
# weight: 1
# aliases: ["/first"]
tags: ["problem"]
author: "Dorianyang"
# author: ["Me", "You"] # multiple authors
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
我的需求是把 df 的 NaN 转 None，方便后续 json 转 null
看下面这段代码
```python
    # 计算 MA 指标
    df["MA5"] = df["Close"].rolling(window=5).mean().round(2)
    df["MA10"] = df["Close"].rolling(window=10).mean().round(2)
    df["MA30"] = df["Close"].rolling(window=30).mean().round(2)
    df["MA60"] = df["Close"].rolling(window=60).mean().round(2)

    # 将非空数据保留，空数据用None替换
    df = df.astype(object)
    df = df.where(df.notnull(), None)

    print(df["MA10"].head(10))

    kline_data = df[
        [
            "time",
            "Open",
            "Close",
            "High",
            "Low",
            "Volume",
            "MA5",
            "MA10",
            "MA30",
            "MA60",
        ]
    ].to_dict(orient="records")
```
 死活不行，输出的 MA 值仍然有 NaN
 最后通过新建一个 df 解决
 ```python
    export_df = df.astype(object)              
    export_df = export_df.where(export_df.notna(), None)  

    # 调试：确认 NaN 已变成 None
    print(export_df["MA10"].head(10))
```


