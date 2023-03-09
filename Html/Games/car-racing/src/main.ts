import './scss/style.scss'

import Parser from './utils/parser/Parser';
import Texture from './utils/texture/Texture';
import Rotate from './utils/rotate/Rotate';

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
	color?: string
}

// type Car = {
// 	rotation: V3,
// 	position: V2,
// 	scale: number,
// 	color: 'red' | 'green' | 'blue'
// }

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
	texture: string[]
}

//data
let camera = [0, 0, -5];
let focalLength = 15;

// models
const parsed_floor = await Parser('./src/objects/car.obj');
let floor_data: ModelData = {
	vertices: parsed_floor.vertices,
	faces: parsed_floor.faces,
	scale: 150.0,
	texture: Texture({
		faces: parsed_floor.faces,
		// baseColor: '#FFFFFF',
		// isRandom: true,
		color: 'green'
	})
}

console.log(floor_data)

// let players: Car[] = []; // [0] = local player
// let trees: Tree[] = [];
let floor: Floor = {
	rotation: [0,0,0],  // 0=front, 1=clock from top, 2=clock
	position: [width/2, height/2]
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
			color: e.data.texture[i]
		})
	}
}

const DrawFace = (e: Face) => {
	ctx!.beginPath();

	ctx!.lineWidth = 2;
	ctx!.strokeStyle = "#CCCCCC";
	ctx!.globalAlpha = 0.6;

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
	ctx!.stroke();
}


// -- APPEND FUNCTIONS --
const append_floor = () => {
	DrawModel({
		rotation: floor.rotation,
		position: floor.position,
		data: floor_data,
	})
}

// const append_car = () => {
// 	players.push({
// 		rotation: [0,0,0],
// 		position: [0,0,0],
// 		scale: 5,
// 		color: 'green'
// 	})
// }

// append_car();

// const move_car = (side: 'x'|'z') => {
// 	players[0]
// }

// controls
document.addEventListener('keydown', (e:KeyboardEvent) => {
	switch (e.code) {
		// case 'KeyQ':
		// 	focalLength += 3
		// 	break;
		// case 'KeyE':
		// 	focalLength -= 3
		// 	break;
		// case 'KeyW':
		// 	camera[0] += 1;
		// 	break;
		// case 'KeyS':
		// 	camera[0] -= 1;
		// 	break;
		// case 'KeyA':
		// 	camera[1] += 1;
		// 	break;
		// case 'KeyD':
		// 	camera[1] -= 1;
		// case 'KeyX':
		// 	camera[2] += 1;
		// 	break;
		// case 'KeyC':
		// 	camera[2] -= 1;
		// 	break;
		case 'KeyW':
			floor.rotation[0] += 0.02
			break;
		case 'KeyS':
			floor.rotation[0] -= 0.02
			break;
		case 'KeyA':
			floor.rotation[1] += 0.02
			break;
		case 'KeyD':
			floor.rotation[1] -= 0.02
			break;
		case 'KeyU':
			floor.rotation[2] += 0.02
			break;
		case 'KeyI':
			floor.rotation[2] -= 0.02
			break;
		case 'KeyQ':
			floor.position[1] -= 5
			break;
		case 'KeyE':
			floor.position[1] += 5
			break;
		case 'KeyX':
			floor.position[0] -= 5
			break;
		case 'KeyC':
			floor.position[0] += 5
			break;
		case 'KeyF':
			floor_data.scale -= 5
			break;
		case 'KeyG':
			floor_data.scale += 5
			break;
		default: return
	}
	console.log(floor)
	console.log(floor_data.scale)
});


const loop = () => {
	ctx!.clearRect(0,0, width, height);

	append_floor();

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
