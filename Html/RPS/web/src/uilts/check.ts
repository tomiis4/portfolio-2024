// check if is number negative
const isNegative = (n: number):boolean => {
	if (n.toString().indexOf('-') == -1) {
		return false;
	}
	return true;
}

export {isNegative};
