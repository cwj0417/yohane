let fs = require('fs');
let config = require("./config");
let path = require('path');
let root = path.join(__dirname, "../");

module.exports = function () {
    let raw = fs.readFileSync(path.join(root, config.rawFile));
    fs.writeFileSync(path.join(root, config.distFile), `export default ${JSON.stringify(escape(raw).split("%0A%0A---%0A%0A"))}`);
};