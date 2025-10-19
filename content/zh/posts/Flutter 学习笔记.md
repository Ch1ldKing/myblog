---
title: Flutter 学习笔记
date: 2025-10-01T16:22:33+08:00
lastmod: 2025-10-01T16:22:33+08:00
tags:
  - problem
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
https://codelabs.developers.google.cn/codelabs/flutter-codelab-first?hl=zh-cn

# Flutter环境配置
1. 按照 flutter
```zsh
brew install flutter
```
2. 安装 VSCode（其他的也行）插件
![CleanShot 2025-10-19 at 16.36.11.png](https://s2.loli.net/2025/10/19/BZWv6zlwHRn9eUO.png)
3. 安装 xcode
```zsh
xcode-select --install
```

# 创建一个新项目
1. F1 -> flutter new -> Application->填项目名称，选路径
2. 替换以下内容 `pubspec.yaml`
```yaml
name: 你的项目名称
description: A new Flutter project.

publish_to: 'none' # Remove this line if you wish to publish to pub.dev

version: 0.0.1+1

environment:
  sdk: '>=2.19.4 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  english_words: ^4.0.0
  provider: ^6.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter

  flutter_lints: ^2.0.0

flutter:
  uses-material-design: true
```
3. 替换 analysis_options.yaml (用于代码分析器)
```yaml
include: package:flutter_lints/flutter.yaml

linter:
  rules:
    prefer_const_constructors: false
    prefer_final_fields: false
    use_key_in_widget_constructors: false
    prefer_const_literals_to_create_immutables: false
    prefer_const_constructors_in_immutables: false
    avoid_print: false
```
4. 替换`lib/main.dart`，经典的面向对象语言
```dart
import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Namer App',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
        ),
        home: MyHomePage(),
      ),
    );
  }
}

class MyAppState extends ChangeNotifier {
  var current = WordPair.random();
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();

    return Scaffold(
      body: Column(
        children: [
          Text('A random idea:'),
          Text(appState.current.asLowerCase),
        ],
      ),
    );
  }
}
```
# 运行这个新项目
1. 停留在 `main.dart` 上，选择当前的目标运行平台（右下角）
![CleanShot 2025-10-19 at 16.41.30.png](https://s2.loli.net/2025/10/19/k3ltjYmOIibRVKy.png)
2. 我这里选了 Mac，然后点击运行标志，结果报错了[在 stackoverflow 找到](https://stackoverflow.com/questions/40743713/command-line-tool-error-xcrun-error-unable-to-find-utility-xcodebuild-n)`xcrun: error: unable to find utility "xcodebuild", not a developer tool or in PATH`。如果装了 Xcode APP 版本，进入 Settings->Locations，改一下 command line tools 的路径![CleanShot 2025-10-19 at 16.46.36@2x.png](https://s2.loli.net/2025/10/19/sWfdBtDZ4RSKaXG.png)

3. 再运行，还是报错![CleanShot 2025-10-19 at 16.50.10.png](https://s2.loli.net/2025/10/19/jv6ReXZqmJdzoxF.png)
