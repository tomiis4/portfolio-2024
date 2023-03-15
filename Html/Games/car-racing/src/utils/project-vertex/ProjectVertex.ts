import { V2, V3, Camera } from "../Types";

const ProjectVeretex = ([x,y,z]: V3, camera: Camera): V2 => {
	const focal_length = camera.focal_length;
	const [camX, camY, camZ] = camera.position;

	const ratio = focal_length / (focal_length + z + camZ);

	return [
		x * ratio + camX, 
		y * ratio + camY
	];
}

export default ProjectVeretex;
