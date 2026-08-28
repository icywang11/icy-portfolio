# Icy's Portfolio

纯静态个人主页：**HTML + CSS + JS**，不用 npm、不用构建，可以直接挂到 **GitHub Pages**。

入口文件是仓库根目录的 `index.html`。

网站正文、联系方式和发布地址的备份在 `留档.md`。

## 页面内容

- 首页欢迎
- 关于我 + 跳转卡片
- 实习经历
- AI 工作流：方法（舆情图；活动数据复盘直接打开社区看板）+ 落地作品（像素小人、每日星座心情、社区看板）
- 游戏经历
- 兴趣爱好：音乐 / 摄影 / 旅游（同一页切换）
- 阅读：哲学 / 经济
- 联系方式

## 本地预览

```bash
python3 scripts/serve.py
```

浏览器打开 http://127.0.0.1:43123

也可以直接双击打开 `index.html`。

## 挂到 GitHub Pages

1. 在 GitHub 新建一个仓库（例如 `icy-portfolio`），把本项目推到 `main`：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

2. 打开仓库 **Settings → Pages**
3. Build and deployment 里 Source 选其一：

**更简单：Deploy from a branch**

- Branch：`main`
- Folder：`/ (root)`
- Save

**或：GitHub Actions**（仓库里已有 `.github/workflows/deploy.yml`）

- Source 选 **GitHub Actions**
- 之后每次推送到 `main` 会自动发布

4. 等 1–2 分钟，打开：

- 仓库名是 `你的用户名.github.io` → `https://你的用户名.github.io`
- 其他仓库名 → `https://你的用户名.github.io/仓库名`

已放 `.nojekyll`，GitHub 不会用 Jekyll 处理这个站点。

## 目录

```
index.html              主页面
留档.md                 网站正文与发布地址备份
404.html                未找到页面时回到首页
css/style.css           样式
js/main.js              复制、相册、飘落、看图
assets/                 头像、照片、玉桂狗、作者头像、AI 图
scripts/serve.py        本地预览
.github/workflows/      GitHub Pages 自动发布
```

所有资源都用相对路径，放在仓库根目录或子目录都能打开。
