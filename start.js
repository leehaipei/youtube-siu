const args = process.argv.slice(2);
const sleep = require("./util/sleep");
async function start() {
  for (let index = 0; index < args.length; index++) {
    await require("./main")(args[index]);
    await sleep();
  }
}

start();
