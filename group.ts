import fs from "fs";
import chalk from "chalk";
import sleep from "./util/sleep";
import main from "./main";

async function group() {
  const isGroupFile = fs.existsSync("URL_group.ts");
  if (!isGroupFile) {
    fs.copyFileSync('template_URL_group.ts', 'URL_group.ts');
  }

  const URLs = require("./URL_group");

  if (!(URLs instanceof Array)) {
    console.log(chalk.red("URL_group.ts data type error!"));
    console.log(
      chalk.red("The data type exported from the URL_group.ts file should be an Array.")
    );
    return;
  }

  if (URLs.length === 0) {
    console.log(chalk.red("URL_group.ts file is empty!"));
    return;
  }

  for (let index = 0; index < URLs.length; index++) {
    await main(URLs[index], []);
    await sleep();
  }

  fs.unlinkSync("URL_group.ts")
  fs.copyFileSync('template_URL_group.ts', 'URL_group.ts');
}

group();

export { };