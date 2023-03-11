import { V3 } from "../Types";

const Rotate = (dir: 'x'|'y'|'z', theta: number, vertices: V3[]): V3[] => {
	const sin_t = Math.sin(theta);
	const cos_t = Math.cos(theta);

	return vertices.map(([x, y, z]) => {
		let x1 = x;
		let y1 = y;
		let z1 = z;

		if (dir == 'x') {
			y1 = y*cos_t - z*sin_t
			z1 = y*sin_t + z*cos_t
		} else if (dir == 'y') {
			x1 = x*cos_t + z*sin_t
			z1 = -x*sin_t + z*cos_t
		} else if (dir == 'z') {
			x1 = x*cos_t - y*sin_t
			y1 = x*sin_t + y*cos_t
		}
		
		return [x1,y1,z1];
	});
}


export default Rotate;
