import Center from "../center/Center";
import Distance from "../distance/Distance";
import { FacesArray, SortFacesArg } from "../Types";

const SortFaces = (e: SortFacesArg): number[][] => {
	const camera_position = e.camera.position;

	let result: FacesArray[] = [];
	let sorted_faces: number[][] = [];

	// get distances
	for (let i=0; i < e.faces.length; i++) {
		const face_center = Center({
			vertices: e.vertices,
			faces: e.faces,
			face_index: i
		});

		result.push({
			index: i,
			distance: Distance(face_center, camera_position)
		});
	}

	// sort (big -> small)
	result.sort((a, b) => {
		return b.distance - a.distance
	});

	for (let i=0; i < result.length; i++) {
		const index = result[i].index;
		sorted_faces.push(e.faces[index]);
	}

	return sorted_faces;
}

export default SortFaces;
