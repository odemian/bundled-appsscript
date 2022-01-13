import {createMenu} from "./menu/createMenu";

export {include, getTemplate, getVersion} from "./utils";
export {openAddon} from "./views";
export {goStable, goLatest} from "./api/versions";
export {getSelectedValues, insertValuesAtSelection} from "./api/selectedRange";

export function onOpen() {
    createMenu();
}
