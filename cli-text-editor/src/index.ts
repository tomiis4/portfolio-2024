const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let buffer: string[][] = [['Hello, how are you'], ['this is new line'], ['New line delete me '], ['end of line']];
let cursor = {
	character: '/',
	selectedCharacter: '',
	line: 0,
	letter: 2
};


const showBuffer = () => {
	console.log('\n\n');
	
	if (cursor.line > buffer.length-1) {
		buffer.push(['']);
	}

	// show buffer
	buffer.forEach((bufferArray, line) => {
		let bufferLineSplit = bufferArray[0].split('');
		
		if (line == cursor.line) {
			bufferLineSplit[cursor.letter] = cursor.character;
			cursor.selectedCharacter = bufferLineSplit[cursor.letter];
			
			console.log('\x1b[36m%s\x1b[0m', `${line} : ${bufferLineSplit.join('')}`);
		} else {
			console.log(` ${line}: ${bufferArray[0]}`);
		}
	});
}
showBuffer();

stdin.on('data', (data: string) => {
	switch (data) {
		case 'q':
			process.exit();
		case 'k':
			cursor.line -= 1;
			showBuffer();
			break;
		case 'j':
			cursor.line += 1;
			showBuffer();
			break;
		case 'h':
			cursor.letter = cursor.letter - 1;
			showBuffer();
			break;
		case 'l':
			cursor.letter += 1;
			showBuffer();
			break;
		default: 
			return;
	}
});
// showBuffer()
