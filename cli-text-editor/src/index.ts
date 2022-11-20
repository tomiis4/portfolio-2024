const stdin = process.stdin;
const file = process.argv[2];
import settingArray from './parseSettings';
const settings = settingArray[0];

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');


let buffer: string[][] = [['Hello, how are you'], ['this is new line'], ['New line delete me '], ['end of line']];
let editMode = 'NORMAL';
let cursor = {
	character: '▊',
	selectedCharacter: '',
	line: 0,
	letter: 0,
	action: '' //TODO remove?
};


//--UILTS--//
const newLine = () => {
	buffer.push(['']);
}

const deleteLine = (lineIndex: number) => {
	buffer.splice(lineIndex, 1);
	cursor.line = cursor.line-1 == -1 ? 0 : cursor.line-1;
}

//--FUNCTIONS--//

const showAirline = () => {
	const modeText = `\x1b[45m mode: ${editMode} \x1b[0m`;
	const lineText = `\x1b[44m line: ${cursor.line}/${buffer.length} \x1b[0m`;
	console.log(`${modeText}${lineText}`);
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

// input //TODO add or 
const input = () => {
	stdin.on('data', (data: string) => {
		switch (data.toLowerCase()) {
			case settings.EXIT || 'q':
				cursor.action = 'q';
				process.exit();
			case settings.MOVE_UP:
				cursor.line = cursor.line-1 == -1 ? 0 : cursor.line-1;
				cursor.action = 'k';
				showBuffer();
				break;
			case settings.MOVE_DOWN:
				cursor.line += 1;
				cursor.action = 'j';
				showBuffer();
				break;
			case settings.MOVE_LEFT:
				cursor.letter = cursor.letter-1 == -1 ? 0 : cursor.letter-1;
				cursor.action = 'h';
				showBuffer();
				break;
			case settings.MOVE_RIGHT:
				cursor.letter += 1;
				cursor.action = 'l';
				showBuffer();
				break;
			case settings.DELETE_LINE:
				cursor.action = 'd';
				deleteLine(cursor.line)
				showBuffer();
			default: 
				return;
		}
	});
}

const main = () => {
	showBuffer();
	input();
}
main();
