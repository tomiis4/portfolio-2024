type V3 = [number, number, number];

const Rotate = (dir: 'x'|'y'|'z', theta: number, vertices_arg: V3[]) => {
	const sin_t = Math.sin(theta);
	const cos_t = Math.cos(theta);

	let new_vertices = [...vertices_arg];

	for (let i=0; i < new_vertices.length; i++) {
		const arr = new_vertices[i];

		const [x,y,z] = arr;
		let [x1,y1,z1]: V3 = [...arr];

		if (dir == 'x') {
			y1 = y*cos_t - z*sin_t
			z1 = y*sin_t + z*cos_t
		}

		if (dir == 'y') {
			x1 = x*cos_t + z*sin_t
			z1 = -x*sin_t + z*cos_t
		}

		if (dir == 'z') {
			x1 = x*cos_t - y*sin_t
			y1 = x*sin_t + y*cos_t
		}

		new_vertices[i] = [x1,y1,z1]
	};

	return new_vertices;
}

export default Rotate;
