import randomWords from "random-words";
import ora from "ora";
import dayjs from "dayjs";
import appRoot from "app-root-path";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import removeFileDir from "./util/removeFileDir";
import runHooks from "./util/runHooks";

import type { RunObject, HttpString } from "./SiuTypes";

const appRootPath = appRoot.path;
let SAVEFLODER = appRootPath + "/download";

function main(URL: HttpString, ARGS: Array<string> = []) {
  return new Promise(async (resolve, reject) => {
    if (!URL) {
      console.log(chalk.red("Missing parameters!"));
      resolve(false);
      return;
    }

    const spinner = ora(URL).start();

    const beforeRunResult = await runHooks("beforeRun", {
      appRootPath,
      url: URL,
      saveFloder: SAVEFLODER,
      ARGS
    } as RunObject);

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

    const createNameResult = await runHooks("createName", {
      appRootPath,
      url: URL,
      saveFloder: SAVEFLODER,
      dlpCommand,
      cachePath,
      suffixName,
      cacheFileName,
      ARGS
    } as RunObject);

    const saveFileName =
      createNameResult?.saveFileName ??
      `${dayjs().format("YYYY_MM_DD")}@${randomWords(2).join("_")}`;

    const cacheFilePath = cachePath + "/" + cacheFileName + suffixName;
    const copyFilePath = SAVEFLODER + "/" + saveFileName + suffixName;

    const copy_existence = await fs.existsSync(SAVEFLODER);
    !copy_existence && fs.mkdirSync(SAVEFLODER);
    fs.copyFileSync(cacheFilePath, copyFilePath);

    spinner.stop();

    if (cacheFileName !== saveFileName) {
      console.log(chalk.bgBlue(cacheFileName));
      console.log("⬇️");
    }
    console.log(chalk.bgGreen(saveFileName));

    await runHooks("afterRun", {
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
      ARGS
    } as RunObject);

    removeFileDir(cachePath);
    resolve(true);
  });
}
export default main;