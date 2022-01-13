export function createMenu() {
	const menu = SpreadsheetApp.getUi().createAddonMenu();
	menu.addItem("Open addon", "openAddon");
	menu.addToUi();
}