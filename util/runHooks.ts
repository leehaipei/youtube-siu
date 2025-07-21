import fs from "fs";
import appRoot from "app-root-path";

export interface RunObject {
  appRootPath?: string;
  url?: string;
  saveFloder?: string;
  dlpCommand?: string;
  cache_existence?: boolean;
  copy_existence?: boolean;
  readdir?: string[];
  suffixName?: string;
  cacheFileName?: string;
  saveFileName?: string;
  cacheFilePath?: string;
  copyFilePath?: string;
  cachePath?: string;
  ARGS?: string[];
}

/**
 *
 * @param {String<"beforeRun" | "afterRun" | "createName">} hookName hook名称
 * @param {Object} runObject 运行产生的参数对象
 * @returns {Object} 返回结果对象，包含运行结果
 */
function runHooks(hookName: "beforeRun" | "afterRun" | "createName", runObject: RunObject): RunObject | void {
  const hook = fs.existsSync(`${appRoot.path}/${hookName}.js`);
  if (hook) {
    const hook = require(`${appRoot.path}/${hookName}.js`);
    if (typeof hook === "function") {
      return hook(runObject);
    }
  }
}

export default runHooks;