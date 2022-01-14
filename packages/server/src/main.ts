import {createMenu} from "./menu/createMenu";

export {include, getTemplate, getVersion} from "./utils";
export {openAddon} from "./views";

// export all api
export * from "./api";

// global AppsScript hook
export function onOpen() {
    createMenu();
}
