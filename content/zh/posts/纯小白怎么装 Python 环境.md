---
title: 纯小白怎么装 Python 环境
date: 2025-10-19T22:24:47+08:00
lastmod: 2025-10-19T22:24:47+08:00
tags:
  - python
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
# 写在开头
无论什么目的，我都建议你使用 uv 来安装 python。有很多人也会选择 conda，但我认为 uv 相对更好一些。如果有人给你发了一个 yaml，叫你复制这个环境，那一般是用 conda。。但是对于新项目，我建议你使用 uv，不过它有一定学习成本，需要记忆命令

# uv 安装 python教程
1. 对于 mac，安装 homebrew
```zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
然后一路回车确认就行

2. 等待 brew 安装好，我们运行`brew install uv`
3. 等待 uv 安装好，我们进入我们的项目的路径的，然后运行 `uv init --name my-app . -p3.12`，3.12 替换为你自己需要的 python 版本,my-app 替换为你想要的项目名称
4. 然后，你就成功得到了一个环境。以下是一些常用命令及与普通 python 命令映射

|**传统 Python 命令**|**uv 对应命令**|**说明**|
|---|---|---|
|python script.py|uv run script.py|在 uv 管理的环境中运行脚本，自动处理虚拟环境和依赖。|
|pip install package|uv add package|在项目中添加依赖。uv 会更新 pyproject.toml 和锁定文件。|
|pip uninstall package|uv remove package|从项目中移除依赖。|
|python -m venv .venv / source .venv/bin/activate|（隐式）uv 管理 .venv 或环境|uv 在初始化或第一次 uv add 时会自动建立环境，不必手动激活。|
|virtualenv venv / venv venv|uv venv|uv 提供创建虚拟环境的命令（传统 workflow 的一部分）|
|pip freeze > requirements.txt / pip install -r requirements.txt|uv lock（生成锁文件） + uv sync（安装）|uv 用锁文件（uv.lock）替代 requirements.txt，确保可重复环境。|
|python setup.py sdist bdist_wheel / twine upload dist/*|uv build + uv publish|项目打包与发布流程由 uv 提供。|
|pipx <tool> / python -m <tool>|uvx <tool> 或 uv tool run <tool>|用于一次性运行或安装 CLI 工具包，uv 提供 “tool” 子命令流程。|
|pyenv install 3.x / pyenv local 3.x|uv python install 3.x +项目配置|uv 支持管理 Python 版本，自动下载并切换。|
|pip install -e . / python setup.py develop|uv tool install . -e 或 uv add --editable .|开发安装项目（使其在系统可用／可运行）使用 uv 的 “tool install” 或项目安装流程。|

# conda 安装教程
1. 安装 mambaforge（就是 conda）`brew install mambaforge`，根据指引回车
2. 运行`conda init zsh`或者`conda init bash`（根据你的终端类型）
3. 创建一个环境 `conda create -n py311 python=3.11`，py311 替换名称，3.11 替换 python 版本
4. 激活这个环境`conda activate py311`，然后你就可以正确地运行常规的 python 命令（比如 pip 等）