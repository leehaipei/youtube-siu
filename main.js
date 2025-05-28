const randomWords = require("random-words");
const dayjs = require("dayjs");
const appRoot = require("app-root-path");
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const removeFileDir = require("./util/removeFileDir");
const runHooks = require("./util/runHooks");

const appRootPath = appRoot.path;
const COPYFLODER = "D:\\youtube";

function main(URL) {

  return new Promise(async (resolve, reject) => {

    if (!URL) {
      console.log(chalk.red("Missing parameters!"));
      resolve(false);
      return;
    }

    runHooks("beforeRun", {
      appRootPath,
      url: URL,
      copyFloder: COPYFLODER
    });

    const cachePath = appRootPath + "/.cache";
    const cache_existence = await fs.existsSync(cachePath);
    !cache_existence && fs.mkdirSync(cachePath);

    const dlpCommand = `yt-dlp -o ${appRootPath + "/.cache/%(title)s.%(ext)s"} -f140 ${URL}`;

    await execSync(dlpCommand);

    const readdir = fs.readdirSync(cachePath);
    const suffixName = path.extname(cachePath + "/" + readdir[0]);
    const cacheFileName = path.parse(cachePath + "/" + readdir[0]).name;
    const generatedFileName = `${dayjs().format("MM_DD")}@${randomWords(2).join("_")}`;
    const cacheFilePath = cachePath + "/" + cacheFileName + suffixName;
    const copyFilePath = COPYFLODER + "/" + generatedFileName + suffixName;

    const copy_existence = await fs.existsSync(COPYFLODER);
    !copy_existence && fs.mkdirSync(COPYFLODER);
    fs.copyFileSync(cacheFilePath, copyFilePath);

    console.log(chalk.green(cacheFileName));
    console.log("⬇️");
    console.log(chalk.bgGreen(generatedFileName));

    runHooks("afterRun", {
      appRootPath,
      url: URL,
      copyFloder: COPYFLODER,
      dlpCommand,
      cache_existence,
      copy_existence,
      readdir,
      suffixName,
      cacheFileName,
      generatedFileName,
      cacheFilePath,
      copyFilePath
    });

    removeFileDir(cachePath);
    resolve(true);
  })
}
module.exports = main;
