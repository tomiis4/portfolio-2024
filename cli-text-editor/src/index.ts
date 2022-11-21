import settingArray from './uilts/parseSettings';
import openFile from './uilts/loadFile';
import {open} from 'fs';

const file = process.argv[2];
const stdin = process.stdin;
const fs = require('fs');
const settings = settingArray;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let isFileSaved: boolean = true;
let buffer: string[][] = [['Hello, how are you'], ['this is new line'], ['New line delete me '], ['end of line']];
let editMode: 'NORMAL' | 'INSERT' = 'NORMAL';
let cursor = {
	character: '▊',
	selectedCharacter: '',
	line: 0,
	letter: 0,
};

//--UILTS--//
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

//--FUNCTIONS--//

const showAirline = () => {
	const modeText = `\x1b[45m mode: ${editMode} \x1b[0m`;
	const lineText = `\x1b[44m line: ${cursor.line}/${buffer.length} \x1b[0m`;
	const fileText = `\x1b[41m file: ${file} \x1b[0m`;
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
			
			bufferLineSplit[cursor.letter] = cursor.character;
			cursor.selectedCharacter = bufferLineSplit[cursor.letter];
			
			console.log('\x1b[36m%s\x1b[0m', `${numberLine} : ${bufferLineSplit.join('')}`);
		} else {
			console.log(` ${numberLine}: ${bufferArray[0]}`);
		}
	});
}

//TODO
// * delete
// * arrows
const insertMode = (keyPressed: string) => {
	let bufferLineSplit = buffer[cursor.line][0].split('');
	
	bufferLineSplit.splice(cursor.letter, 0, keyPressed);
	cursor.letter++;
	
	buffer[cursor.line] = [bufferLineSplit.join('')];
	editMode = 'INSERT';
	isFileSaved = false;
	
	showBuffer();
}

// FIXME
const exitEditor = () => {
	if (isFileSaved == true) {
		process.exit();
	} else {
		if (!fs.existsSync(`./${file}`)) {
			fs.appendFile(`./${file}`, buffer.join(''), (err: any) => {
				if (err) {
					console.log(err);
				}
			});
		} else {
			fs.writeFile(`./${file}`, buffer.join(''), (err: any) => {
				if (err) {
					console.log(err);
				}
			});
		}
	}
}

const input = () => {
	stdin.on('data', (data: string) => {
		// exit mode
		if (data == settings.EXIT_MODE || data == 'p') {
			editMode = 'NORMAL';
		}
		// normal mode
		if (editMode == 'NORMAL') {
			switch (data.toLowerCase()) {
				// important
				case settings.EXIT || 'q':
					exitEditor();
					process.exit();
				
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
				default: 
					return;
			}
		}
		// insert mode
		else if (editMode == 'INSERT') {
			data == 'q' ? process.exit() : console.log(data);
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
