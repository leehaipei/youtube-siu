import FtpClient from 'ftp';
import fs from 'fs';
const client = new FtpClient();
import chalk from "chalk";

const config = {
  host: 'xxxx.xxxx.xxxx.xxxx', // ftp服务器地址
  port: 21, // 端口，一版默认21
  user: 'xxxxxx', // 登录名
  password: 'xxxxxx', // 登录密码
  keepalive: 10000  // ms
}

function connect() {
  return new Promise<void>((resolve, reject) => {
    client.on('ready', () => {
      console.log(chalk.gray('ftp ready'));
      resolve();
    })
    client.on('close', () => {
      console.log(chalk.gray('ftp close'));
    });
    client.on('end', () => {
      console.log(chalk.gray('ftp end'));
    });
    client.on('error', (err: any) => {
      console.log(chalk.gray('ftp err'), err);
      reject(err)
    });

    client.connect(config);
  })
}

/**
 * 
 * @param {String} sourcePath 上传源文件的路径
 * @param {String} fileName 目标位置的文件名称；文件名+扩展名
 * @returns {Promise<Boolean>}
 */
async function uploadFTP(sourcePath: string, fileName: string): Promise<Boolean> {
  if (!fs.existsSync(sourcePath)) {
    return false;
  }
  await connect();
  return new Promise((resolve, reject) => {
    client.put(sourcePath, fileName, (err: any) => {
      client.end();
      if (err) {
        console.log(err);
        reject(false);
      } else {
        console.log(chalk.bgGreen('FTP OK!'));
        resolve(true);
      }
    })
  });
}

export default uploadFTP;