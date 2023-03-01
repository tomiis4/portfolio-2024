import './scss/style.scss'

import Parser from './utils/parser/Parser';

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number]
type Line = {
	vertices: V3[],
	face: number[],
	thicknes?: number,
	color?: string
}

let scale = 20.00;
let center = 50.00;

const parsed_data = await Parser('./src/objects/cube.obj')

console.log(parsed_data)

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
	const verticesR = rotate_cube('z', rotation[2], roatatedY);

	for (let i=0; i < faces.length; i++) {
		const face = faces[i];

		line({
			face: face,
			vertices: verticesR
		})
	}
}

const line = (e: Line) => {
	ctx!.beginPath();   

	ctx!.fillStyle = e.color ?? 'white';
	ctx!.lineWidth = e.thicknes ?? 3;

	// for each item in one face
	for (let i=0; i < e.face.length; i++) {
		const [x,y,_] = e.vertices[e.face[i]-1];

		ctx!.lineTo((x+center)*scale, (y+center)*scale);
	}

	ctx!.fill(); 
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
