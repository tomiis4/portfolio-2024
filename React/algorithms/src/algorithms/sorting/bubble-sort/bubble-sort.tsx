import {useEffect, useState} from 'react';
import delay from '../../uilts/delay';
import getArray from '../../uilts/getArray';
import selectInput from '../../uilts/selectInput';

import '../style/sortings.scss';

function BubbleSort() {
	// buttons & settings
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [arrayLen, setArrLen] = useState<number>(10);
	const [sortSpeed, setSortSpeed] = useState<number>(200);
	
	// sorting arrays
	const [items, setItems] = useState<number[]>([]);
	const [array, setArray] = useState<number[]>([]);
	
	useEffect(() => { generateArray(); document.title = 'Bubble Sort' }, []);
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
		let isSorted: boolean = false;
		
		while (isSorted == false) {
			setIsDisabled(true);
			isSorted = true;
			for (let i=0; i < array.length; i++) {
				sortSpeed != 0 ? await delay(sortSpeed) : sortArray
				
				if (array[i] > array[i+1]) {
					const left = array[i];
					const right = array[i+1];
					
					array[i] = right;
					array[i+1] = left;
					
					isSorted = false;
				}
				setItems([...array]);
			}
		}
		setIsDisabled(false)
	}
	
	return (
		<div className='array-sort'>
			<h1> Bubble Sort {isDisabled ? '(Sorting...)' : ''} </h1>
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

export default BubbleSort;
