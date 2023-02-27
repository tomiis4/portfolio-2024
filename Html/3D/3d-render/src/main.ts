import './scss/style.scss'

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number][]
type Line = {
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	thicknes?: number,
	color?: string
}

const scale = 20.00;
const vertices: V3 = [
	[1, 1, -1], //1
	[1, -1, -1], //2
	[1, 1, 1], //3
	[1, -1, 1], //4
	[-1, 1, -1], //5
	[-1, -1, -1], //6
	[-1, 1, 1], //7
	[-1, -1, 1] //8
];
const faces: number[][] = [
	[1,5,7,3], // bottom
	[4,3,7,8], // front
	[8,7,5,6], // left
	[6,2,4,8], // top
	[2,1,3,4], // right
	[6,5,1,2]  // back
]

const rotate_cube = (dir: 'x'|'y'|'z', theta:number, vertices_arg: V3) => {
	const sin_t = Math.sin(theta);
	const cos_t = Math.cos(theta);

	let new_vertices = [...vertices_arg];

	new_vertices.forEach((arr,index) => {
		let [x,y,z] = arr;

		if (dir == 'x') {
			y = y*cos_t - z*sin_t
			z = y*sin_t + z*cos_t
		}

		if (dir == 'y') {
			x = x*cos_t + z*sin_t
			z = -x*sin_t + z*cos_t
		}

		if (dir == 'z') {
			x = x*cos_t - y*sin_t
			y = x*sin_t + y*cos_t
		}

		new_vertices[index] = [x,y,z]
	});

	return new_vertices;
}

const draw_cube = (x:number) => {
	const verticesR = rotate_cube('y',x, vertices); 

	faces.forEach(elem => {
		const a = verticesR[elem[0]-1]
		const b = verticesR[elem[1]-1]
		const c = verticesR[elem[2]-1]
		const d = verticesR[elem[3]-1]


		line({
			x1: (a[0]+scale)*scale,
			y1: (a[1]+scale)*scale,
			x2: (b[0]+scale)*scale,
			y2: (b[1]+scale)*scale,
		})
		line({
			x1: (b[0]+scale)*scale,
			y1: (b[1]+scale)*scale,
			x2: (c[0]+scale)*scale,
			y2: (c[1]+scale)*scale,
		})
		line({
			x1: (c[0]+scale)*scale,
			y1: (c[1]+scale)*scale,
			x2: (d[0]+scale)*scale,
			y2: (d[1]+scale)*scale,
		})
		line({
			x1: (d[0]+scale)*scale,
			y1: (d[1]+scale)*scale,
			x2: (a[0]+scale)*scale,
			y2: (a[1]+scale)*scale,
		})
	})
}

const line = (e: Line) => {
	ctx!.beginPath();   

	ctx!.strokeStyle = e.color ?? 'white';
	ctx!.lineWidth = e.thicknes ?? 3;

	ctx!.moveTo(e.x1, e.y1);
	ctx!.lineTo(e.x2, e.y2);

	ctx!.stroke(); 
}


const rangeX = document.querySelector('#x');
const rangeY = document.querySelector('#y');
const rangeZ = document.querySelector('#z');

// main
const loop = () => {
	ctx!.clearRect(0,0, width, height);

	// @ts-ignore
	draw_cube(parseInt(rangeX!.value)/50)

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
