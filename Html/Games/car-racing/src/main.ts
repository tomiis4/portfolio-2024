import './scss/style.scss'

import Parser from './utils/parser/Parser';
import Rotate from './utils/rotate/Rotate';
import Texture from './utils/texture/Texture';
import Gradient from './utils/gradient/Gradient';

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number];
type V2 = [number,number];

type Face = {
	position: V2,
	vertices: V3[],
	face: number[],
	scale: number,
	color?: string,
	transparent?: number,
	stroke?: boolean
}

type Car = {
	rotation: V3,
	position: V2
}

// type Tree = {
// 	rotation: V3,
	// position: V3,
	// scale: number,
// }

type Floor = {
	rotation: V3,
	position: V2,
}

type ModelData = {
	vertices: V3[],
	faces: number[][],
	scale: number,
	texture: string[],
	transparent?: number
	stroke?: boolean
}

// global data
const camera = [0, 0, -5];
const focalLength = 15;

// models
const parsed_floor = await Parser('./src/objects/road.obj');
const parsed_car = await Parser('./src/objects/car.obj');

const floor_data: ModelData = {
	vertices: parsed_floor.vertices,
	faces: parsed_floor.faces,
	scale: 780.0,
	transparent: 1,
	texture: Texture({
		faces: parsed_floor.faces,
		baseColor: Gradient({
			ctx: ctx!,
			width: width,
			height: height,
			colors: ['rgb(20,20,20)', 'rgb(40,40,40)', 'rgb(230,230,230)', 'rgb(230,230,230)']

		}),
		// isRandom: true,
		color: 'null',
	})
}

let car_data: ModelData = {
	vertices: parsed_car.vertices,
	faces: parsed_car.faces,
	scale: 55.0,
	transparent: 0.7,
	stroke: true,
	texture: Texture({
		faces: parsed_car.faces,
		color: 'red',
	})
}


let car: Car = {
	rotation: [3.8,0,0],
	position: [width/2, 615]
};

// let trees: Tree[] = [];

let floor: Floor = {
	rotation: [1.54,1.54,1.54],  // 0=front, 1=clock from top, 2=clock
	position: [width/2, 400]
}


// -- GLOBAL FUNCTIONS --
const ProjectVeretex = (vertex: V3): V2 => {
	const ratio = focalLength / (focalLength + vertex[2] + camera[2]);

	return [
		vertex[0] * ratio + camera[0], 
		vertex[1] * ratio + camera[1]
	];
}

const DrawModel = (e: {rotation: V3, data:ModelData, position: V2}) => {
	const [x,y,z] = e.rotation;

	const rotate_x = Rotate('x', x, e.data.vertices);
	const rotate_y = Rotate('y', y, rotate_x);
	const rotate_z = Rotate('z', z, rotate_y);

	for (let i=0; i < e.data.faces.length; i++) {
		const face = e.data.faces[i];

		DrawFace({
			position: e.position,
			vertices: rotate_z,
			face: face,
			scale: e.data.scale,
			color: e.data.texture[i],
			stroke: e.data.stroke,
			transparent: e.data.transparent
		})
	}
}

const DrawFace = (e: Face) => {
	ctx!.beginPath();

	ctx!.lineWidth = 2;
	ctx!.strokeStyle = "#CCCCCC";
	ctx!.globalAlpha = e.transparent ?? 1;

	// for each vertex in one face
	for (let i=0; i < e.face.length; i++) {
		ctx!.fillStyle = e.color ?? 'white';

		const vertex = e.vertices[e.face[i]-1];
		const [x,y] = ProjectVeretex(vertex);
		ctx!.lineTo(x * e.scale + e.position[0], y * e.scale + e.position[1]);
		
		// to the first element to complete face
		if (i == e.face.length-1) {
			ctx!.fillStyle = e.color ?? 'white';

			const vertex = e.vertices[e.face[0]-1];
			const [x,y] = ProjectVeretex(vertex);
			ctx!.lineTo(x * e.scale + e.position[0], y * e.scale + e.position[1]);
		}
	}

	ctx!.fill();
	e.stroke ? ctx!.stroke() : e.stroke
}


// -- PROJECT FUNCTIONS --
const project_floor = () => {
	DrawModel({
		rotation: floor.rotation,
		position: floor.position,
		data: floor_data
	})
}

const project_car = () => {
	DrawModel({
		rotation: car.rotation,
		position: car.position,
		data: car_data
	})
}


// controls
document.addEventListener('keydown', (e:KeyboardEvent) => {
	switch (e.code) {
		case 'KeyW':
			car.rotation[0] += 0.02
			break;
		case 'KeyS':
			car.rotation[0] -= 0.02
			break;
		case 'KeyA':
			car.rotation[1] += 0.02
			break;
		case 'KeyD':
			car.rotation[1] -= 0.02
			break;
		case 'KeyU':
			car.rotation[2] += 0.02
			break;
		case 'KeyI':
			car.rotation[2] -= 0.02
			break;
		case 'KeyQ':
			car.position[1] -= 5
			break;
		case 'KeyE':
			car.position[1] += 5
			break;
		case 'KeyF':
			car_data.scale -= 5
			break;
		case 'KeyG':
			car_data.scale += 5
			break;
		default: return
	}
	console.log(car)
	console.log(car_data.scale)
});

const xI = document.querySelector('#x')
const yI = document.querySelector('#y')
const zI = document.querySelector('#z')

const loop = () => {
	ctx!.clearRect(0,0, width, height);

	// controls (delete)
	car.rotation[0] = parseInt(xI.value) /10
	car.rotation[1] = parseInt(yI.value) /10
	car.rotation[2] = parseInt(zI.value) /10

	// car.rotation[0] = 1.52;
	// car.rotation[1] = 152/100
	// car.rotation[2] = 152/100

	project_floor();
	project_car();

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
