import Center from "./center/Center";
import Distance from "./distance/Distance";
import { FacesArray, SortFacesArg } from "../Types";

const SortFaces = (e: SortFacesArg): number[][] => {
	const camera_position = e.camera.position;
	const faces_len = e.faces.length;

	let distances: FacesArray[] = new Array(faces_len);
	let sorted_faces: number[][] = [];

	// get distances
	for (let i=0; i < faces_len; i++) {
		const face_center = Center({
			vertices: e.vertices,
			faces: e.faces,
			face_index: i
		});

		distances[i] = {
			index: i,
			distance: Distance(face_center, camera_position)
		};
	}

	// sort
	distances.sort((a, b) => {
		return b.distance - a.distance;
	});

	for (let i=0; i < faces_len; i++) {
		const index = distances[i].index;
		sorted_faces.push(e.faces[index]);
	}

	return sorted_faces;
}

export default SortFaces;
