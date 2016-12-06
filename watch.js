let watch = require('watch');
let handlefile = require('./src/rawhandl');
let config = require('./src/config');
let path = require('path');
let root = path.join(__dirname);
watch.createMonitor(path.join(root, config.root), function (monitor) {
    monitor.files[path.join(root, config.rawFile)];
    monitor.on("changed", function () {
        handlefile();
    });
});