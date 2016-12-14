let watch = require('watch');
let path = require('path');
let root = path.join(__dirname);
let workroot = path.join(process.cwd());
let fs = require('fs');

let handlefile = function () {
    let raw = fs.readFileSync(path.join(workroot, "index.md"));
    fs.writeFileSync(path.join(root, "runtime", "built.js"), `export default ${JSON.stringify(escape(raw).split("%0A%0A---%0A%0A"))}`);
};

    handlefile();
watch.createMonitor(path.join(workroot), function (monitor) {
    monitor.files[path.join(root, "index.md")];
    monitor.on("changed", function () {
        handlefile();
    });
});

