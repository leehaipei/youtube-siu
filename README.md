# youtube_siu
siu的一下，下载好youTube内容



## 使用步骤

0. 极富科学性的网络环境 `!important`
1. 本地具备`python`环境`version 3.8+`
2. 全局安装`yt-dlp`
3. 全局安装`ffmpeg`
4. 安装依赖`npm i`
5. 运行程序并携带参数
   - `npm start https://www.youtube.com/watch?v=aaaaaaaaaaa`





## yt-dlp安装

- 前往 [yt-dlp](https://github.com/yt-dlp/yt-dlp) GitHub主页下载相关文件
- 通过`python`的包管理工具`pip`进行安装
- windows
  - 通过`pip`安装后检查是否安装成功无报错，且可以全局直接调用
  - 通过GitHub下载`yt-dlp.exe`文件的方式使用；需要添加`path`路径
    1. `此电脑`右键选择`属性`
    2. 进入`高级系统设置`
    3. 进入`环境变量`
    4. `用户变量`及`系统变量`中`path`新建`yt-dlp.exe`文件的路径，注意不要写入文件名
- macOS
  - 通过`pip`安装后检查是否可全局使用

## ffmpeg安装

1. [ffmpeg](https://ffmpeg.org/)官网下载
2. `essentials`或`full`版均可
3. 安装
   - windows
     1. 将下载的文件解压到任意目录
     2. 将解压后文件的`bin`目录参照`yt-dlp安装`添加`path`路径的方法
   - macOS
     1. 可以通过`brew`安装；`brew install ffmpeg`
     2. 验证ffmpeg；`ffmpeg -version`