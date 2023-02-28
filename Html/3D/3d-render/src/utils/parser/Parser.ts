type V3 = [number,number,number];
type V2 = [number,number];

type ParsedData = {
	vertices: V3[],
	faces: V2[]
}

const toInt = (n:string):number => {
	return parseFloat(n);
}

const get_data = async (url:string) => {
	let n = ''

	await fetch(url)
		.then((r) => r.text())
		.then(content => {
			n = content
			return content
	});

	return n;
}

// @ts-ignore
const Parser = async(path: string): ParsedData => {
	const content:string = await get_data(path)
	const data = content.split(/\r?\n/);

	let vertices: V3[] = [];
	let faces: V2[] = [];

	for (let i=0; i < data.length; i++) {
		const line = data[i];

		// vertices
		if (line.startsWith('v ')) {
			const splited = line.replace(/v /, '').split(' ');
			const [x,y,z] = splited

			vertices.push([ toInt(x), toInt(y), toInt(z) ]);
		}

		// faces
		if (line.startsWith('f ')) {
			const segments = line.replace(/f /, '').split(' ');

			for (let j=0; j < segments.length-1; j++) {
				const indexA = segments[j].split('/')[0];
				const indexB = segments[j+1].split('/')[0];

				if (j == segments.length-2) {
					faces.push([
						toInt(segments[segments.length-1].split('/')[0]),
						toInt(segments[0].split('/')[0])
					]);
				} else {
					faces.push([
						toInt(indexA),
						toInt(indexB)
					]);
				}
			}
		}
	}

	return {
		vertices: vertices,
		faces: faces
	};
}

export default  Parser;
