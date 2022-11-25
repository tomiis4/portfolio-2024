const showAirline = (
	editorMode: string, 
	cursor: any, 
	isFileSaved: boolean, 
	buffer: string[][], 
	fileName: string
) => {
	const modeText = `\x1b[45m mode: ${editorMode.toUpperCase()} \x1b[0m`;
	const lineText = `\x1b[44m line: ${cursor.row}/${buffer.length} \x1b[0m`;
	const fileText = `\x1b[41m file: ${isFileSaved==true?'':'*'}${fileName} \x1b[0m`;
	console.log(`${modeText}${lineText}${fileText}`);
}

export default showAirline;
