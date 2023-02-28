import './scss/style.scss'

import Parser from './utils/parser/Parser';


const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number]
type Line = {
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	thicknes?: number,
	color?: string
}

let scale = 20.00;
let center = 50.00;

const parsed_data = await Parser('./src/objects/icosphere.obj')

const vertices: V3[] = parsed_data.vertices;
const faces = parsed_data.faces

const rotate_cube = (dir: 'x'|'y'|'z', theta:number, vertices_arg: V3[]) => {
	const sin_t = Math.sin(theta);
	const cos_t = Math.cos(theta);

	let new_vertices = [...vertices_arg];

	new_vertices.forEach((arr,index) => {
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

		new_vertices[index] = [x1,y1,z1]
	});

	return new_vertices;
}

const draw_cube = (rotation: V3) => {
	const roatatedX = rotate_cube('x', rotation[0], vertices)
	const roatatedY = rotate_cube('y', rotation[1], roatatedX)
	const verticesR = rotate_cube('z',rotation[2], roatatedY);

	faces.forEach(elem => {
		const a = verticesR[elem[0]-1]
		const b = verticesR[elem[1]-1]

		line({
			x1: (a[0]+center)*scale,
			y1: (a[1]+center)*scale,
			x2: (b[0]+center)*scale,
			y2: (b[1]+center)*scale,
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

const scaleEl = document.querySelector('#scale');
const centerEl = document.querySelector('#center');


// let [x,y,z]: V3 = [0,0,0]

const loop = () => {
	ctx!.clearRect(0,0, width, height);

	// automatical
	// x += 0.03
	// y += 0.02
	// z += 0.01
	// draw_cube([x,y,z])
	scale = parseFloat(scaleEl!.value)
	center = parseFloat(centerEl.value)

	// manual
	draw_cube([
		parseInt( rangeX!.value ) /25,
		parseInt( rangeY!.value ) /25,
		parseInt( rangeZ!.value ) /25
	])

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
