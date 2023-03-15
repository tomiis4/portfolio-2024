import { V3, ParsedData } from "../Types";

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

// get *.obj models as argument and return array of vertices and faces
const Parser = async (path: string): Promise<ParsedData> => {
	const content:string = await get_data(path)
	const data = content.replace(/^(vn|vt).*(\r?\n)/gm, '').split(/\r?\n/);

	let vertices: V3[] = [];
	let faces: number[][] = [];

	for (let i=0; i < data.length; i++) {
		const line = data[i];

		// vertices
		if (line.startsWith('v ')) {
			const splited = line.replace(/v/, '').trim().split(' ');
			const [x,y,z] = splited

			vertices.push([ parseFloat(x), parseFloat(y), parseFloat(z) ]);
		}

		// faces
		if (line.startsWith('f ')) {
			const segments = line.replace(/f/, '').trim().split(' ');
			let temp_segments: number[] = [];

			for (let j=0; j < segments.length; j++) {
				const elem = segments[j];
				temp_segments.push(parseFloat(elem));
			}

			faces.push(temp_segments)
		}
	}

	return {
		vertices: vertices,
		faces: faces
	};
}

export default Parser;
