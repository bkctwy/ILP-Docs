---
title: 插件实现修改
author: bkctwy
---

## `IPlugin.h`文件解析

### Init方法（必备）

`Init`方法是插件的入口，在插件被加载时，会调用该方法。该方法主要完成插件的初始化工作，包括设置插件ID、缓存小说目录、初始化其他操作等。

```cpp title="IPlugin.h"
void init(string id, bool force_update)
{
    this->id = id;              // 设置小说ID
    getContent(force_update);   // 缓存小说目录
    // 其他初始化操作
}
```

### getContent方法（必备）

根据实际情况编写，该方法用于缓存小说目录（未缓存时）或从缓存中获取目录信息（已缓存时）。

```cpp title="IPlugin.h"
virtual vector<unordered_map<string, string>> getContent(bool force_update = false) = 0;
```

返回数据格式应为：

```json
[
    {
        "title": "章节标题1",
        "fetch_url": "章节链接1",
        "id": "章节ID1",
        "url": "章节URL1",
        "update_time":"更新时间1", // Unix时间戳
    }
]
```

可调用`utils/utils.h`中的`initContentMap`方法快速创建此数据格式。
```cpp title="utils/utils.h"
unordered_map<string, string> initContentMap(string title, string url, string id, string fetch_url, string update_time)
{
    unordered_map<string, string> content_map;
    content_map["fetch_url"] = fetch_url;
    content_map["id"] = id;
    content_map["url"] = url;
    content_map["title"] = title;
    content_map["update_time"] = update_time;
    return content_map;
}
```

**fetch_url与url的区别**

- `fetch_url`：用于获取章节内容的链接，可能是网站的API接口，也可能与`url`相同，[fetchOneChapter](#fetchonechapter方法)会使用此url下载章节内容
- `url`：用于访问章节的链接，一般为网站的章节链接。

部分示例实现：

```cpp
unordered_map<string, string> content = utils::initContentMap(title, url, id, fetch_url, update_time);
db.insertData(this->title, content);
this->content_data.push_back(content);
```

### getTitle方法（必备）

根据实际情况编写，该方法用于获取当前小说的标题。

```cpp title="IPlugin.h"
virtual string getTitle() = 0;
```

### getAuthor方法（必备）

根据实际情况编写，该方法用于获取当前小说的作者。

```cpp title="IPlugin.h"
virtual string getAuthor() = 0;
```

### getCover方法（必备）

根据实际情况编写，该方法用于获取当前小说的封面图片。

```cpp title="IPlugin.h"
virtual string getCover() = 0;
```

### parseChapter方法（必备）

根据实际情况编写，该方法用于从[fetchOneChapter](#fetchonechapter方法)方法获取的章节数据中解析当前章节的内容。

```cpp title="IPlugin.h"
virtual void parseChapter(unordered_map<string, string> chapter_data) = 0;
```

### unload方法

该方法会在插件卸载前执行，可进行释放资源等操作

```cpp title="IPlugin.h"
virtual void unload() = 0;
```

### fetchOneChapter方法

一般无需修改，该方法用于获取单个章节的内容。
返回章节内容为原始数据（一般为HTML或JSON格式），由[parseChapter](#parsechapter方法必备)方法解析。

```cpp title="IPlugin.h"
unordered_map<string, string> fetchOneChapter(int index)
{
    fmt::print("Downloading chapter... ({}/{})\n", index + 1, this->content_data.size());
    cpr::Response response = cpr::Get(cpr::Url{this->content_data[index]["fetch_url"]});
    string content = response.text;
    unordered_map<string, string> chapter_data;
    chapter_data["status"] = "success";
    chapter_data["index"] = to_string(index);
    chapter_data["title"] = this->content_data[index]["title"];
    chapter_data["content"] = content;
    return chapter_data;
}
```

返回数据格式应为：

```json
{
    "status": "success | failed",
    "index": "章节索引",
    "title": "章节标题",
    "content": "章节内容"
}
```

### fetchAllChapters方法

一般无需修改，该方法用于获取所有章节。

```cpp title="IPlugin.h"
void fetchAllChapter()
{
    fs::path save_path = fmt::format("{}/{}", this->novels_folder, this->title);
    fs::create_directories(save_path);

    TaskManager manager(stoi(this->max_workers), stoi(this->sleep_time));
    auto callback = [this](const unordered_map<string, string> &chapter_data)
    {
        parseChapter(chapter_data);
    };
    for (int i = 0; i < content_data.size(); i++)
    {
        if (isDownloaded(content_data[i]["title"]))
        {
            continue;
        }
        manager.add_task([this, i]()
                            { return this->fetchOneChapter(i); }, callback);
    }
    manager.wait_all();
}
```

### getContentPage方法

一般无需修改，该方法用于获取小说目录页面的HTML内容。

```cpp title="IPlugin.h"
virtual string getContentPage()
{
    if (this->content_page_text.empty())
    {
        cpr::Response response = cpr::Get(cpr::Url{this->content_page_url});
        this->content_page_text = response.text;
    }
    return this->content_page_text;
}
```




