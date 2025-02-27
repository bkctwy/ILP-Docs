---
title: 在Arch Linux上搭建开发环境
author: bkctwy
---

## 前置准备

安装AUR helper参见[AUR helpers](https://wiki.archlinuxcn.org/wiki/aur_helpers)。

## 安装基础软件

```bash
sudo pacman -S base-devel git cmake clang
```

## 安装Mingw-w64（用于释出Windows下的二进制文件）
```bash
yay -S mingw-w64-gcc mingw-w64-camke
```

::: caution
正在施工中...