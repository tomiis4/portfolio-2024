module.export = (xPosition, yPosition, length) => {
	return (length * (yPosition - 1)) + (xPosition - 1);	
}
