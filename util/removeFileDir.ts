import fs from 'fs';

const removeFileDir = (path: string): void => {
    var files = fs.readdirSync(path);
    for (let item of files) {
        var stats = fs.statSync(`${path}/${item}`);
        if (stats.isDirectory()) {
            removeFileDir(`${path}/${item}`)
        } else {
            fs.unlinkSync(`${path}/${item}`)
        }
    }
    fs.rmdirSync(path)
}

export default removeFileDir;