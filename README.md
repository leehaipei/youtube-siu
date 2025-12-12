# youtube_siu
siu的一下，下载好youTube内容



## 使用步骤

0. 极富科学性的网络环境 `!important`
1. 本地具备`python`环境`version 3.8+`
2. 全局安装`yt-dlp`
3. 全局安装`ffmpeg`
4. 安装依赖`npm i`
5. 进入项目目录，运行程序并携带参数
   - `npm start https://www.youtube.com/watch?v=aaaaaaaaaaa`
   - 默认保存文件夹为项目根目录下`/download`文件夹；若是修改保存文件夹，可通过修改`beforeRun`hook中的`saveFloder`参数
   - 若需要通过hooks改变参数值，hook需提供返回值
   - 运行时的自定义参数可通过`arg=xxx`传入，并提供给所有hooks
6. 若希望全局运行命令可用
   - 在项目目录下运行`npm link`
   - 即可在全局使用`yt`命令，携带参数`yt https://www.youtube.com/watch?v=aaaaaaaaaaa`
   - 若需要自定义命令
     - 可在项目目录下的`package.json`中修改`bin`字段`"abcxyz": "bin/yt.js"`
     - 运行`npm link`后，即可在全局使用`abcxyz https://www.youtube.com/watch?v=aaaaaaaaaaa`命令



## hooks说明
- `beforeRun`: 运行前，可修改参数值url(需要获取的YouTube连接)、saveFloder(保存文件夹 | 默认项目根目录download文件夹)、dlpCommand(yt-dlp命令 | 默认只下载音频，命令可参考yt-dlp文档)
- `createName`: 文件命名，可接收文件名参数saveFileName(默认`YYYY_MM_DD@random_words`格式)
- `afterRun`: 运行后，默认不接收返回参数，可获取到全部运行参数
- hooks中的类型定义请使用`SiuTypes.d.ts`



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
