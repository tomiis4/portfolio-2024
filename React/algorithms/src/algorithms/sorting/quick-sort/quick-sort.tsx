import {useEffect, useState} from 'react';
import delay from '../../uilts/delay';
import getArray from '../../uilts/getArray';
import selectInput from '../../uilts/selectInput';

import '../style/sortings.scss';

function QuickSort() {
	// buttons & settings
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [arrayLen, setArrLen] = useState<number>(10);
	const [sortSpeed, setSortSpeed] = useState<number>(200);
	
	// sorting arrays
	const [items, setItems] = useState<number[]>([]);
	const [array, setArray] = useState<number[]>([]);
	
	useEffect(() => { generateArray(); document.title = 'Quick Sort' }, []);
	useEffect(() => {}, [items]);
	useEffect(() => {}, [array]);
	useEffect(() => {}, [arrayLen]);
	useEffect(() => {}, [sortSpeed]);
	
	const generateArray = (len?: number) => {
		const mainLen = len ? len : arrayLen
		const arr = getArray(100, mainLen)
		console.log(len)
		setArray([...arr]);
		setItems([...arr]);
	}
	
	const handleLength = (e: any) => {
		const val = parseInt(e.target.value.replace(/[a-z]/g, ''));
		
		setArrLen(val);
		
		if (!isDisabled) {
			generateArray(val);
		}
	}
	const handleSpeed = (e: any) => {
		const val = parseInt(e.target.value.replace(/[a-z]/g, ''));
		setSortSpeed(val);
	} 
	
	const sortArray = async () => {
		quickSort(array, 0, array.length-1);
	}
	
	const quickSort = async (arr: any[], leftNum:number, rightNum:number) => {
		let pivot = arr[leftNum];
		let left = leftNum, right = rightNum;
		
		if (leftNum >= rightNum) return;
		
		while (left < right) {
			await delay(sortSpeed);
			
			// make right less while pivot is smaller than right
			while (arr[right] > pivot && left < right) {
				right--;
			}
			
			// reverse of the ^
			while (arr[left] <= pivot && left < right) {
				left++;
			}
			
			if (left < right) {
				const leftSwap = arr[left];
				const rightSwap = arr[right];
				
				arr[left] = rightSwap;
				arr[right] = leftSwap;
			}
		}
		
		// change pivot with right
		arr[leftNum] = arr[right];
		arr[right] = pivot;
		
		quickSort(arr, leftNum, right-1);
		quickSort(arr, left+1, rightNum);
		
		setItems([...arr]);
	}
	
	return (
		<div className='array-sort'>
			<h1> Quick Sort {isDisabled ? '(Sorting...)' : ''} </h1>
			<div className='settings'>
				<input type='button' value='Generate Array' onClick={() => generateArray(undefined)} disabled={isDisabled} />
				<input type='button' value='Sort Array' onClick={sortArray} disabled={isDisabled} />
				
				<label>
					Array length:
						<input type='text'
							value={arrayLen}
							onFocus={selectInput}
							onChange={e => parseInt(e.target.value) >=2 && parseInt(e.target.value) <= 200 ? handleLength(e) : e}
						/>
					<input type='range' min='2' max='200' value={arrayLen} onChange={handleLength} /> 
				</label>
				<label>
					Sorting speed:  
						<input type='text'
							value={ sortSpeed > 1000 ? `${(sortSpeed/1000).toFixed(1)}s` : `${sortSpeed}ms` } 
							onFocus={selectInput}
							onChange={e => parseInt(e.target.value) >=0 && parseInt(e.target.value) <= 2000 ? handleSpeed(e) : e}
						/>
					<input type='range' min='0' max='2000' value={sortSpeed} onChange={handleSpeed} />
				</label>
			</div>
			
			<div className='container'>
				{
					items.map((value, index) => {
						return (
							<div 
								className='block' 
								style={{
									height: `${value}%`, 
								}}
								key={index}>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default QuickSort;
