const fs = require("fs");
const appRoot = require("app-root-path");

/**
 *
 * @param {String<"beforeRun" | "afterRun">} hookName hook名称
 * @param {Object} runObject 运行产生的参数对象
 */
function runHooks(hookName, runObject) {
  const hook = fs.existsSync(`${appRoot.path}/${hookName}.js`);
  if (hook) {
    const hook = require(`${appRoot.path}/${hookName}.js`);
    typeof hook === "function" && hook(runObject);
  }
}

module.exports = runHooks;
