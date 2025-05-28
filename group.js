const fs = require("fs");
const chalk = require("chalk");
const sleep = require("./util/sleep");

async function group() {
  const isGroupFile = fs.existsSync("URL_group.js");
  if (!isGroupFile) {
    fs.copyFileSync('template_URL_group.js', 'URL_group.js');
  }

  const URLs = require("./URL_group");

  if (!(URLs instanceof Array)) {
    console.log(chalk.red("URL_group.js data type error!"));
    console.log(
      chalk.red("The data type exported from the URL_group.js file should be an Array.")
    );
    return;
  }

  if (URLs.length === 0) {
    console.log(chalk.red("URL_group.js file is empty!"));
    return;
  }

  for (let index = 0; index < URLs.length; index++) {
    await require("./main")(URLs[index]);
    await sleep();
  }

  fs.unlinkSync("URL_group.js")
  fs.copyFileSync('template_URL_group.js', 'URL_group.js');
}

group();
