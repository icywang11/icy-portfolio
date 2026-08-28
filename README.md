# 个人主页（静态 HTML）

一个可直接挂到 **GitHub Pages** 的个人主页，纯 HTML + CSS，无需构建。

## 页面结构

1. **自我介绍** — 顶部简介与头像
2. **快速跳转** — 6 个小跳链卡片
3. **爱好与照片**
4. **实习经历**
5. **游戏经历**
6. **AI 工具使用**
7. **数据分析与舆情处理流程**
8. **动漫 · 综艺 · 书本**

## 本地预览

直接用浏览器打开 `index.html`，或运行：

```bash
python3 scripts/serve.py
```

然后访问 http://localhost:43123

## 如何修改内容

编辑 `index.html` 里的文字即可，主要改这些地方：

- 顶部的姓名、邮箱、城市
- 各板块里的列表、段落
- `assets/` 文件夹里的图片（换成你自己的 `.jpg` / `.png`，并改对应 `src` 路径）
- 右上角 GitHub 链接

## 挂到 GitHub Pages

### 方法一：最简单

1. 在 Cursor 里点击 **Create repo** 创建 GitHub 仓库
2. 把代码推送到 `main` 分支
3. 打开仓库 **Settings → Pages**
4. Source 选 **Deploy from a branch**
5. Branch 选 `main`，文件夹选 **/ (root)**，保存

几分钟后访问：

- 仓库名是 `你的用户名.github.io` → `https://你的用户名.github.io`
- 其他仓库名 → `https://你的用户名.github.io/仓库名`

### 方法二：用 GitHub Actions（已配置）

仓库里已有 `.github/workflows/deploy.yml`，在 Pages 设置里选 **GitHub Actions** 作为 Source 即可。

## 文件说明

```
index.html      # 主页面（所有内容都在这里）
css/style.css   # 样式
js/main.js      # 小脚本（年份等）
assets/         # 图片资源
```

## 用 Cursor 继续改

在 Cursor 里直接说你想改什么，例如：

- 「把实习经历改成我在字节跳动的实习」
- 「游戏板块加上原神和塞尔达」
- 「换一个深色主题」

Cursor 会帮你改 `index.html` 和 `css/style.css`。
