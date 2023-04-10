import fs from 'fs'

const readFile = (path: string): string[] => {
	try { 
		const data = fs.readFileSync(path, 'utf8');
		return data.split(/\r?\n/); 
	} catch (err) {
		console.error(err);
	}

   return ['']
}

export default readFile;
