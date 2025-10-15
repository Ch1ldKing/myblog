---
title: 搭建一个 Vite + React 项目
date: 2025-10-15T17:56:10+08:00
lastmod: 2025-10-15T17:56:10+08:00
tags:
  - React
  - vite
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
## 前期准备
首先你需要安装 node.js，mac 使用如下命令，windows  linux 请自查
```zsh
brew install node
```

然后全局安装 pnpm（我从来不用 npm，pnpm 是最好的）
```zsh
npm install pnpm -g
pnpm -v
```

然后在**项目路径**中使用 vite 初始化项目
```zsh
pnpm create vite . -- --template react-ts
```

以下是我的一些选择
```zsh
$ pnpm create vite . -- --template react-ts
.../199e71df160-9ee0                     |   +1 +
.../199e71df160-9ee0                     | Progress: resolved 1, reused 0, downloaded 1, added 1, done
│
◇  Current directory is not empty. Please choose how to proceed:
│  Ignore files and continue
│
◇  Package name:
│  iselect-ui
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + React Compiler
│
◇  Use rolldown-vite (Experimental)?:
│  No
│
◇  Install with pnpm and start now?
│  Yes
│
◇  Scaffolding project in /Users/dorian/Documents/Programme/iSelect/iSelect-UI...
│
◇  Installing dependencies with pnpm...

  VITE v7.1.10  ready in 603 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

然后进入浏览器打开网址就可以看到啦