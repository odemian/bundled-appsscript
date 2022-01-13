import {getTemplate} from "./utils";

export function openAddon() {
    const template = getTemplate("index.html");
    SpreadsheetApp.getUi().showSidebar(template.evaluate());
}