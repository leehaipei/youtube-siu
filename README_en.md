# YouTube Siu

## Project Overview
YouTube Siu is an efficient and easy-to-use YouTube content download tool that supports custom configuration and hook extensions, allowing you to easily download and manage YouTube video and audio content.

## Features
- 🚀 **Fast Download**: Based on yt-dlp for efficient YouTube content download
- 🎵 **Audio Priority**: Default configuration downloads only audio to save storage space
- 🔧 **Highly Configurable**: Supports custom download parameters, file names, and save paths through hooks
- 📦 **Global Command**: Supports global installation for quick use via simple commands
- 🌐 **Cross-Platform Compatible**: Supports Windows and macOS operating systems
- 🎯 **Flexible Extension**: Provides rich hook interfaces to support custom download workflows

## Environment Requirements
- **Python**: Version 3.8 or higher
- **Node.js**: Version 14 or higher
- **yt-dlp**: Globally installed
- **ffmpeg**: Globally installed (for audio/video processing)
- **Network Environment**: Network connection capable of accessing YouTube

## Installation Steps

### 1. Install System Dependencies

#### yt-dlp Installation
- **Install via pip** (Recommended):
  ```bash
  pip install yt-dlp
  ```
- **Manual Installation on Windows**:
  1. Visit the [yt-dlp GitHub page](https://github.com/yt-dlp/yt-dlp) to download `yt-dlp.exe`
  2. Add the directory containing `yt-dlp.exe` to the system environment variable `PATH`
  3. Verify installation: `yt-dlp --version`
- **Manual Installation on macOS**:
  1. Download the yt-dlp executable file
  2. Grant execution permission: `chmod +x yt-dlp`
  3. Move to executable directory: `sudo mv yt-dlp /usr/local/bin/`
  4. Verify installation: `yt-dlp --version`

#### ffmpeg Installation
- **Windows**:
  1. Visit the [ffmpeg official website](https://ffmpeg.org/) to download the latest version
  2. Extract to any directory
  3. Add the extracted `bin` directory to the system environment variable `PATH`
  4. Verify installation: `ffmpeg -version`
- **macOS**:
  ```bash
  brew install ffmpeg
  # Verify installation
  ffmpeg -version
  ```

### 2. Install Project Dependencies

1. Clone or download the project to your local machine
2. Navigate to the project directory:
   ```bash
   cd youtube-siu
   ```
3. Install npm dependencies:
   ```bash
   npm install
   ```

## Usage

### Local Run

Run directly in the project directory:

```bash
npm start https://www.youtube.com/watch?v=VIDEO_ID
```

### Global Command Usage

1. Run in the project directory:
   ```bash
   npm link
   ```
2. You can now use the `siu` command globally:
   ```bash
   siu https://www.youtube.com/watch?v=VIDEO_ID
   ```

### Custom Global Command

1. Edit the `package.json` file in the project root directory, modify the `bin` field:
   ```json
   "bin": {
     "yt": "bin/yt.js"
   }
   ```
2. Re-run `npm link`:
   ```bash
   npm link
   ```
3. You can now use the custom command:
   ```bash
   yt https://www.youtube.com/watch?v=VIDEO_ID
   ```

### Custom Parameters

You can pass custom parameters in the format `arg=xxx`, which will be provided to all hooks:

```bash
npm start https://www.youtube.com/watch?v=VIDEO_ID arg=param1 arg=param2
```

## Configuration

### Default Configuration

- **Default Download Mode**: Audio only
- **Default Save Path**: `download` folder in the project root directory
- **Default File Name Format**: `YYYY_MM_DD@random_words`

### Custom Configuration via Hooks

All configurations can be customized through hooks. For details, please refer to the [Hooks](#hooks) section.

## Hooks

Hooks are an extension mechanism provided by YouTube Siu, allowing you to insert custom logic at different stages of the download process.

### 1. beforeRun

**Trigger Time**: Before download starts

**Function**: Can modify download parameters

**Modifiable Parameters**:
- `url`: YouTube video link
- `saveFolder`: Save folder path (Default: `download` folder in project root directory)
- `dlpCommand`: yt-dlp command (Default: Download audio only)

**Return Value**: Must return the modified parameter object

### 2. createName

**Trigger Time**: When generating file name

**Function**: Customize file name

**Received Parameters**:
- `saveFileName`: Default file name (Format: `YYYY_MM_DD@random_words`)

**Return Value**: Must return the modified file name

### 3. afterRun

**Trigger Time**: After download completes

**Function**: Execute custom logic after download

**Received Parameters**: All running parameters

**Return Value**: Optional, does not affect the main process

### Type Definitions

The type definitions for hooks are located in the `SiuTypes.d.ts` file in the project root directory, and it is recommended to refer to them.

## FAQ

### Q: Download fails with "Cannot access YouTube"
A: Please ensure your network environment can access YouTube and that yt-dlp is correctly installed.

### Q: How to modify the default download format?
A: You can modify the `dlpCommand` parameter through the `beforeRun` hook to customize the yt-dlp command.

### Q: How to modify the default save path?
A: You can modify the `saveFolder` parameter through the `beforeRun` hook.

### Q: Global command is not working?
A: Please check if `npm link` was executed successfully and if the npm global directory is included in the environment variable `PATH`.

### Q: Downloaded file has no sound?
A: Please ensure ffmpeg is correctly installed and can be called by yt-dlp.

## Contribution Guide

Welcome to submit Issues and Pull Requests!

1. Fork this project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) - Powerful video download tool
- [ffmpeg](https://ffmpeg.org/) - Excellent audio/video processing library