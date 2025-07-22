import sleep from "./util/sleep";
import main from "./main";

import { HttpString } from "./SiuTypes";

const args = process.argv.slice(2);

const runArgs: string[] = [],
  urls: HttpString[] = [];

args.forEach((arg) => {
  if (arg.startsWith("arg=")) {
    runArgs.push(arg.substring(4));
  } else {
    if (arg.startsWith("https://")) {
      urls.push(arg as HttpString);
    } else {
      console.error(`参数 ${arg} 被忽略`);
    }
  }
});

async function start() {
  for (let index = 0; index < urls.length; index++) {
    await main(urls[index], runArgs);
    await sleep();
  }
}

start();

export {};
