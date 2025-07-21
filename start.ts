import sleep from "./util/sleep";
import main from "./main";

const args = process.argv.slice(2);

const runArgs: string[] = [],
  urls: string[] = [];

args.forEach((arg) => {
  if (arg.startsWith("arg=")) {
    runArgs.push(arg.substring(4));
  } else {
    urls.push(arg);
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