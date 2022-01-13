import {addonVersion, deploymentVersion, serverVersion} from "./config";
import {getUserVersion} from "./api/versions";

export function include(filename) {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

export function getTemplate(path) {
    return HtmlService.createTemplateFromFile(`${deploymentVersion}/client/${path}`);
}

export function getVersion() {
    return {
        version: serverVersion,
        addonVersion: addonVersion,
        alias: getUserVersion()
    }
}