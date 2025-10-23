---
title: Flutter 学习笔记
date: 2025-10-01T16:22:33+08:00
lastmod: 2025-10-23T16:22:33+08:00
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
写着感觉和 ArkTS 和 Kotlin 很像
PS：如果你使用 Windows，请将所有 ⌘ （Mac 上的 Command 键）视为 Ctrl 键
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
5. `Text()`也是一种 widget
6. 这个 Text 接受了状态中存储的内容。我们打开 `current` 的定义 `WordPair.random()`，可以知道`random()`实际上返回了一个 WordPair类型。So `current` is also a `WordPair`. `WordPair` has key `asLowerCase`. It is the String of two string, then use function `toLowerCase()`, which comes from `String`
```dart
late final String asString = '$first$second';

late final String asLowerCase = asString.toLowerCase();
```
7. Here we use a lot trailing commas, it's a good idea, because most time it's not the last widget

# 添加行为
添加关于数据的操作，一定是在状态中添加
```dart
// ...

class MyAppState extends ChangeNotifier {
  var current = WordPair.random();

  // ↓ Add this.
  void getNext() {
    current = WordPair.random();
    notifyListeners();
  }
}

// ...
```
有了对于数据的更新，我们只需要通过按钮回调即可
```dart
// ...

    ElevatedButton(
      onPressed: () {
        appState.getNext();  // ← This instead of print().
      },
      child: Text('Next'),
    ),

// ...
```

# 修改外观
首先，我们先修改一下主页对状态的读取，让职责更分离一些
```dart
// ...

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.current;                 // ← Add this.

    return Scaffold(
      body: Column(
        children: [
          Text('A random AWESOME idea:'),
          Text(pair.asLowerCase),                // ← Change to this.
          ElevatedButton(
            onPressed: () {
              appState.getNext();
            },
            child: Text('Next'),
          ),
        ],
      ),
    );
  }
}

// ...
```
现在，为了能够使 Text 的外观更符合我们的要求，我们其实可以直接在 Text 中传入各种参数。但是这样可维护性很差。通常的做法是，把这个 Text() 提取为单独的 Widget，然后添加各种 UI 逻辑
1. 右击需要重构的代码段（本例为 Text），或者光标放置在上面然后 ⌘+.  然后选择 Extract Widget, 输入`BigCard` ![](https://codelabs.developers.google.cn/static/codelabs/flutter-codelab-first/img/9e18590d82a6900.gif?hl=zh-cn)
2. 可以看到新建了一个 BigCard 类。接下来，我们为其中的 Text 添加一个 Padding。放在 Text 上，同样的操作，但点击  Wrap with Padding
3. 我们可以修改 Padding 的值，为该 BigCard 增加一些内边距
4. 可以看到 Padding 其实也是一个 widget，并不是常规的"属性"或 CSS 值
# 主题和样式
1. 我们把 Padding 再包裹一下，用 Card。`Card`是一种预设样式，这样会出现一个卡片样式
2. 修改一下这个 Card 的样式，添加 theme，并使用 theme 的颜色。这样可以保持一致的配色方案
```dart
// ...

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);       // ← Add this.

    return Card(
      color: theme.colorScheme.primary,    // ← And also this.
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Text(pair.asLowerCase),
      ),
    );
  }

// ...
```
3. theme 请求当前的主题，我们调用了其中`colorScheme`的主题色`primary`
## 配色方案
如果想修改配色方案，我们来到总 App 中`MyApp`
```dart
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
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),   // 在这里修改预设颜色
        ),
        home: MyHomePage(),
      ),
    );
  }
}
```

`Colors`类提供了很多预设颜色，如果我们希望使用自己的 RGB 或 16 进制，使用``Color.fromRGBO(0, 255, 0, 1.0)` 或 `Color(0xFF00FF00)`
## 文本主题
修改文本的颜色和大小，我们来修改 Text
```dart
// ...

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    // ↓ Add this.
    final style = theme.textTheme.displayMedium!.copyWith(
      color: theme.colorScheme.onPrimary,
    );

    return Card(
      color: theme.colorScheme.primary,
      child: Padding(
        padding: const EdgeInsets.all(20),
        // ↓ Change this line.
        child: Text(pair.asLowerCase, style: style),
      ),
    );
  }

// ...
```
我们定义了一个新的 style，它是文字主题`textTheme`。这允许我们访问该文字主题中包含的各种的文字预设主题，比如`bodyMedium`（用于中等大小的标准文本）、`caption`（针对图片的说明）或`headlineLarge`（用于大标题）

这里面我们用的是`displayMedium`，在 Flutter 中用于一种《版式效果》，比如我们展示一个最简单的关键词，就会用到这个

但是我们需要对其进行自己的修改，这时候就要调用它的`copyWith()`，意在返回一个该样式的副本，但使用了我们自己的修改。此处我们修改了它的颜色，使用了`onPrimary`，字面意思就是"适合在主题色上展示的颜色"

因此，现在文字会显得很突出![CleanShot 2025-10-22 at 21.35.11@2x.png](https://s2.loli.net/2025/10/22/JmNdQoUki72qFSy.png)

此外还有一个`!`值得注意。Dart 是一门 null 安全的语言，不允许调用空对象。但是使用`!`可以绕过这种检查。可能你会觉得多次依据，因为此处`displayMedium`一定有值。但假设：
```dart
final minimal = ThemeData(
  // 不使用默认 Typography，自己给一个非常精简的 textTheme
  textTheme: const TextTheme( // 只给了少数几个
    bodyMedium: TextStyle(fontSize: 14),
  ),
);
```
可以看到`minimal`主题的`textTheme` 中只有一个`bodyMedium`，而不是我们现在用的常见`Material3`主题：
```dart
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MyAppState(),
      child: MaterialApp(
        title: 'Namer App',
        theme: ThemeData(
          useMaterial3: true,    // <-- 这里提到了现在的主题
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.lightBlue),
        ),
        home: MyHomePage(),
      ),
    );
  }
}
```

### 进一步自定义文本主题
- 将鼠标放在`copyWith()`的括号内任意处，按下 ⌘+⇧+Space，可以看到可以更改的属性列表
- 对于`Card()`同样适用，按下后可以看到一个`elevation`，修改它的值以扩大`Card`的阴影![CleanShot 2025-10-22 at 21.40.43.gif](https://s2.loli.net/2025/10/22/cm59RWbPVywaY3S.gif)

# 添加喜欢功能
首先，如果我们希望存储我们喜欢的单词，就要在状态中实现它
```dart
// ...

class MyAppState extends ChangeNotifier {
  var current = WordPair.random();

  void getNext() {
    current = WordPair.random();
    notifyListeners();
  }

  // ↓ Add the code below.
  var favorites = <WordPair>[];

  void toggleFavorite() {
    if (favorites.contains(current)) {
      favorites.remove(current);
    } else {
      favorites.add(current);
    }
    notifyListeners();
  }
}

// ...
```
注意所有的状态变化函数，结尾都要调用`notifyListeners()`，这样可以使那些 `context.watch<MyAppState>()`来获取这个函数对于 state 的更改

然后来到我们的主界面，添加一个新按钮。这需要添加一个`Row`，如果你了解前端开发，这会很容易理解
我们在 Column 中添加`mainAxisAlignment`,意在使其子项不是集中在顶部，而是纵向的中间（毕竟 column 是列，列是纵向的）。选中我们的 Button，然后 ⌘+.，选择 Wrap with Row![](https://codelabs.developers.google.cn/static/codelabs/flutter-codelab-first/img/7b9d0ea29e584308.gif?hl=zh-cn)
然后，在肉中添加 mainAxisSize，但这次我们为了学习，先使用 MainAxisSize
```dart
// ...
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Hello Word'),
            BigCard(pair: pair),
            Row(
              mainAxisSize: MainAxisSize.min, //<-- add this one
              children: [
                ElevatedButton(
                  onPressed: () {
                    appState.getNext();
                  },
                  child: Text('Next'),
                ),
              ],
// ...
```
这样做后并应用更改，你会发现一切都居中了。如果你好奇把 min 改为 max，会发现按钮们跑到最左侧

然后我们需要将 state 中的函数应用起来，真正的将按钮关联到数据上。首先，在 Row 的子项添加一个按钮，并在`onPressed`属性中使用`toggleFavorite()`
```dart
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Hello Word'),
            BigCard(pair: pair),
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                ElevatedButton(
                  onPressed: () {
                    appState.toggleFavorite();
                  },
                  child: Text('Like'),
                ),
                ElevatedButton(
                  onPressed: () {
                    appState.getNext();
                  },
                  child: Text('Next'),
                ),
              ],
            ),
```
保存后你应当能看到这个按钮了。然后再添加一个好看的图标。
- 这个图标能够根据当前 WordPair 是否在 `favorites[]` 中来更改外观。
-  此外，可以看到 ElevatedButton 支持一种 icon 方法，可以传入`icon`以显示
- `Sizebox()`用于添加间隔。在 BigCard 和按钮所在行之间增加高度的间隔，在按钮和按钮之间增加宽度的间隔
```dart
// ...

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.current;

    // ↓ Add this.
    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            BigCard(pair: pair),
            SizedBox(height: 10),  
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [

                // ↓ And this.
                ElevatedButton.icon(
                  onPressed: () {
                    appState.toggleFavorite();
                  },
                  icon: Icon(icon),
                  label: Text('Like'),
                ),
                SizedBox(width: 10), //<-- and this.

                ElevatedButton(
                  onPressed: () {
                    appState.getNext();
                  },
                  child: Text('Next'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// ...
```

# 添加侧边导航栏
收藏了我们的 WordPair，但是再也找不回来了。这时候，我们需要再开一个页面，并提供一个路由（也就是导航栏）

移除我们的`MyHomePage`，我们将将其拆分为两个 Widget，替换为以下代码
```dart
// ...

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          SafeArea(
            child: NavigationRail(
              extended: false,
              destinations: [
                NavigationRailDestination(
                  icon: Icon(Icons.home),
                  label: Text('Home'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.favorite),
                  label: Text('Favorites'),
                ),
              ],
              selectedIndex: 0,
              onDestinationSelected: (value) {
                print('selected: $value');
              },
            ),
          ),
          Expanded(
            child: Container(
              color: Theme.of(context).colorScheme.primaryContainer,
              child: GeneratorPage(),
            ),
          ),
        ],
      ),
    );
  }
}

class GeneratorPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<MyAppState>();
    var pair = appState.current;

    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          BigCard(pair: pair),
          SizedBox(height: 10),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton.icon(
                onPressed: () {
                  appState.toggleFavorite();
                },
                icon: Icon(icon),
                label: Text('Like'),
              ),
              SizedBox(width: 10),
              ElevatedButton(
                onPressed: () {
                  appState.getNext();
                },
                child: Text('Next'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ...
```
保存后，原有的功能正常，但侧边栏没有反应。与以前的代码比较，你可以发现原有的`HomePage `具有的组件都在 `GeneratorPage`中。在现在的`MyHomePage`中，一行有两个内容，第一个是 `SafeArea`，第二个是 `Expanded`，他们依然都是 Widget
- `SafeArea`确保其子项不会被硬件凹口或者状态栏遮挡（比如 iPhone 的刘海）。用它来封装`NavigationRail`，能够防止导航按钮被遮挡
- 如果将`NavigationRail`中的`extended`改为 true，你就能看到标签。我们后续学习允许应用在空间充足时自动调整这一点
- `onDestinationSelected`有点类似`onPressed`，在选择目标页面时调用其中的操作
- `Row`的第二个子项`Expanded`，用于这种布局：一些子项仅占用所需空间（NavigationRail），而其他子项尽可能多的占用剩余空间（Expanded）。如果你把 `NavigationRail`也用`Expanded`包裹起来，而不是 `SafeArea`，它看上去是这样：![CleanShot 2025-10-23 at 02.28.55@2x.png](https://s2.loli.net/2025/10/23/TxwhVgKC9FLyBcp.png)
- 因此`Expanded`是一个*贪婪*的组件。在其内部，我们有一个`Container`，为其指定了颜色和包裹的页面
## 无状态 widget 和有状态 widget
目前为止，我们写的都是 StatelessWidget，他们没有自己的状态，必须使用`MyAppState`。这样有局限性，虽然我们可以把所有页面的所有值都存在一个`state`中，但很快这个可维护性就很差了。如果你写过 React 或 Vue，将很快理解我在说什么，这是一种组件化的设计思想

比如当前我们希望不同页面都具有自己的 state，比如 `selectedIndex`，页面的索引值以实现导航，就需要用到`StatefulWidget`

将光标放在 `MyHomePage` 的第一行（以 `class MyHomePage...` 开头的行），然后使用 或 ⌘ +. 调出 Refactor 菜单。接下来，选择 Convert to StatefulWidget![](https://codelabs.developers.google.cn/static/codelabs/flutter-codelab-first/img/238f98bceeb0de3a.gif?hl=zh-cn)
IDE 为您创建了一个新类 `_MyHomePageState`。此类基于 `State<MyHomePage>`实现，是一个独立的类，有自己的值。另请注意，旧版无状态 widget 中的 `build` 方法已移至 `_MyHomePageState`（而不是保留在 widget 中）。`build` 方法会一字不差的完成移动，其内部不会发生任何改变。该方法现在只是换了个位置。

> -MyHomePageState 开始的下划线将该类设置为私有类，也就是不能被其他类之外的部分引用

## 为 Widget 设置 state
当前，我们的 Widget 只需要管理一个值，就是`selectedIndex`，也就是当前选中的页面的索引。这样做的原因是现在的`HomePage`实际上并不是一个 Page，它是对于所有页面的一个集合，并通过导航实现页面间的切换。因此，使`selectedIndex`成为它管理范围的一个值再好不过了
```dart
// ...

class _MyHomePageState extends State<MyHomePage> {

  var selectedIndex = 0;     // ← Add this property.

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          SafeArea(
            child: NavigationRail(
              extended: false,
              destinations: [
                NavigationRailDestination(
                  icon: Icon(Icons.home),
                  label: Text('Home'),
                ),
                NavigationRailDestination(
                  icon: Icon(Icons.favorite),
                  label: Text('Favorites'),
                ),
              ],
              selectedIndex: selectedIndex,    // ← Change to this.
              onDestinationSelected: (value) {

                // ↓ Replace print with this.
                setState(() {
                  selectedIndex = value;
                });

              },
            ),
          ),
          Expanded(
            child: Container(
              color: Theme.of(context).colorScheme.primaryContainer,
              child: GeneratorPage(),
            ),
          ),
        ],
      ),
    );
  }
}

// ...
```
