import {read} from "fs";
const fs = require('fs');

let fileArray: string[][] = [];

const readFile = (fileName: string) => {
	try { 
		const data = fs.readFileSync(fileName, 'utf8');
		return data.split(/\r?\n/); 
	} catch (err) {
		console.error(err);
	}
}

const parseFile = (fileName: string) => {
	const dataArray: string[] = readFile(fileName);
	dataArray.forEach((value) => {
		fileArray.push([value]);
	});
}

const openFile = (path: string) => {
	parseFile(path);
	return fileArray;
}
export default openFile;
