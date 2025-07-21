const fs = require("fs");
const appRoot = require("app-root-path");

/**
 *
 * @param {String<"beforeRun" | "afterRun" | "createName">} hookName hook名称
 * @param {Object} runObject 运行产生的参数对象
 * @returns {Object} 返回结果对象，包含运行结果
 */
function runHooks(hookName, runObject) {
  const hook = fs.existsSync(`${appRoot.path}/${hookName}.js`);
  if (hook) {
    const hook = require(`${appRoot.path}/${hookName}.js`);
    if (typeof hook === "function") {
      return hook(runObject);
    }
  }
}

module.exports = runHooks;
