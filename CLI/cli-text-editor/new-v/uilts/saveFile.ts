const fs = require('node:fs');

const saveFile = async (buffer: string[][], fileName: string) => {
	let storeBuffer: string[] = [];
	
	for (let i=0; i <buffer.length; i++) {
		let storeLine: string[] = buffer[i][0].split('');
		
		storeLine.push('\n');
		storeBuffer.push(storeLine.join(''));
	}
	
	await fs.writeFile(`./${fileName}`, storeBuffer.join(''), (err: any) => {
		if (err) {
			console.log(err);
		}
	});
}

export default saveFile;
