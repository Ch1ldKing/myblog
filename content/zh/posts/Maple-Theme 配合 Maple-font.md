---
title: Maple-Theme 配合 Maple-font
date: 2025-05-09T03:34:35+08:00
lastmod: 2025-05-09T03:34:35+08:00
tags:
  - vscode
  - maple
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
在 VSCode 安装了 Maple 主题之后，我们可能会遇到一些字体不生效，或者\[TODO\]标签没法主阿们渲染的情况，就需要修改系统中 `.vscode/extensions/subframe7536.theme-maple-0.7.16/themes/maple-dark-color-theme.json`，改为以下内容（同样适用于 kiro,cursor 等）
```json
{
  "name": "Maple Dark",
  "author": "subframe7536",
  "base": "vs-dark",
  "colors": {
    "focusBorder": "#0078D4",

    "foreground": "#CCCCCC",

    "selection.background": "#ADD6FF26",

    "widget.border": "#303031",

    "widget.shadow": "#171718cc",

    "sash.hoverBorder": "#6285a7",

    "git.blame.editorDecorationForeground": "#999999cc",

    "editor.foreground": "#D4D4D4",

    "editor.background": "#1E1E1E",

    "editor.selectionBackground": "#ADD6FF26",

    "editor.inactiveSelectionBackground": "#3A3D41",

    "editor.selectionHighlightBackground": "#ADD6FF26",

    "editor.selectionHighlightBorder": "#44444b",

    "editor.snippetTabstopHighlightBackground": "#47556999",

    "editor.snippetTabstopHighlightBorder": "#44444b",

    "editor.wordHighlightBackground": "#47556980",

    "editor.wordHighlightStrongBackground": "#47556980",

    "editor.wordHighlightTextBackground": "#47556980",

    "editor.findMatchBackground": "#8dbe744d",

    "editor.findMatchBorder": "#64748b",

    "editor.findMatchHighlightBackground": "#8dbe7433",

    "editor.findRangeHighlightBackground": "#1e293b66",

    "editor.findRangeHighlightBorder": "#334155cc",

    "editor.hoverHighlightBackground": "#4755694d",

    "editor.lineHighlightBackground": "#47556940",

    "editor.lineHighlightBorder": "#4755694d",

    "editor.rangeHighlightBackground": "#1e293be6",

    "editor.rangeHighlightBorder": "#334155e6",

    "editorLink.activeForeground": "#8dbe74",

    "editorGroupHeader.tabsBackground": "#181818",

    "editorGroupHeader.tabsBorder": "#2B2B2B",

    "editorLineNumber.foreground": "#6E7681",

    "editorLineNumber.activeForeground": "#CCCCCC",

    "editorCursor.foreground": "#8d9db4",

    "editorMultiCursor.secondary.foreground": "#8d9db4cc",

    "editorIndentGuide.activeBackground1": "#707070",

    "editorIndentGuide.background1": "#404040",

    "editorInlayHint.foreground": "#f5e7d6",

    "editorInlayHint.background": "#3b5b7d",

    "peekView.border": "#44444b",

    "peekViewEditor.background": "#1F1F1F",

    "peekViewEditor.matchHighlightBackground": "#BB800966",

    "peekViewEditor.matchHighlightBorder": "#8dbe74",

    "peekViewResult.background": "#1F1F1F",

    "peekViewResult.matchHighlightBackground": "#BB800966",

    "peekViewResult.selectionBackground": "#6285a733",

    "peekViewTitle.background": "#232a39",

    "editorError.foreground": "#F85149",

    "editorWarning.foreground": "#eecfa0",

    "editorInfo.foreground": "#8fc7ff",

    "editorGutter.addedBackground": "#2EA043",

    "editorGutter.addedSecondaryBackground": "#a4dfaeb3",

    "editorGutter.deletedBackground": "#F85149",

    "editorGutter.deletedSecondaryBackground": "#edababb3",

    "editorGutter.modifiedBackground": "#0078D4",

    "editorGutter.modifiedSecondaryBackground": "#8fc7ffb3",

    "diffEditor.insertedTextBackground": "#a4dfae66",

    "diffEditor.insertedLineBackground": "#a4dfae33",

    "diffEditor.removedTextBackground": "#edabab66",

    "diffEditor.removedLineBackground": "#edabab33",

    "textCodeBlock.background": "#2B2B2B",

    "textLink.foreground": "#4daafc",

    "textLink.activeForeground": "#4daafc",

    "textBlockQuote.border": "#616161",

    "textBlockQuote.background": "#2B2B2B",

    "toolbar.hoverBackground": "#171718",

    "button.background": "#0078D4",

    "button.foreground": "#FFFFFF",

    "button.hoverBackground": "#026EC1",

    "button.border": "#FFFFFF12",

    "button.secondaryBackground": "#313131",

    "button.secondaryForeground": "#CCCCCC",

    "button.secondaryHoverBackground": "#3C3C3C",

    "input.border": "#3C3C3C",

    "input.background": "#313131",

    "input.foreground": "#CCCCCC",

    "input.placeholderForeground": "#A6A6A6",

    "inputOption.activeBackground": "#2489DB82",

    "inputOption.activeForeground": "#CCCCCC",

    "inputOption.activeBorder": "#2488DB",

    "dropdown.background": "#313131",

    "dropdown.foreground": "#CCCCCC",

    "dropdown.border": "#3C3C3C",

    "dropdown.listBackground": "#1F1F1F",

    "scrollbarSlider.background": "#3d4b5f80",

    "scrollbarSlider.hoverBackground": "#3d4b5f99",

    "scrollbarSlider.activeBackground": "#3d4b5fcc",

    "badge.background": "#616161",

    "badge.foreground": "#F8F8F8",

    "progressBar.background": "#0078D4",

    "list.activeSelectionBackground": "#0078d4",

    "list.activeSelectionForeground": "#FFFFFF",

    "list.activeSelectionIconForeground": "#FFF",

    "list.dropBackground": "#383B3D",

    "list.focusBackground": "#293545",

    "list.focusForeground": "#CCCCCC",

    "list.focusOutline": "#64748bcc",

    "list.focusHighlightForeground": "#8dbe74",

    "list.focusAndSelectionOutline": "#64748b",

    "list.highlightForeground": "#8dbe74",

    "list.hoverBackground": "#2d3a4b",

    "list.inactiveFocusOutline": "#44444b",

    "list.inactiveSelectionBackground": "#283242",

    "list.filterMatchBackground": "#8dbe74b3",

    "list.filterMatchBorder": "#8dbe74",

    "menu.foreground": "#CCCCCC",

    "menu.background": "#252526",

    "menu.selectionBackground": "#0078d4",

    "menu.border": "#454545",

    "menu.separatorBackground": "#454545",

    "menu.selectionBorder": "#64748b",

    "menubar.selectionBackground": "#334155",

    "tab.activeBackground": "#1F1F1F",

    "tab.activeBorder": "#1F1F1F",

    "tab.activeBorderTop": "#0078D4",

    "tab.activeForeground": "#FFFFFF",

    "tab.selectedBackground": "#222222",

    "tab.selectedForeground": "#ffffffa0",

    "tab.selectedBorderTop": "#6caddf",

    "tab.border": "#2B2B2B",

    "tab.hoverBackground": "#1F1F1F",

    "tab.inactiveBackground": "#181818",

    "tab.inactiveForeground": "#9D9D9D",

    "tab.lastPinnedBorder": "#ccc3",

    "tab.unfocusedActiveBorder": "#1F1F1F",

    "tab.unfocusedActiveBorderTop": "#2B2B2B",

    "tab.unfocusedHoverBackground": "#1F1F1F",

    "breadcrumb.foreground": "#cbd5e1b3",

    "breadcrumb.background": "#1e1e1f",

    "breadcrumbPicker.background": "#1e1e1f",

    "pickerGroup.foreground": "#8dbe74",

    "quickInput.background": "#222222",

    "quickInput.foreground": "#CCCCCC",

    "quickInputList.focusBackground": "#334155",

    "commandCenter.foreground": "#cbd5e1",

    "commandCenter.activeBackground": "#334155",

    "commandCenter.activeBorder": "#64748b",

    "commandCenter.border": "#44444b",

    "keybindingLabel.foreground": "#CCCCCC",

    "keybindingLabel.background": "#334155b3",

    "keybindingLabel.border": "#64748b",

    "notifications.background": "#1F1F1F",

    "notifications.border": "#2B2B2B",

    "notifications.foreground": "#CCCCCC",

    "notificationCenterHeader.background": "#1F1F1F",

    "notificationCenterHeader.foreground": "#CCCCCC",

    "debugToolBar.background": "#181818",

    "debugToolBar.border": "#44444b",

    "editorHoverWidget.background": "#202020",

    "editorHoverWidget.statusBarBackground": "#232324",

    "editorWidget.background": "#202020",

    "editorWidget.resizeBorder": "#6285a7",

    "banner.foreground": "#1d1d1d",

    "banner.background": "#6285a7",

    "activityBar.background": "#181818",

    "activityBar.border": "#2B2B2B",

    "activityBar.foreground": "#D7D7D7",

    "activityBar.inactiveForeground": "#868686",

    "activityBar.activeBorder": "#0078D4",

    "activityBarBadge.foreground": "#FFFFFF",

    "activityBarBadge.background": "#0078D4",

    "actionBar.toggledBackground": "#383a49",

    "sideBar.foreground": "#CCCCCC",

    "sideBar.background": "#181818",

    "sideBar.border": "#2B2B2B",

    "sideBarTitle.foreground": "#CCCCCC",

    "sideBarSectionHeader.background": "#181818",

    "sideBarSectionHeader.border": "#2B2B2B",

    "sideBarSectionHeader.foreground": "#CCCCCC",

    "gitDecoration.addedResourceForeground": "#a4dfae",

    "gitDecoration.untrackedResourceForeground": "#8fc7ff",

    "gitDecoration.conflictingResourceForeground": "#d2ccff",

    "gitDecoration.deletedResourceForeground": "#edabab",

    "gitDecoration.modifiedResourceForeground": "#eecfa0",

    "gitDecoration.renamedResourceForeground": "#b8d7f9",

    "gitDecoration.stageDeletedResourceForeground": "#edababe6",

    "gitDecoration.stageModifiedResourceForeground": "#f0c0a8",

    "gitDecoration.submoduleResourceForeground": "#a1e8e5",

    "minimap.background": "#212122",

    "minimap.findMatchHighlight": "#8dbe74cc",

    "minimap.selectionHighlight": "#6285a780",

    "minimap.errorHighlight": "#edabab99",

    "titleBar.activeBackground": "#181818",

    "titleBar.activeForeground": "#CCCCCC",

    "titleBar.border": "#2B2B2B",

    "titleBar.inactiveBackground": "#1F1F1F",

    "titleBar.inactiveForeground": "#9D9D9D",

    "statusBar.background": "#181818",

    "statusBar.foreground": "#CCCCCC",

    "statusBar.border": "#2B2B2B",

    "statusBar.debuggingForeground": "#FFFFFF",

    "statusBar.debuggingBackground": "#0078D4",

    "statusBar.debuggingBorder": "#44444b",

    "statusBar.noFolderForeground": "#CCCCCC",

    "statusBar.noFolderBackground": "#1F1F1F",

    "statusBar.focusBorder": "#0078D4",

    "statusBarItem.prominentBackground": "#6E768166",

    "statusBarItem.prominentForeground": "#171718",

    "statusBarItem.remoteBackground": "#0078D4",

    "statusBarItem.remoteForeground": "#FFFFFF",

    "statusBarItem.focusBorder": "#0078D4",

    "statusBarItem.errorBackground": "#edabab",

    "statusBarItem.errorForeground": "#171718",

    "statusBarItem.warningBackground": "#eecfa0",

    "statusBarItem.warningForeground": "#171718",

    "ports.iconRunningProcessForeground": "#369432",

    "panel.background": "#181818",

    "panel.border": "#2B2B2B",

    "panelInput.border": "#2B2B2B",

    "panelTitle.activeBorder": "#0078D4",

    "panelTitle.activeForeground": "#CCCCCC",

    "panelTitle.inactiveForeground": "#9D9D9D",

    "terminalCursor.background": "#1e1e1f",

    "terminalCursor.foreground": "#cbd5e1",

    "terminal.background": "#1F1F1F",

    "terminal.foreground": "#CCCCCC",

    "terminal.inactiveSelectionBackground": "#3A3D41",

    "terminal.tab.activeBorder": "#0078D4",

    "terminal.ansiBrightBlack": "#666666",

    "terminal.ansiBrightBlue": "#a8e0ff",

    "terminal.ansiBrightCyan": "#bafffe",

    "terminal.ansiBrightGreen": "#bdf8c7",

    "terminal.ansiBrightMagenta": "#ebe5ff",

    "terminal.ansiBrightRed": "#ffc4c4",

    "terminal.ansiBrightWhite": "#ffffff",

    "terminal.ansiBrightYellow": "#ffe8b9",

    "terminal.ansiBlack": "#333333",

    "terminal.ansiBlue": "#8fc7ff",

    "terminal.ansiCyan": "#a1e8e5",

    "terminal.ansiGreen": "#a4dfae",

    "terminal.ansiMagenta": "#d2ccff",

    "terminal.ansiRed": "#edabab",

    "terminal.ansiWhite": "#f3f2f2",

    "terminal.ansiYellow": "#eecfa0",

    "checkbox.background": "#313131",

    "checkbox.border": "#3C3C3C",

    "settings.dropdownBackground": "#313131",

    "settings.dropdownBorder": "#3C3C3C",

    "settings.headerForeground": "#FFFFFF",

    "settings.modifiedItemIndicator": "#BB800966",

    "welcomePage.tileBackground": "#2B2B2B",

    "welcomePage.progress.foreground": "#0078D4",

    "textPreformat.foreground": "#D0D0D0",

    "textPreformat.background": "#3C3C3C",

    "textSeparator.foreground": "#21262D",

    "pickerGroup.border": "#3C3C3C",

    "chat.slashCommandBackground": "#34414B",

    "chat.slashCommandForeground": "#40A6FF",

    "chat.editedFileForeground": "#E2C08D",

    "descriptionForeground": "#9D9D9D",

    "errorForeground": "#F85149",

    "icon.foreground": "#CCCCCC"
  },

  "semanticHighlighting": true,

  "semanticTokenColors": {
    "newOperator": "#C586C0",

    "stringLiteral": "#ce9178",

    "customLiteral": "#DCDCAA",

    "numberLiteral": "#b5cea8",

    "parameter": {
      "foreground": "#eecfa0",

      "underline": true
    },

    "property.declaration": "#9CDCFE",

    "property.readonly": "#9CDCFE",

    "property.defaultLibrary": "#4EC9B0",

    "interface": {
      "foreground": "#4EC9B0",

      "italic": true,

      "bold": true
    },

    "interface.defaultLibrary": {
      "foreground": "#4EC9B0"
    },

    "variable.defaultLibrary": "#4EC9B0",

    "variable.callable": "#DCDCAA",

    "type": {
      "bold": true,

      "foreground": "#4EC9B0"
    },

    "type.defaultLibrary": "#4EC9B0",

    "function": "#DCDCAA",

    "function.defaultLibrary": {
      "bold": true,

      "foreground": "#DCDCAA"
    },

    "function.builtin": {
      "bold": true,

      "foreground": "#DCDCAA"
    },

    "namespace": {
      "foreground": "#4EC9B0",

      "bold": true
    },

    "class": {
      "foreground": "#4EC9B0",

      "italic": false,

      "bold": false
    },

    "class.defaultLibrary": {
      "foreground": "#4EC9B0",

      "bold": true
    },

    "struct": "#4EC9B0",

    "struct.defaultLibrary": {
      "foreground": "#4EC9B0",

      "bold": true
    },

    "class.builtin": {
      "bold": true,

      "foreground": "#4EC9B0"
    },

    "builtinConstant.typeHint": {
      "bold": true,

      "foreground": "#569cd6"
    },

    "class.typeHint": {
      "foreground": "#4EC9B0",

      "bold": true
    },

    "selfParameter": {
      "foreground": "#569cd6",

      "italic": true,

      "underline": false
    },

    "selfKeyword": {
      "foreground": "#569cd6",

      "italic": true,

      "underline": false
    },

    "enum": "#4EC9B0",

    "enumMember": "#4FC1FF",

    "builtinAttribute": "#9CDCFE",

    "generic.attribute": "#9CDCFE",

    "deriveHelper.attribute": "#DCDCAA",

    "builtinAttribute.attribute": "#DCDCAA",

    "tomlTableKey": "#9CDCFE",

    "enum.defaultLibrary": {
      "foreground": "#4EC9B0",

      "bold": true
    },

    "enumMember.defaultLibrary": {
      "foreground": "#4FC1FF",

      "bold": true
    },

    "*.static": {
      "italic": true
    },

    "*.async": {
      "bold": true
    }
  },

  "tokenColors": [
    {
      "scope": [
        "comment",

        "string.comment",

        "comment.line",

        "punctuation.definition.comment"
      ],

      "settings": {
        "foreground": "#6A9955"
      }
    },

    {
      "scope": [
        "delimiter.bracket",

        "delimiter",

        "invalid.illegal.character-not-allowed-here.html",

        "keyword.operator.rest",

        "keyword.operator.spread",

        "keyword.operator.type.annotation",

        "keyword.operator.relational",

        "keyword.operator.assignment",

        "meta.tag.block.any.html",

        "meta.tag.inline.any.html",

        "meta.tag.structure.input.void.html",

        "meta.type.annotation",

        "meta.embedded.block.github-actions-expression",

        "storage.type.function.arrow",

        "keyword.operator.type",

        "meta.objectliteral.ts"
      ],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": [
        "punctuation",

        "meta.brace",

        "meta.attribute punctuation.separator"
      ],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": ["punctuation.terminator", "punctuation.separator"],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": [
        "constant",

        "support.constant",

        "entity.name.constant",

        "variable.language",

        "meta.definition.variable"
      ],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": [
        "entity",

        "entity.name",

        "variable.parameter.function",

        "meta.body.function.definition.special",

        "support.function",

        "meta.function",

        "meta.function-call.python"
      ],

      "settings": {
        "foreground": "#DCDCAA"
      }
    },

    {
      "scope": ["entity.name.tag", "tag.html"],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": "entity.name.function",

      "settings": {
        "foreground": "#DCDCAA"
      }
    },

    {
      "scope": [
        "keyword",

        "storage.type.java",

        "entity.name.package",

        "entity.name.import",

        "keyword.operator.expression.infer",

        "keyword.control.satisfies",

        "keyword.control.as.ts"
      ],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "italic"
      }
    },

    {
      "scope": ["storage.type.annotation.java"],

      "settings": {
        "foreground": "#DCDCAA",

        "fontStyle": ""
      }
    },

    {
      "scope": ["storage", "storage.type", "support.type.builtin"],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "italic"
      }
    },

    {
      "scope": [
        "constant.language.undefined",

        "constant.language.null",

        "constant.language.nullptr"
      ],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "italic"
      }
    },

    {
      "scope": ["support.type.primitive", "support.type.builtin"],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "bold"
      }
    },

    {
      "scope": [
        "string",

        "string punctuation.section.embedded source",

        "attribute.value",

        "meta.attribute-selector.scss",

        "entity.name.import.go"
      ],

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": [
        "punctuation.definition.string",

        "punctuation.support.type.property-name"
      ],

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": "support",

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": [
        "property",

        "meta.property-name",

        "meta.object-literal.key",

        "attribute.name",

        "variable.other.object.property",

        "variable.other.property"
      ],

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": [
        "entity.name.tag.yaml",

        "meta.attribute",

        "meta.attribute entity",

        "entity.other.attribute-name",

        "source.css support.type.property-name.media",

        "entity.other.attribute-name.tsx",

        "entity.other.attribute-name.js",

        "entity.other.attribute-name.xml"
      ],

      "settings": {
        "foreground": "#9cdcfe"
      }
    },

    {
      "scope": ["source.css support.type.property-name"],

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": [
        "variable",

        "identifier",

        "constant.other.table-name",

        "invalid.deprecated.entity.other.attribute-name.html",

        "support.type.property-name.json",

        "support.type.property-name.toml",

        "support.type.property-name.array.toml",

        "keyword.other.definition.ini",

        "variable.other.normal.shell",

        "meta.var"
      ],

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": ["support.type.primitive", "entity.name.type.instance.jsdoc"],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": ["entity.name.type.parameter"],

      "settings": {
        "foreground": "#9CDCFE",

        "fontStyle": "bold"
      }
    },

    {
      "scope": ["entity.name.type.parameter.cpp", "entity.name.type.ts"],

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": [
        "meta.type keyword.operator.expression.typeof",

        "meta.type keyword.operator.expression.keyof"
      ],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "italic"
      }
    },

    {
      "scope": "namespace",

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": [
        "keyword.operator",

        "keyword.operator.assignment.compound",

        "meta.var.expr.ts"
      ],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": "invalid",

      "settings": {
        "foreground": "#f44747",

        "fontStyle": "strikethrough"
      }
    },

    {
      "scope": "message.error",

      "settings": {
        "foreground": "#f44747"
      }
    },

    {
      "scope": "string variable",

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": ["source.regexp", "string.regexp"],

      "settings": {
        "foreground": "#d16969"
      }
    },

    {
      "scope": "string.regexp punctuation.definition.string",

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": ["keyword.control.anchor.regexp", "storage.modifier.reference"],

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": "punctuation.definition.character-class.regexp",

      "settings": {
        "foreground": "#d16969"
      }
    },

    {
      "scope": [
        "string.regexp.character-class",

        "constant.character.escape",

        "constant.other.character-class.regexp",

        "string.regexp string.regexp.arbitrary-repitition",

        "string.regexp constant.character.escape",

        "constant.other.placeholder"
      ],

      "settings": {
        "foreground": "#d16969"
      }
    },

    {
      "scope": [
        "constant.numeric",

        "constant.numeric.hex storage.type.number",

        "number"
      ],

      "settings": {
        "foreground": "#b5cea8",

        "fontStyle": ""
      }
    },

    {
      "scope": [
        "entity.other.attribute-name.pseudo-class.css",

        "entity.other.attribute-name.pseudo-element.css",

        "punctuation.definition.entity.css"
      ],

      "settings": {
        "foreground": "#d7ba7d"
      }
    },

    {
      "scope": ["source.css variable"],

      "settings": {
        "foreground": "#9cdcfe"
      }
    },

    {
      "scope": ["keyword.other.unit", "punctuation.definition.constant.css"],

      "settings": {
        "foreground": "#b5cea8"
      }
    },

    {
      "scope": ["source.css support.function"],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": ["constant.language.boolean", "constant.language"],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "italic"
      }
    },

    {
      "scope": "meta.module-reference",

      "settings": {
        "foreground": "#DCDCAA"
      }
    },

    {
      "scope": "entity.name.section",

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": "punctuation.definition.list.begin.markdown",

      "settings": {
        "foreground": "#6796e6"
      }
    },

    {
      "scope": ["markup.heading", "markup.heading entity.name"],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "bold"
      }
    },

    {
      "scope": "markup.quote",

      "settings": {
        "foreground": "#6A9955"
      }
    },

    {
      "scope": "markup.italic",

      "settings": {
        "fontStyle": "italic"
      }
    },

    {
      "scope": "markup.bold",

      "settings": {
        "fontStyle": "bold",

        "foreground": "#569cd6"
      }
    },

    {
      "scope": [
        "markup.inline.raw",

        "fenced_code.block.language.markdown",

        "fenced_code.block.language"
      ],

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": ["markup.deleted", "punctuation.definition.deleted"],

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": ["markup.inserted", "punctuation.definition.inserted"],

      "settings": {
        "foreground": "#b5cea8"
      }
    },

    {
      "scope": ["markup.changed", "punctuation.definition.changed"],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": ["markup.ignored", "markup.untracked"],

      "settings": {
        "foreground": "#6A9955"
      }
    },

    {
      "scope": "meta.diff.range",

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "bold"
      }
    },

    {
      "scope": "meta.diff.header",

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": "meta.separator",

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "bold"
      }
    },

    {
      "scope": "meta.output",

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": [
        "brackethighlighter.tag",

        "brackethighlighter.curly",

        "brackethighlighter.round",

        "brackethighlighter.square",

        "brackethighlighter.angle",

        "brackethighlighter.quote"
      ],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": "brackethighlighter.unmatched",

      "settings": {
        "foreground": "#f44747"
      }
    },

    {
      "scope": [
        "constant.other.reference.link",

        "string.other.link",

        "punctuation.definition.string.begin.markdown",

        "punctuation.definition.string.end.markdown",

        "markup.heading.setext"
      ],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": ["string.other.link.description", "string.other.link.title"],

      "settings": {
        "foreground": "#ce9178"
      }
    },

    {
      "scope": ["variable.other.link.underline"],

      "settings": {
        "fontStyle": "underline"
      }
    },

    {
      "scope": [
        "markup.underline.link.markdown",

        "markup.underline.link.image.markdown"
      ],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": "underline"
      }
    },

    {
      "scope": [
        "variable.parameter",

        "variable.other.jsdoc",

        "meta.import variable"
      ],

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": [
        "type.identifier",

        "entity.other.inherited-class",

        "entity.name.type.class",

        "entity.name.type.module",

        "meta.parameter.initialization"
      ],

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": [
        "entity.name.section.group-title",

        "support.type.property-name.table.toml"
      ],

      "settings": {
        "foreground": "#569cd6"
      }
    },

    {
      "scope": [
        "support.class.component.js",

        "support.class.component.ts",

        "support.class.component.jsx",

        "support.class.component.tsx",

        "support.class.component.vue",

        "support.class.component.svelte",

        "support.class.component.astro"
      ],

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": ["meta.fstring.python constant.character.format.placeholder"],

      "settings": {
        "foreground": "#9CDCFE"
      }
    },

    {
      "scope": ["string.quoted.docstring.multi.python keyword.control"],

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": ["invalid.illegal.unrecognized-tag.html"],

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": ["source.vue meta.tag.other.unrecognized.html"],

      "settings": {
        "foreground": "#D4D4D4",

        "fontStyle": ""
      }
    },

    {
      "scope": [
        "keyword.control.directive",

        "keyword.control.import",

        "keyword.control.from",

        "keyword.control.export",

        "keyword.package",

        "keyword.other.package",

        "keyword.import",

        "meta.use.rust keyword",

        "variable.language.this",

        "variable.language.super",

        "keyword.operator.new",

        "keyword.control.trycatch",

        "storage.modifier.package",

        "storage.modifier.import",

        "keyword.operator.expression.import",

        "keyword.operator.expression.infer",

        "source.css keyword.other.important",

        "keyword.other.using",

        "keyword.control.at-rule.import.css",

        "keyword.control.at-rule.import.scss",

        "keyword.control.at-rule.import.less"
      ],

      "settings": {
        "foreground": "#C586C0"
      }
    },

    {
      "scope": [
        "source.css keyword.other.important",

        "source.sass keyword.other.important",

        "source.less keyword.other.important"
      ],

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": "keyword.control.import.python",

      "settings": {
        "foreground": "#C586C0"
      }
    },

    {
      "scope": "keyword.control.ternary.java",

      "settings": {
        "foreground": "#C586C0",

        "fontStyle": ""
      }
    },

    {
      "scope": [
        "keyword.control",

        "keyword.function",

        "keyword.operator.new",

        "keyword.operator.borrow.and.rust",

        "storage.type",

        "storage.modifier",

        "variable.language.this"
      ],

      "settings": {
        "foreground": "#C586C0",

        "fontStyle": "italic"
      }
    },

    {
      "scope": [
        "meta.decorator entity.name.function",

        "meta.decorator variable.other.readwrite",

        "meta.declaration storage.type.annotation.java"
      ],

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": "source.go storage.type",

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": "keyword.channel.go",

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": ["storage.type.function.arrow"],

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": ["storage.type.java", "punctuation.definition.string.template"],

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": ["source.java storage.type.primitive"],

      "settings": {
        "fontStyle": "bold"
      }
    },

    {
      "scope": ["source.java variable.parameter"],

      "settings": {
        "fontStyle": "underline"
      }
    },

    {
      "scope": [
        "storage.type.object.array.java",

        "meta.class.java storage.type.java",

        "entity.name.type.class.java"
      ],

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": ["entity.name.namespace"],

      "settings": {
        "foreground": "#4EC9B0"
      }
    },

    {
      "scope": ["meta.jsx.children"],

      "settings": {
        "foreground": "#D4D4D4"
      }
    },

    {
      "scope": [
        "invalid.illegal.character-not-allowed-here.html",

        "invalid.deprecated.entity.other.attribute-name.html"
      ],

      "settings": {
        "fontStyle": ""
      }
    },

    {
      "scope": ["source.nix invalid"],

      "settings": {
        "foreground": "#D4D4D4",

        "fontStyle": ""
      }
    },

    {
      "scope": ["source.nix invalid.illegal.reserved"],

      "settings": {
        "foreground": "#569cd6",

        "fontStyle": ""
      }
    },

    {
      "scope": ["entity.name.type.rust"],

      "settings": {
        "foreground": "#4EC9B0",

        "fontStyle": ""
      }
    }
  ]
}
```