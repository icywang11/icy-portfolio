# 个人网站

一个简洁、现代的个人作品集网站，使用 Next.js + TypeScript + Tailwind CSS 构建，支持一键部署到 GitHub Pages。

## 功能

- 响应式设计，适配桌面和移动端
- 首页、关于、技能、项目、联系等完整板块
- GitHub 链接集成
- 通过 GitHub Actions 自动部署

## 本地开发

```bash
npm install
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看效果。

## 自定义内容

编辑 `src/data/site.ts` 文件，修改你的个人信息：

- 姓名、职位、简介
- GitHub 链接和邮箱
- 技能列表
- 项目展示

替换 `public/avatar.svg` 为你的头像图片（支持 `.png`、`.jpg` 等格式，记得同步修改 `site.ts` 中的 `avatar` 路径）。

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

点击 Cursor 界面中的 **Create repo** 按钮创建仓库，或手动在 GitHub 上新建。

### 2. 推送代码

```bash
git add .
git commit -m "feat: add personal website"
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入仓库的 **Settings → Pages**
2. 在 **Build and deployment** 下，Source 选择 **GitHub Actions**
3. 推送代码到 `main` 分支后，Actions 会自动构建并部署

### 4. 访问你的网站

- 如果仓库名为 `你的用户名.github.io`，网站地址为 `https://你的用户名.github.io`
- 其他仓库名，地址为 `https://你的用户名.github.io/仓库名`

## 使用 Cursor 继续编辑

在 Cursor 中打开此项目后，你可以：

1. 直接描述想要的修改，例如「把主题色改成蓝色」「添加一个博客板块」
2. Cursor 会自动理解代码结构并帮你修改
3. 修改后运行 `npm run dev` 实时预览
4. 满意后提交并推送，GitHub Actions 会自动更新线上网站

## 技术栈

- [Next.js](https://nextjs.org/) — React 框架
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- [Tailwind CSS](https://tailwindcss.com/) — 样式
- [shadcn/ui](https://ui.shadcn.com/) — UI 组件
