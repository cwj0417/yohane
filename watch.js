let watch = require('watch');
let path = require('path');
let root = path.join(__dirname);
let fs = require('fs');
module.exports = {
    watch (file, target) {
        let root = path.dirname(file);
        watch.createMonitor(root, function (monitor) {
            monitor.on("changed", function () {
                console.log(`file change detected on ${new Date()}`)
                let raw = fs.readFileSync(file);
                fs.writeFileSync(target, `export default ${JSON.stringify(escape(raw).split("%0A%0A---%0A%0A"))}`);
            })
        })
    }
}