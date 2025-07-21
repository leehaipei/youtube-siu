const args = process.argv.slice(2);
const sleep = require("./util/sleep");

const runArgs = [],
  urls = [];

args.forEach((arg) => {
  if (arg.startsWith("arg=")) {
    runArgs.push(arg.substring(4));
  } else {
    urls.push(arg);
  }
});

async function start() {
  for (let index = 0; index < urls.length; index++) {
    await require("./main")(urls[index], runArgs);
    await sleep();
  }
}

start();
