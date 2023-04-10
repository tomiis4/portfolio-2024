import fs from 'fs'

const readFile = (path: string): string[] => {
	try { 
		const data = fs.readFileSync(path, 'utf8');
      const content = data.split(/\r?\n/);

      if (content.length == 0) {
         return ['']
      }

		return content; 
	} catch (err) {
		console.error(err);
	}

   return ['']
}

export default readFile;
