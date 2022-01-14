const fs = require("fs-extra");
const path = require("path");

const generateFunction = (bundleName, name) => `
function ${name} (...args) {
    return ${bundleName}.${name}(...args);
}
`.trim();

module.exports.createProxy = function (bundleName, apis) {
    const functions = [];
    const obj = {};

    for (const api of apis) {
        for(const fn of api.apis) {
            obj[fn] = 1;
        }
    }

    const keys = Object.keys(obj);
    for(const key of keys) {
        functions.push(generateFunction(bundleName, key));
    }

    const file = fs.readFileSync(path.join(".", "scripts", "template", "proxy.js"), "utf8");
    return file
        .replace("//**fns", functions.join("\n\n"));
}