const randNum = (max: number): number => { return Math.floor( Math.random() * max ) }

function getArray(max: number, len: number): number[] {
    let array: number[] = [];
    
    for (let i=0; i < len; i++) {
        array.push(randNum(max));
    }
    
    return array;
}

export default getArray;
