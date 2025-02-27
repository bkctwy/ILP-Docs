---
title: 快速上手
author: bkctwy
order: 1
---

## 克隆插件模板
```bash
git clone https://github.com/bkctwy/plugin-template
```

## 目录结构解析
```
.
├── build.sh                    # 构建脚本
├── CMakeLists.txt              # CMake 构建配置文件
├── CMakePresets.json           # CMake 预设配置文件
├── config.h                    # 配置头文件
├── config.h.in                 # 配置头文件模板
├── IPlugin.h                   # 插件接口定义头文件
├── plugin.json                 # 插件配置信息文件
├── TemplatePlugin.cpp          # 插件实现源文件
├── TemplatePlugin.h            # 插件实现头文件
├── toolchain                   # 工具链配置目录
│   ├── toolchain-linux.cmake   # Linux 工具链配置
│   └── toolchain-windows.cmake # Windows 工具链配置
└── utils                       # 工具函数目录
    ├── db.h                    # 数据库操作相关的头文件
    ├── task.h                  # 任务管理相关的头文件
    └── utils.h                 # 通用工具函数的头文件
```

## 创建插件

### 修改插件配置信息
修改`config.h.in`文件，修改插件名称、版本等信息。
```c++
#ifndef CONFIG_H
#define CONFIG_H

#define PROJECT_VERSION_MAJOR "@PROJECT_VERSION_MAJOR@" // 主版本号
#define PROJECT_VERSION_MINOR "@PROJECT_VERSION_MINOR@" // 次版本号
#define PROJECT_VERSION_PATCH "@PROJECT_VERSION_PATCH@" // 修订号
#define PROJECT_VERSION "@PROJECT_VERSION@"             // 版本号
#define SITE_NAME "@SITE_NAME@"                         // 站点名称
#define SITE_ID "@SITE_ID@"                             // 站点 ID
#define SITE_DOMAIN "@SITE_DOMAIN@"                     // 站点域名
#define PLUGIN_NAME "@PLUGIN_NAME@"                     // 插件名称
#define PLUGIN_ID "@PLUGIN_ID@"                         // 插件 ID

#endif // CONFIG_H
```

### 修改插件实现
修改`TemplatePlugin.cpp`和`TemplatePlugin.h`文件，修改插件实现。

### 编译插件
编译插件。
```bash
bash build.sh
```

插件应为`build/{PersetName}/{PluginName}.so|dll`文件。
### 安装插件
```bash
ILP plugin install -f build/{PersetName}/{PluginName}.so|dll
```

### 查看插件是否安装成功
```bash
ILP plugin list
```
