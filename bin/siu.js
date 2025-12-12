#!/usr/bin/env node

/**
 * 全局命令入口文件
 * 用于将 yt 命令映射到项目的 TypeScript 脚本
 */

const { execSync } = require('child_process');
const path = require('path');

/**
 * 检查依赖是否安装
 * @param {string} packageName - 包名
 * @param {string} projectRoot - 项目根目录
 * @returns {boolean} - 是否已安装
 */
function checkDependency(packageName, projectRoot) {
  try {
    require.resolve(packageName, { paths: [projectRoot] });
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 给包含空格的路径添加引号
 * @param {string} str - 字符串
 * @returns {string} - 处理后的字符串
 */
function quoteIfNeeded(str) {
  return str.includes(' ') ? `"${str}"` : str;
}

// 获取项目根目录
const projectRoot = path.resolve(__dirname, '..');

// 检查必要依赖
const requiredDependencies = ['ts-node', 'typescript'];
const missingDependencies = requiredDependencies.filter(dep => !checkDependency(dep, projectRoot));

if (missingDependencies.length > 0) {
  console.error(`错误: 缺少必要的依赖包 ${missingDependencies.join(' 或 ')}`);
  console.error('请运行: npm install');
  process.exit(1);
}

// 构建 ts-node 命令路径
const tsNodePath = require.resolve('ts-node/dist/bin.js', { paths: [projectRoot] });
const startScriptPath = path.resolve(projectRoot, 'script/start.ts');

// 获取用户传递的命令行参数
const userArgs = process.argv.slice(2);

// 执行 TypeScript 脚本
try {
  // 构建命令，确保包含空格的路径被正确处理
  const commandParts = [
    quoteIfNeeded(process.execPath),
    quoteIfNeeded(tsNodePath),
    quoteIfNeeded(startScriptPath),
    ...userArgs.map(quoteIfNeeded)
  ];
  
  const command = commandParts.join(' ');
  execSync(command, { stdio: 'inherit' });
  // 子进程正常结束，退出当前进程
  process.exit(0);
} catch (error) {
  // 捕获子进程错误，打印错误信息并退出
  console.error('执行命令时出错:', error.message);
  // 使用子进程的退出码或默认错误码
  process.exit(error.status || error.code || 1);
}
