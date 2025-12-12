# YouTube Siu

## 项目概述
YouTube Siu 是一个高效、易用的 YouTube 内容下载工具，支持自定义配置和钩子扩展，让您能够轻松下载和管理 YouTube 视频和音频内容。

## 功能特性
- 🚀 **快速下载**：基于 yt-dlp 实现高效的 YouTube 内容下载
- 🎵 **音频优先**：默认配置仅下载音频，节省存储空间
- 🔧 **高度可配置**：支持通过 hooks 自定义下载参数、文件名和保存路径
- 📦 **全局命令**：支持全局安装，可通过简单命令快速使用
- 🌐 **跨平台兼容**：支持 Windows 和 macOS 操作系统
- 🎯 **灵活扩展**：提供丰富的 hooks 接口，支持自定义下载流程

## 环境要求
- **Python**：3.8 或更高版本
- **Node.js**：14 或更高版本
- **yt-dlp**：全局安装
- **ffmpeg**：全局安装（用于音频/视频处理）
- **网络环境**：能够访问 YouTube 的网络连接

## 安装步骤

### 1. 安装系统依赖

#### yt-dlp 安装
- **通过 pip 安装**（推荐）：
  ```bash
  pip install yt-dlp
  ```
- **Windows 手动安装**：
  1. 访问 [yt-dlp GitHub 主页](https://github.com/yt-dlp/yt-dlp) 下载 `yt-dlp.exe`
  2. 将 `yt-dlp.exe` 所在目录添加到系统环境变量 `PATH`
  3. 验证安装：`yt-dlp --version`
- **macOS 手动安装**：
  1. 下载 yt-dlp 可执行文件
  2. 赋予执行权限：`chmod +x yt-dlp`
  3. 移动到可执行目录：`sudo mv yt-dlp /usr/local/bin/`
  4. 验证安装：`yt-dlp --version`

#### ffmpeg 安装
- **Windows**：
  1. 访问 [ffmpeg 官网](https://ffmpeg.org/) 下载最新版本
  2. 解压到任意目录
  3. 将解压后 `bin` 目录添加到系统环境变量 `PATH`
  4. 验证安装：`ffmpeg -version`
- **macOS**：
  ```bash
  brew install ffmpeg
  # 验证安装
  ffmpeg -version
  ```

### 2. 安装项目依赖

1. 克隆或下载项目到本地
2. 进入项目目录：
   ```bash
   cd youtube-siu
   ```
3. 安装 npm 依赖：
   ```bash
   npm install
   ```

## 使用方法

### 本地运行

在项目目录下直接运行：

```bash
npm start https://www.youtube.com/watch?v=VIDEO_ID
```

### 全局命令使用

1. 在项目目录下运行：
   ```bash
   npm link
   ```
2. 即可全局使用 `siu` 命令：
   ```bash
   siu https://www.youtube.com/watch?v=VIDEO_ID
   ```

### 自定义全局命令

1. 编辑项目根目录下的 `package.json` 文件，修改 `bin` 字段：
   ```json
   "bin": {
     "yt": "bin/yt.js"
   }
   ```
2. 重新运行 `npm link`：
   ```bash
   npm link
   ```
3. 即可使用自定义命令：
   ```bash
   yt https://www.youtube.com/watch?v=VIDEO_ID
   ```

### 自定义参数

可以通过 `arg=xxx` 格式传入自定义参数，这些参数会提供给所有 hooks：

```bash
npm start https://www.youtube.com/watch?v=VIDEO_ID arg=param1 arg=param2
```

## 配置说明

### 默认配置

- **默认下载模式**：仅下载音频
- **默认保存路径**：项目根目录下的 `download` 文件夹
- **默认文件名格式**：`YYYY_MM_DD@random_words`

### 通过 Hooks 自定义配置

所有配置均可通过 hooks 进行自定义，详情请参考 [Hooks 说明](#hooks-说明) 章节。

## Hooks 说明

Hooks 是 YouTube Siu 提供的扩展机制，允许您在下载过程的不同阶段插入自定义逻辑。

### 1. beforeRun

**触发时机**：下载开始前

**功能**：可修改下载参数

**可修改参数**：
- `url`：YouTube 视频链接
- `saveFolder`：保存文件夹路径（默认：项目根目录 `download` 文件夹）
- `dlpCommand`：yt-dlp 命令（默认：仅下载音频）

**返回值**：必须返回修改后的参数对象

### 2. createName

**触发时机**：生成文件名时

**功能**：自定义文件名

**接收参数**：
- `saveFileName`：默认文件名（格式：`YYYY_MM_DD@random_words`）

**返回值**：必须返回修改后的文件名

### 3. afterRun

**触发时机**：下载完成后

**功能**：执行下载后的自定义逻辑

**接收参数**：全部运行参数

**返回值**：可选，不影响主流程

### 类型定义

Hooks 的类型定义位于项目根目录的 `SiuTypes.d.ts` 文件中，建议参考使用。

## 常见问题

### Q: 下载失败提示 "无法访问 YouTube"
A: 请确保您的网络环境能够访问 YouTube，并且 yt-dlp 已正确安装。

### Q: 如何修改默认下载格式？
A: 可以通过 `beforeRun` hook 修改 `dlpCommand` 参数，自定义 yt-dlp 命令。

### Q: 如何修改默认保存路径？
A: 可以通过 `beforeRun` hook 修改 `saveFolder` 参数。

### Q: 全局命令无法使用？
A: 请检查 `npm link` 是否成功执行，以及环境变量 `PATH` 是否包含 npm 全局目录。

### Q: 下载的文件没有声音？
A: 请确保 ffmpeg 已正确安装，并且能够被 yt-dlp 调用。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建您的特性分支：`git checkout -b feature/AmazingFeature`
3. 提交您的更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 致谢

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - 强大的视频下载工具
- [ffmpeg](https://ffmpeg.org/) - 优秀的音视频处理库


---

[English Version](README.en.md)