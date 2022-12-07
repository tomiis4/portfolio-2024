import {dir} from 'node:console';
import fs from 'node:fs';

const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./list.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}
const parseData = (data: string[]) => {
	let currentDir: string[] = ['/'];
	let tree = {
		name: '/',
		folders: [],
		files: [],
	}

	data.forEach((value) => {
		if (value == '') return;
		// change dirs
		if (value.startsWith('$ cd')) {
			const str = value.replace(/\$| |cd/g, '').trim();
			
			if (str == '/') {
				currentDir = ['/'];
			} else if (str == '..') {
				currentDir.pop();
			} else if (str.match(/[a-z]/g)) {
				currentDir.push(str);
			}
			
			// console.log(str, currentDiri);
		}
		
		// get file tree
		if (!value.startsWith('$')) {
			if (currentDir[currentDir.length-1] == '/') {
				if (value.startsWith('dir')) {
					tree.folders.push({
						name: value.replace(/dir /g, ''),
						parent: currentDir.at(-1)!
					});
				} else {
					tree.files.push({
						name: value.split(' ')[1],
						size: parseInt(value.split(' ')[0]),
						parent: currentDir.at(-1)!
					});
				}
			} else {
				if (value.startsWith('dir')) {
					tree.folders.push({
						name: value.replace(/dir /g, ''),
						parent: currentDir.at(-1)!
					});
				} else {
					tree.files.push({
						name: value.split(' ')[1],
						size: parseInt(value.split(' ')[0]),
						parent: currentDir.at(-1)!
					});
				}
			}
		}
		// console.log(JSON.stringify(tree, null, 4))
	});
	
	return tree;
}

const getValues = () => {
	const data = dataArray();
	const parsedData = parseData(data);
	
	let result = 0;
	let sizeObj: {[key: string]: any} = {};
	
	parsedData.files.forEach((obj: {[key: string]: any}) => {
		if (sizeObj[obj.parent]) {
			sizeObj[obj.parent] += obj.size;
		} else {
			sizeObj[obj.parent] = obj.size;
		}
	});
	
	for (const key in sizeObj) {
		if (sizeObj[key] <= 100000) {
			result += sizeObj[key];
		}
	}
	
	console.log(sizeObj)
	return result;
}

console.clear();
console.log(getValues());
