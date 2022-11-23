const fileName = process.argv[2];
const stdin = process.stdin;
const fs = require('node:fs');

// input settings
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

// file settings
let isFileSaved: boolean = true;
let buffer: string[][] = [['Nice'], ['woow'], ['lee']];

// editor settings
let editorMode: 'normal' | 'insert' = 'normal';
let settingsObj = {};
let cursor = {
	row: 0,
	column: 0 
}

// UILTS //

// Lines functions
const createLine = (position: number, value: string = '') => {
	buffer.splice(position, 0, [value]);
}

const lastLineCheck = () => {
	if (cursor.row > buffer.length-1) {
		isFileSaved = false;
		
		cursor.column = 0;
		createLine(buffer.length);
	}
}

const lineLetterCheck = (cursorBufferArr: string[]) => {
	// check letter left
	if (cursor.column <= -1) {
		cursor.column = 0;
	}
	
	// check top line
	if (cursor.row <= -1) {
		cursor.row = 0;
	}
	
	// check letter right
	if (cursor.column >= cursorBufferArr[0].split('').length) {
		cursor.column = cursorBufferArr[0].split('').length;
	}
}

const deleteLine = (lineIndex: number) => {
	isFileSaved = false;
	buffer.splice(lineIndex, 1);
	cursor.row = cursor.row-1 == -1 ? 0 : cursor.row-1;
}

// visual functions
const showAirline = () => {
	const modeText = `\x1b[45m mode: ${editorMode.toUpperCase()} \x1b[0m`;
	const lineText = `\x1b[44m line: ${cursor.row}/${buffer.length} \x1b[0m`;
	const fileText = `\x1b[41m file: ${isFileSaved==true?'':'*'}${fileName} \x1b[0m`;
	console.log(`${modeText}${lineText}${fileText}`);
}

// FUNCTIONS //

const showBuffer = () => {
	console.clear();
	
	// functions
	lastLineCheck();
	lineLetterCheck(buffer[cursor.row] ? buffer[cursor.row] : ['']);
	showAirline();
	
	// show buffer
	for (let i=0; i <buffer.length; i++) {
		let bufferLineArray = buffer[i][0].split('');
		
		// check cursor
		if (cursor.row == i) {
			let cursorLetter: string[][] = [
				['\x1b[47m\x1b[30m'], // set white background and black letter
				[bufferLineArray[cursor.column] ? bufferLineArray[cursor.column] : ' '],
				['\x1b[0m'],
				['\x1b[36m'],
			];
			
			bufferLineArray[cursor.column] = cursorLetter.join('');
			
			console.log('\x1b[36m%s\x1b[0m', `${i} : ${bufferLineArray.join('')}`);
		} else {
			console.log(` ${i}: ${buffer[i][0]}`);
		}
	}
}


const keyboardInput = () => {
	stdin.on('data', (data: string) => {
		// exit from any mode (VISUAL/EDIT)
		if (data == '\u001B') {
			// esc key
			editorMode = 'normal';
			showBuffer();
			
			return;
		}
		
		// NORMAL mode
		if (editorMode == 'normal') {
			switch (data) {
				// important functions
				case settingsObj.EXIT || 'q':
					process.exit();
					break;
				
				// moving
				case settingsObj.MOVE_UP || 'k':
					cursor.row--;
					showBuffer();
					break;
				case settingsObj.MOVE_DOWN || 'j':
					cursor.row++;
					showBuffer();
					break;
				case settingsObj.MOVE_LEFT || 'h':
					cursor.column--;
					showBuffer();
					break;
				case settingsObj.MOVE_RIGHT || 'l':
					cursor.column++;
					showBuffer();
					break;
				
				// functions
				case settingsObj.INSERT_MODE || 'i':
					editMode = 'INSERT';
					showBuffer();
					break;
				case settingsObj.DELETE_LINE || 'd':
					deleteLine(cursor.row);
					showBuffer();
					break;
				case settingsObj.SAVE_FILE || 'w':
					// saveFile();
					showBuffer();
					break;
				default: 
					return;
			}
		}
	});
}


const main = () => {
	keyboardInput();
	showBuffer();
}
