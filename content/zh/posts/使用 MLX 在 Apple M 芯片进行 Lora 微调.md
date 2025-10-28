---
title: 使用 MLX 在 Apple M 芯片进行 Lora 微调
date: 2025-10-28T22:22:36+08:00
lastmod: 2025-10-28T22:22:36+08:00
tags:
  - mlx
  - lora
  - llm
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
苹果加油，和 CUDA 碰一碰
# 数据准备
1. 从 github 克隆 Apple 给出的示例项目项目
   `git clone https://github.com/ml-explore/mlx-examples.git`
2. 在项目`lora/data/`中放置你的训练、验证和测试集数据![CleanShot 2025-10-29 at 00.15.26@2x.png](https://s2.loli.net/2025/10/29/lpLI4gCXmvcq1Uk.png)
3. 下载一个模型。此处我们从`modelscope`下载一个小模型`minimind2`
```zsh
pip install modelscope
modelscope download --model gongjy/MiniMind2
```
4. 下载后，记住模型的路径。此处我的路径如下![CleanShot 2025-10-29 at 00.18.56@2x.png](https://s2.loli.net/2025/10/29/AMzUcXeZ1dSrPIG.png)
# 环境配置
1. 使用 uv 初始化一个环境
```zsh
$ uv init --name mlx . -p3.13 
Initialized project `hypollm` at `/Users/dorian/Documents/Programme/NUS311/model_test`
```
2. 你也可以使用`conda`
```zsh
$ conda create -n mlx python==3.13
```
3. 安装所需的包
```zsh
$ uv add mlx-lm transformers torch numpy
```
# 微调过程
 1. 进入项目路径 `cd /mlx_example/lora/`
```zsh
$ mlx_lm.lora --model <此处你的基座模型路径> --train --data ./data

# 显示如下则成功
# Loading pretrained model
# Loading datasets
# Training
# Trainable parameters: 1.654% (1.720M/104.031M)
# Starting training..., iters: 1000
# Calculating loss...: 100%|██| 25/25 [00:07<00:00,  3.42it/s]
```
2. 微调结束后，可以看到如下内容，是 checkpoints 和最终模型![](https://s2.loli.net/2025/10/29/Uar8DLKH2n7yJ4Z.png)
3. 然后我们进行融合权重
```zsh
$ mlx_lm.fuse --model <你的基座模型路径>  --adapter-path adapters --save-path <你的模型名字>
```
4. 最终得到以下文件
   ![CleanShot 2025-10-29 at 00.58.34@2x.png](https://s2.loli.net/2025/10/29/5EnOx71WZsXofmz.png)
# 模型部署
1. 下载 Ollama（麻烦自行查找并下载）
2. 新建一个`Modelfile`，注意没有后缀，内容如下（也可以参考[此网站](https://www.llamafactory.cn/ollama-docs/modelfile.html)）
```zsh
FROM <模型文件夹的绝对路径>

# 推理参数（适合精确结构推理）
PARAMETER temperature 0.2
PARAMETER top_p 0.8
PARAMETER top_k 50
PARAMETER repeat_penalty 1.05
PARAMETER num_ctx 4096
PARAMETER num_predict 512

# 对齐 Qwen 格式的多轮对话模版
TEMPLATE """<|im_start|>system
{{ .System }}<|im_end|>
<|im_start|>user
{{ .Prompt }}<|im_end|>
<|im_start|>assistant
"""

# 设定系统指令
SYSTEM "You are an expert in causal inference and graph theory."
```
3. 