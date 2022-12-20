import settingArray from './uilts/parseSettings';
import openFile from './uilts/loadFile';
import {open} from 'fs';

const file = process.argv[2];
const stdin = process.stdin;
const fs = require('fs');
const settings = settingArray;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf-8');

let isFileSaved: boolean = true;
let buffer: string[][] = [['Hello, how are you'], ['this is new line'], ['New line delete me '], ['end of line']];
let editMode: 'NORMAL' | 'INSERT' = 'NORMAL';
let cursor = {
	line: 0,
	letter: 0,
};

//--UILTS--//

// const delay = (ms: number) => {
// 	return new Promise(res => res, ms);
// }

const newLine = () => {
	isFileSaved = false;
	buffer.push(['']);
}

const deleteLine = (lineIndex: number) => {
	isFileSaved = false;
	buffer.splice(lineIndex, 1);
	cursor.line = cursor.line-1 == -1 ? 0 : cursor.line-1;
}

const checkFile = () => {
	if (file != undefined && fs.existsSync(file)) {
		buffer = openFile(file);
	}
}

const saveFile = async () => {
	let storeBuffer: string[]= [];

	buffer.forEach((arr) => {
		let storeArr: string[] = arr[0].split('');
		
		storeArr.push('\n');
		storeBuffer.push(storeArr.join(''));
	})

	await fs.writeFile(`./${file}`, storeBuffer.join(''), (err: any) => {
		if (err) {
			console.log(err);
		}
	});
	isFileSaved = true;
	
	showBuffer();
}

//--FUNCTIONS--//

const showAirline = () => {
	const modeText = `\x1b[45m mode: ${editMode} \x1b[0m`;
	const lineText = `\x1b[44m line: ${cursor.line}/${buffer.length} \x1b[0m`;
	const fileText = `\x1b[41m file: ${isFileSaved==true?'':'*'}${file} \x1b[0m`;
	console.log(`${modeText}${lineText}${fileText}`);
}

const showBuffer = () => {
	console.clear();
	showAirline();
	
	// check end of the file
	if (cursor.line > buffer.length-1) {
		cursor.letter = 0;
		newLine();
	}
	
	// show buffer
	buffer.forEach((bufferArray, numberLine) => {
		let bufferLineSplit = bufferArray[0].split('');
		
		if (numberLine == cursor.line) {
			// last line check
			if (cursor.letter-1 > bufferLineSplit.length) {
				cursor.letter = bufferLineSplit.length-1;
				return;
			}
			
			let cursorLetter: string[][] = [
				['\x1b[47m\x1b[30m'], // set white background and black letter
				[bufferLineSplit[cursor.letter] ? bufferLineSplit[cursor.letter] : ' '],
				['\x1b[0m'],
				['\x1b[36m'],
			];
			
			bufferLineSplit[cursor.letter] = cursorLetter.join('');
			
			console.log('\x1b[36m%s\x1b[0m', `${numberLine} : ${bufferLineSplit.join('')}`);
		} else {
			console.log(` ${numberLine}: ${bufferArray[0]}`);
		}
	});
}

//TODO
// * arrows
// * numbers
// * enter key
const insertMode = (keyPressed: string) => {
	console.log(keyPressed)
	let bufferLineSplit = buffer[cursor.line][0].split('');
	
	// check if you can delete
	if (keyPressed == '\u0008' && bufferLineSplit.length == 1) return;
	
	// delete letter
	if (keyPressed == '\u0008') {
		bufferLineSplit.splice(cursor.letter, 1);
		cursor.letter--;
	}
	
	// tab (horizontal & vertical)
	else if (keyPressed == '\u0009' || keyPressed == '\u000B') {
		const tabSize = settings.TAB_SIZE ? settings.TAB_SIZE : 4;
		
		for (let i=0; i <tabSize; i++) {
			bufferLineSplit.splice(cursor.letter, 0, ' ');
			cursor.letter++;
		}
	}
	
	// enter key
	else if (keyPressed == null) {
		bufferLineSplit = [''];
		cursor.letter = 0;
		cursor.line += 1;
	}
	
	// write letter
	else {
		bufferLineSplit.splice(cursor.letter, 0, keyPressed);
		cursor.letter++;
	}
	
	buffer[cursor.line] = [bufferLineSplit.join('')];
	editMode = 'INSERT';
	isFileSaved = false;
	
	// showBuffer();
}

const exitEditor = async () => {
	let storeBuffer: string[]= [];

	buffer.forEach((arr) => {
		let storeArr: string[] = arr[0].split('');
		
		storeArr.push('\n');
		storeBuffer.push(storeArr.join(''));
	})

	await fs.writeFile(`./${file}`, storeBuffer.join(''), (err: any) => {
		if (err) {
			console.log(err);
		} else {
			process.exit();
		}
	});
}

const input = () => {
	stdin.on('data', (data: string) => {
		// exit mode
		if (data == '\u001B') {
			editMode = 'NORMAL';
			showBuffer();
		}
		// normal mode
		if (editMode == 'NORMAL') {
			switch (data.toLowerCase()) {
				// important
				case settings.EXIT || 'q':
					exitEditor();
					break;
				// move
				case settings.MOVE_UP || 'k':
					cursor.line = cursor.line-1 == -1 ? 0 : cursor.line-1;
					showBuffer();
					break;
				case settings.MOVE_DOWN || 'j':
					cursor.line += 1;
					showBuffer();
						break;
				case settings.MOVE_LEFT || 'h':
					cursor.letter = cursor.letter-1 == -1 ? 0 : cursor.letter-1;
					showBuffer();
					break;
				case settings.MOVE_RIGHT || 'l':
					cursor.letter += 1;
					showBuffer();
					break;
				
				// functions
				case settings.INSERT_MODE || 'i':
					editMode = 'INSERT';
					showBuffer();
					break;
				case settings.DELETE_LINE || 'd':
					deleteLine(cursor.line)
					showBuffer();
					break;
				case settings.SAVE_FILE || 'w':
					saveFile();
					break;
				default: 
					return;
			}
		}
		// insert mode
		else if (editMode == 'INSERT') {
			insertMode(data)
			showBuffer();
		}
	});
}

const main = () => {
	checkFile();
	showBuffer();
	input();
}
main();
