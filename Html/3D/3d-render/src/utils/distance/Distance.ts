import {V3} from "../Types";

//	( (x2 - x1)2 + (y2 - y1)2 + (z2 - z1)2 )1/2
const Distance = ([x1,y1,z1]: V3, [x2,y2,z2]: V3): number => {
	return (
		(x2 - x1)*(x2 - x1) +
		(y2 - y1)*(y2 - y1) +
		(z2 - z1)*(z2 - z1)
	) / 2
}

export default Distance;
