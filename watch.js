let watch = require('watch');
let path = require('path');
let root = path.join(__dirname);
let fs = require('fs');
module.exports = {
    watch (file, target) {
        if (!fs.existsSync(file)) {
            console.log(`entry file not exist ${file}`);
            fs.writeFileSync(target, `export default ["# sorry, ppt source was not found"]`);
        } else {
            let raw = fs.readFileSync(file);
            fs.writeFileSync(target, `export default ${JSON.stringify(escape(raw).split(`%0A%0A---%0A%0A`))}`);
        }
        let root = path.dirname(file);
        watch.createMonitor(root, function (monitor) {
            monitor.files[file]
            monitor.on(`changed`, function () {
                console.log(`file change detected on ${new Date()}`)
                let raw = fs.readFileSync(file);
                fs.writeFileSync(target, `export default ${JSON.stringify(escape(raw).split(`%0A%0A---%0A%0A`))}`);
            })
        })
    }
}