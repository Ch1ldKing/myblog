---
title: Flutter 学习笔记
date: 2025-10-01T16:22:33+08:00
lastmod: 2025-10-01T16:22:33+08:00
tags:
  - Flutter
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
本笔记基于该[教程](https://codelabs.developers.google.cn/codelabs/flutter-codelab-first?hl=zh-cn)， 让我们说谢谢 Google

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

3. 再运行，还是报错![CleanShot 2025-10-19 at 16.50.10.png](https://s2.loli.net/2025/10/19/jv6ReXZqmJdzoxF.png) 运行 `flutter doctor -v`，发现没装 `cocoapods`。运行`brew install cocoapods`即可
4. 再运行，还是一样的报错。在[这里](https://stackoverflow.com/questions/52421999/xcode-10-command-codesign-failed-with-a-nonzero-exit-code)找到原因，有人就是因为被 iCloud 文件提供器加了 com.apple.fileprovider.fpfs#P 才一直失败，- 任何打包进 .app 的文件只要带有资源分叉或 Finder 信息，CodeSign 都会拒绝。所以我把项目移出了 iCloud 同步的文件夹，然后清理资源重新运行
```zsh

# 1) Flutter 清理 + 移除构建输出
flutter clean
rm -rf build/macos

# 2) 删除 Xcode 派生数据
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# 3) 递归清理整个项目树的扩展属性（包含将来要进 .app 的一切）
xattr -rc .

# 4) 若你从网上下过三方二进制/压缩包，顺便去掉隔离标记
xattr -dr com.apple.quarantine .

# 5) 重新预拉取 macOS 引擎构件（避免 SDK 自身产物带脏属性）
flutter precache --macos

# 6) 重新构建
flutter run -d macos
```
5. 这次成功了，弹出了我们的 APP![CleanShot 2025-10-19 at 17.11.25@2x.png](https://s2.loli.net/2025/10/19/1JLsQzyeaOZoxhb.png) 再试试 iOS 平台，右下角构建平台选择 ios simulator![CleanShot 2025-10-19 at 17.12.53.png](https://s2.loli.net/2025/10/19/B413el27UWdyhzA.png)再打开 `lib/main.dart` ，点击右上角运行标志，等待一会也可以正确显示![CleanShot 2025-10-19 at 17.16.05.png](https://s2.loli.net/2025/10/19/hFeAaRXHbQmIPv4.png)
# 热重载
1. 我们修改文字，并按 ⌘+S，可看到程序中的文字发生了变化（注意 Web 平台不支持）![CleanShot 2025-10-19 at 17.42.35.png](https://s2.loli.net/2025/10/19/Dy7Zz5rJNkHjXTR.png)

# 添加一个按钮
我们继续修改，修改以下内容
```dart
// ...

    return Scaffold(
      body: Column(
        children: [
          Text('Hello World'),
          Text(appState.current.asLowerCase),

          // ↓ Add this.
          ElevatedButton(
            onPressed: () {
              print('button pressed!');
            },
            child: Text('Next'),
          ),

        ],
      ),
    );

// ...
```
保存更改，可以看到出现了一个按钮，可以点击

# 学习 lib/main.dart
## 1. 程序入口
```dart
// ...

void main() {
  runApp(MyApp());
}

// ...
```
入口函数 `main()` 运行一个 App，这个 App 是 `MyApp()`
## 2. MyApp 及创建
```dart
// ...

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

// ...
```
MyApp 是 StatelessWidget 类型的（一种 Widget）。构建 Flutter 时，widget 是基本要素。这里定义了 MyApp 这个 widget 所有东西，有状态，名字，主题，主页
## 3. 状态管理
```dart
// ...

class MyAppState extends ChangeNotifier {
  var current = WordPair.random();
}

// ...
```
1. MyAppState 是我们这个应用的状态，一种管理状态的方法是`ChangeNotifier`。
   现在我们的状态只有一个变量，就是`current`，它是随机一个英文单词对
2. `ChangeNotifier` ，一种状态类，意思是状态变化时通知 widget
3. 怎么通知呢？使用`ChangeNotifierProvider`，提供给整个 App。这样所有的该 App 中的 Widget 都可以订阅这个状态

## 4. 组件 MyHomePage
也是我们这个 App 的主页
```dart
// ...

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {           // ← 1
    var appState = context.watch<MyAppState>();  // ← 2

    return Scaffold(                             // ← 3
      body: Column(                              // ← 4
        children: [
          Text('A random AWESOME idea:'),        // ← 5
          Text(appState.current.asLowerCase),    // ← 6
          ElevatedButton(
            onPressed: () {
              print('button pressed!');
            },
            child: Text('Next'),
          ),
        ],                                       // ← 7
      ),
    );
  }
}

// ...
```
1. 如同 MyApp（因为即使是完整的 App 也是一个组件，组件里面套组件），每个 widget 都要有一个 `build()`。当 widget的环境变化时，该方法自动调用，然后使 widget 的内容产生变化。有点像 Vue 开发中的生命周期`OnUpdated()`
2. 在 build 中，通过`context.watch()`监控状态
3. `build()`最终返回的是一个 Widget（更准确的说，嵌套的 Widget 树）。而顶层的 Widget 有一点区别，我们为其赋予一个具体的实现`Scaffold`（也是一种 Widget）
4. `Column`是一种 Widget 的布局，将 children 中的内容从上到下放在一列
5. 