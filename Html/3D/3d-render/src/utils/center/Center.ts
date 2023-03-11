import { V3 } from "../Types";

const Center = (e: {vertices: V3[], faces: number[][], face_index:number}):V3 => {
	let [x,y,z]:V3 = [-1,-1,-1];

	const face = e.faces[e.face_index];
	const face_len = face.length

	for (let i=0; i < face_len; i++) {
		const [x1, y1, z1] = e.vertices[ face[i]-1 ];
		
		x += x1;
		y += y1;
		z += z1;
	}

	x /= face_len;
	y /= face_len;
	z /= face_len;

	return [x,y,z];
}

export default Center;
