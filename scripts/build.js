const fs = require("fs-extra");
const async = require("async");
const {exec} = require('child_process');
const path = require("path");
const {createProxy} = require("./createProxy");

const addonVersion = fs.readJsonSync("package.json").version;

function getServerPath(...paths) {
    return path.join(".", "build", ...paths);
}

function ensureBuildFolder(onDone) {
    fs.ensureDirSync(getServerPath());
    onDone();
}

function buildServer(onDone) {
    console.log("Build server");
    const build = exec("yarn workspace server build:dev");

    build.stdout.on('data', function (data) {
        console.log(data);
    });
    build.on("exit", function (code) {
        if (code === 0) {
            console.log("Server build done");
            onDone();
        } else {
            throw new Error("Server build failed with code: " + code);
        }
    });
}

function copyServer(onDone) {
    fs.copySync(path.join(".", "packages", "server", "build"), getServerPath(), {
        overwrite: true,
    });
    console.log("Server resources copied");
    onDone();
}

function createApiProxy(onDone) {
    const apis = [fs.readJsonSync(path.join(".", "build", "apis.json"))];
    const proxyFile = createProxy("Bundle", apis);

    fs.writeFileSync(path.join(".", "build", "apiProxy.js"), proxyFile);
    console.log("Api proxy created.");
    onDone();
}

async.series([
    ensureBuildFolder,
    buildServer,
    copyServer,
    createApiProxy,
]).then(() => {
    console.log("Build done: " + addonVersion);
});