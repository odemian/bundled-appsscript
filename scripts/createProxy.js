const fs = require("fs-extra");
const path = require("path");

const generateFunction = (name) => `
function ${name} (...args) {
    return _proxy("${name}", ...args);
}
`.trim();

module.exports.createProxy = function (apis, aliases = {}) {
    const functions = [];
    const obj = {};
    const aliasesMap = {};

    for (const api of apis) {
        for(const fn of api.apis) {
            obj[fn] = 1;
        }
    }

    // ignore for now
    // for(const alias of aliases) {
    //     aliasesMap[alias.alias] = getDeployableVersion(alias.version);
    // }

    const keys = Object.keys(obj);
    for(const key of keys) {
        functions.push(generateFunction(key));
    }

    const file = fs.readFileSync(path.join(".", "scripts", "template", "proxy.js"), "utf8");
    return file
        .replace("//**fns", functions.join("\n\n"))
        .replace("//**aliases", `var __aliases = ${JSON.stringify(aliasesMap)}`);
}