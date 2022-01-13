export function getSelectedValues() {
	const sheet = SpreadsheetApp.getActiveSheet();
	return sheet.getActiveRange().getValues();
}

export function insertValuesAtSelection(data: any[][]) {
	const sheet = SpreadsheetApp.getActiveSheet();
	const cell = sheet.getActiveCell();
	const targetRange = sheet.getRange(
		cell.getRow(),
		cell.getColumn(),
		data.length,
		data[0].length
	);
	targetRange.setValues(data);
}