var userProperties = PropertiesService.getUserProperties();
var version = userProperties.getProperty("__addonVersion") || "stable";
console.log("User version: " + version);

function _proxy(name, ...args) {
    console.log(name, version, ...args);
    if(__aliases[version] != null) {
        return Api[__aliases[version]][name](...args);
    } else {
        return Api[version][name](...args);
    }

}

//**fns

//**aliases