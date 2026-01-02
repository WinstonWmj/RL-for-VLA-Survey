# 自动化更新系统设置指南

本文档说明如何手动设置 GitHub Actions 工作流来实现自动化数据更新。

## 方案概述

该系统由三部分组成：
1. **Chrome 插件**：监控 RL for VLA 相关信息源，发现新论文时触发更新
2. **GitHub Actions**：自动处理新数据，更新 `papers.md` 和网页数据源
3. **自动部署**：将更新后的内容发布到网页

## 手动设置步骤

### 第一步：创建 GitHub Actions 工作流

1. 在 GitHub 仓库中，点击 **Settings** → **Actions** → **General**
2. 确保 **Allow all actions and reusable workflows** 已启用
3. 创建文件 `.github/workflows/update-data.yml`，内容如下：

```yaml
name: Update Data from Extension

on:
  repository_dispatch:
    types: [new-paper-submission]
  workflow_dispatch:
    inputs:
      json_data:
        description: 'JSON data of new papers'
        required: true

jobs:
  update-data:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
          
      - name: Process new data
        env:
          NEW_PAPERS_JSON: ${{ github.event.client_payload.papers || github.event.inputs.json_data }}
        run: |
          python scripts/update_data.py
          
      - name: Commit and push changes
        run: |
          git config --global user.name 'RL-VLA-Bot'
          git config --global user.email 'bot@rl-vla.com'
          git add papers.md web/client/src/lib/data.ts
          git commit -m "Auto-update: Add new papers from extension" || echo "No changes to commit"
          git push
```

### 第二步：配置 Chrome 插件

1. 打开插件的选项页面（右键点击插件图标 → 选项）
2. 输入以下信息：
   - **GitHub Personal Access Token**: 从 GitHub 账户设置生成一个 token（需要 `repo` 权限）
   - **仓库所有者**: `WinstonWmj`
   - **仓库名称**: `RL-for-VLA-Survey`

3. 点击"保存设置"

### 第三步：测试自动化流程

1. 在插件弹窗中点击"立即检查"按钮
2. 检查 GitHub 仓库的 **Actions** 标签页，应该看到工作流正在运行
3. 工作流完成后，`papers.md` 和网页数据应该已自动更新

## Chrome 插件工作原理

### 插件文件结构
```
chrome-extension/
├── manifest.json          # 扩展配置
├── popup.html            # 弹窗界面
├── options.html          # 设置页面
├── scripts/
│   ├── background.js     # 后台服务
│   ├── popup.js          # 弹窗逻辑
│   └── options.js        # 设置逻辑
└── icons/                # 扩展图标
```

### 核心功能

**后台服务 (`background.js`)**：
- 定时检查各个信息源（ArXiv、GitHub、Hugging Face、知乎）
- 发现新内容时，调用 `triggerGitHubAction()` 函数
- 通过 GitHub API 的 `repository_dispatch` 事件触发工作流

**设置页面 (`options.html` + `options.js`)**：
- 允许用户配置 GitHub Token 和仓库信息
- 将配置保存到 Chrome Storage 中

**弹窗 (`popup.html` + `popup.js`)**：
- 显示最近发现的新内容
- 提供"立即检查"按钮手动触发检查

## 数据处理脚本

### `scripts/update_data.py`

该脚本负责：
1. 解析来自插件的新论文数据（JSON 格式）
2. 更新 `papers.md` 文件，将新论文追加到相应章节
3. 更新 `web/client/src/lib/data.ts`，将新论文添加到数据数组
4. 更新统计数据（总论文数等）

使用示例：
```bash
export NEW_PAPERS_JSON='[{"title":"Example Paper","authors":["Author"],"venue":"ArXiv","type":"Online RL","url":"https://...","summary":"...","tags":["tag1"]}]'
python scripts/update_data.py
```

## 故障排除

### 问题 1：GitHub Actions 没有运行

**原因**：Token 权限不足或配置错误

**解决方案**：
1. 确保 GitHub Token 有 `repo` 权限
2. 检查插件设置中的仓库所有者和名称是否正确
3. 在浏览器控制台查看错误信息（F12 → Console）

### 问题 2：数据没有更新

**原因**：Python 脚本执行失败

**解决方案**：
1. 在 GitHub Actions 日志中查看 Python 脚本的错误信息
2. 检查 JSON 数据格式是否正确
3. 确保 `papers.md` 和 `data.ts` 文件存在

### 问题 3：网页没有更新

**原因**：GitHub Pages 没有配置或部署失败

**解决方案**：
1. 在仓库 Settings → Pages 中启用 GitHub Pages
2. 选择从 `web` 目录部署
3. 等待部署完成（通常需要几分钟）

## 高级配置

### 自定义信息源

在 `chrome-extension/scripts/background.js` 中修改 `MONITOR_SOURCES` 对象：

```javascript
const MONITOR_SOURCES = {
  arxiv: {
    name: 'ArXiv',
    url: 'https://arxiv.org/search/...',
    keywords: ['VLA', 'reinforcement learning'],
    checkInterval: 6 * 60 * 60 * 1000  // 6小时
  },
  // 添加更多源...
};
```

### 自定义数据格式

修改 `scripts/update_data.py` 中的 `update_papers_md()` 和 `update_web_data()` 函数来改变数据更新的格式。

## 许可证

MIT License
