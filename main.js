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
let SAVEFLODER = appRootPath + "/download";

function main(URL) {
  return new Promise(async (resolve, reject) => {
    if (!URL) {
      console.log(chalk.red("Missing parameters!"));
      resolve(false);
      return;
    }

    const beforeRunResult = runHooks("beforeRun", {
      appRootPath,
      url: URL,
      saveFloder: SAVEFLODER,
    });

    URL = beforeRunResult?.url ?? URL;
    SAVEFLODER = beforeRunResult?.saveFloder ?? SAVEFLODER;

    const cachePath = appRootPath + "/.cache";
    const cache_existence = await fs.existsSync(cachePath);
    !cache_existence && fs.mkdirSync(cachePath);

    const dlpCommand =
      beforeRunResult?.dlpCommand ??
      `yt-dlp -o ${appRootPath + "/.cache/%(title)s.%(ext)s"} -f140 ${URL}`;

    await execSync(dlpCommand);

    const readdir = fs.readdirSync(cachePath);
    const suffixName = path.extname(cachePath + "/" + readdir[0]);
    const cacheFileName = path.parse(cachePath + "/" + readdir[0]).name;

    const createNameResult = runHooks("createName", {
      appRootPath,
      url: URL,
      saveFloder: SAVEFLODER,
      dlpCommand,
      cachePath,
      suffixName,
      cacheFileName,
    });

    const saveFileName =
      createNameResult?.saveFileName ??
      `${dayjs().format("YYYY_MM_DD")}@${randomWords(2).join("_")}`;

    const cacheFilePath = cachePath + "/" + cacheFileName + suffixName;
    const copyFilePath = SAVEFLODER + "/" + saveFileName + suffixName;

    const copy_existence = await fs.existsSync(SAVEFLODER);
    !copy_existence && fs.mkdirSync(SAVEFLODER);
    fs.copyFileSync(cacheFilePath, copyFilePath);

    if (cacheFileName !== saveFileName) {
      console.log(chalk.bgBlue(cacheFileName));
      console.log("⬇️");
    }
    console.log(chalk.bgGreen(saveFileName));

    runHooks("afterRun", {
      appRootPath,
      url: URL,
      saveFloder: SAVEFLODER,
      dlpCommand,
      cache_existence,
      copy_existence,
      readdir,
      suffixName,
      cacheFileName,
      saveFileName,
      cacheFilePath,
      copyFilePath,
    });

    removeFileDir(cachePath);
    resolve(true);
  });
}
module.exports = main;
