---
title: SVG 颜色问题
date: 2025-07-16T02:20:15+08:00
lastmod: 2025-07-16T02:20:15+08:00
draft: false
tags:
  - problem
  - vue
  - css
author: Dorianyang
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
我们使用 Tailwind 的情况下，想通过 class 直接给我们的 SVG 图标设置颜色，或者跟随父组件，需要用到这个 fill="currentColor"，然后就可以在
```vue
<template>
    <svg t="1749727002733" class="icon" viewBox="0 0 1394 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="5650" width="200" height="200">
        <path
            d="M808.665066 968.123525a139.174837 139.174837 0 0 1-222.989114 0L28.061551 224.448838A140.525626 140.525626 0 0 1 0 140.133462C0 62.746326 62.484883 0 139.567002 0h1115.228801c30.283817 0 59.739731 9.891261 83.944998 28.192273 61.569833 46.558646 73.901229 134.425289 27.538666 196.256565L808.665066 968.123525z"
            fill="currentColor" p-id="5651"></path>
    </svg>
</template>
```
然后在 vue 中使用，可以跟随父组件
```vue
<div :class="[
	'flex items-center px-2 py-1 rounded-full text-xs font-medium min-w-[70px] justify-center',
	category.change > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800']">
	<IconArrowDown :class="['w-3 h-3 mr-1', category.change > 0 ? 'rotate-180' : '']" />
	{{ Math.abs(category.change).toFixed(2) }}%
</div>
```
还可以直接指定颜色
```vue
<div class="flex items-center">
	<RobotIcon class="text-blue-800 w-8 h-8 flex mr-2" />
	<h2 class="text-xl font-bold text-gray-800">AI</h2>
</div>
```