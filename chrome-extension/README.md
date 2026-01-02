# RL for VLA Monitor - Chrome扩展

这是一个用于监控RL for VLA领域最新研究进展的Chrome浏览器扩展。

## 功能特性

### 🔍 多平台监控
- **ArXiv**: 监控最新的学术论文
- **GitHub**: 跟踪Awesome-RL-VLA仓库的更新
- **Hugging Face**: 监控新发布的VLA模型
- **知乎**: 跟踪中文社区的讨论

### ⏰ 自动检查
- 定时自动检查各平台的更新
- ArXiv: 每6小时检查一次
- GitHub: 每12小时检查一次
- Hugging Face: 每24小时检查一次
- 知乎: 每24小时检查一次

### 🔔 实时通知
- 发现新内容时自动推送浏览器通知
- 可在设置中开启/关闭通知功能

### 📊 内容聚合
- 按来源分类显示新内容
- 显示最后检查时间
- 提供直达链接

## 安装方法

### 方式一：开发者模式安装（推荐）

1. 下载或克隆本仓库：
   ```bash
   git clone https://github.com/WinstonWmj/RL-for-VLA-Survey.git
   cd RL-for-VLA-Survey/chrome-extension
   ```

2. 打开Chrome浏览器，访问 `chrome://extensions/`

3. 开启右上角的"开发者模式"

4. 点击"加载已解压的扩展程序"

5. 选择 `chrome-extension` 文件夹

6. 扩展安装完成！点击浏览器工具栏的扩展图标即可使用

### 方式二：从Chrome Web Store安装

*（待发布到Chrome Web Store后可用）*

## 使用说明

### 基本操作

1. **查看更新**: 点击扩展图标打开弹窗，查看各平台的最新内容

2. **立即检查**: 点击"立即检查"按钮手动触发检查

3. **访问GitHub**: 点击"查看GitHub"按钮直接访问完整的调研报告

4. **查看详情**: 点击每条内容的"查看详情"链接跳转到原始页面

### 通知设置

扩展会在发现新内容时自动发送浏览器通知。如需关闭通知：

1. 右键点击扩展图标
2. 选择"选项"
3. 关闭"启用通知"选项

## 技术架构

### Manifest V3
本扩展使用最新的Chrome扩展Manifest V3规范开发。

### 核心组件

- **Service Worker** (`background.js`): 后台服务，负责定时检查和数据抓取
- **Popup** (`popup.html` + `popup.js`): 弹窗界面，显示聚合内容
- **Storage API**: 使用Chrome Storage API存储检查历史和新内容

### 监控实现

#### ArXiv监控
使用ArXiv API查询最新论文：
```javascript
const apiUrl = 'http://export.arxiv.org/api/query?search_query=...';
```

#### GitHub监控
使用GitHub API查询仓库提交：
```javascript
const apiUrl = 'https://api.github.com/repos/Denghaoyuan123/Awesome-RL-VLA/commits';
```

#### Hugging Face监控
通过页面抓取获取新模型信息（需要content script配合）

#### 知乎监控
通过页面抓取获取新讨论（需要content script配合）

## 开发指南

### 项目结构
```
chrome-extension/
├── manifest.json          # 扩展配置文件
├── popup.html            # 弹窗页面
├── scripts/
│   ├── background.js     # 后台服务脚本
│   └── popup.js          # 弹窗逻辑脚本
├── icons/                # 扩展图标（需要添加）
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # 本文档
```

### 添加图标

需要准备三个尺寸的图标文件：
- `icon16.png` (16x16)
- `icon48.png` (48x48)
- `icon128.png` (128x128)

可以使用以下工具生成：
- [Favicon Generator](https://realfavicongenerator.net/)
- [Icon Generator](https://www.favicon-generator.org/)

### 本地开发

1. 修改代码后，访问 `chrome://extensions/`
2. 点击扩展卡片上的"重新加载"按钮
3. 重新打开扩展弹窗测试

### 调试

- **Service Worker调试**: 在 `chrome://extensions/` 中点击"Service Worker"链接
- **Popup调试**: 右键点击扩展弹窗，选择"检查"

## 未来改进

### 功能增强
- [ ] 添加更多监控源（Twitter/X、Reddit、Medium等）
- [ ] 支持自定义关键词过滤
- [ ] 支持导出监控数据
- [ ] 添加数据可视化图表
- [ ] 支持多语言界面

### 自动化集成
- [ ] 自动提交Pull Request到GitHub仓库
- [ ] 自动生成周报/月报
- [ ] 与Notion、Obsidian等笔记工具集成

### 性能优化
- [ ] 实现增量更新机制
- [ ] 添加缓存层减少API调用
- [ ] 优化大量数据的渲染性能

## 隐私说明

本扩展：
- ✅ 仅访问公开的学术资源和社区平台
- ✅ 所有数据存储在本地（Chrome Storage）
- ✅ 不收集任何用户个人信息
- ✅ 不向第三方服务器发送数据
- ✅ 开源代码，可审查

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！

## 联系方式

- GitHub仓库: https://github.com/WinstonWmj/RL-for-VLA-Survey
- 问题反馈: https://github.com/WinstonWmj/RL-for-VLA-Survey/issues

---

**注意**: 本扩展目前处于开发阶段，部分功能可能需要进一步完善。实际使用时，某些监控功能可能受到目标网站的反爬虫策略限制。
