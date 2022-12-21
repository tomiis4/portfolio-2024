import {useState} from "react";
import delay from "../../uilts/delay";
import getArray from "../../uilts/getArray";

import '../style/sortings.scss';

function BubbleSort() {
	const [items, setItems] = useState<number[]>([]);
	let array = getArray(100, 50);
	
	
	const sortArray = async () => {
		let check: boolean[] = [];
		
		loop1: for (let i=0; i < array.length; i++) {
			let index = 0;
			
			for (let j=0; j < array.length; j++) {
				await delay(1000);
				
				if (array[index+1] && array[index] > array[index+1]) {
					const left = array[index];
					const right = array[index+1];
					
					array[index] = right;
					array[index+1] = left;
					
					check.push(false);
					setItems(array);
				} else {
					check.push(true);
				}
				index++;
			}
			if (!check.includes(false)) {break loop1} else {check = []}
		}
		console.log(array)
	}
	
	return (
		<>
			<input type="button" value="Generate Array" />
			<input type="button" value="Sort Array" onClick={sortArray} />
			
			<div className="container">
				{
					items.map((value, index) => {
						return (
							<div className="block" style={{height: `${value}%`}} key={index}> {value} </div>
						)
					})
				}
			</div>
		</>
	)
}

export default BubbleSort;
