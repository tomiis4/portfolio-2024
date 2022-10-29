const img = document.getElementById('img');
const cv = document.getElementById('canvas');

cv.width = img.width;
cv.height = img.height;
cv.getContext('2d').drawImage(img, 0, 0)

const getPixel = (x, y) => {
	const imgRGB = cv.getContext('2d').getImageData(x, y, 1,1).data;
	
	return imgRGB;
} 


const blurC = document.getElementById('remade');
const blurCTX = blurC.getContext('2d');

for (let y=0; y<200; y++) {
	for (let x=0; x<200; x++) {
		
		const sumR = getPixel(x-1, y+1)[0] +
			getPixel(x, y+1)[0] +
			getPixel(x+1, y+1)[0] +
			getPixel(x-1, y)[0] +
			getPixel(x, y)[0] +
			getPixel(x+1, y)[0] +
			getPixel(x-1, y-1)[0] +
			getPixel(x, y-1)[0] +
			getPixel(x+1, y-1)[0]
		const sumG = getPixel(x-1, y+1)[1] +
			getPixel(x, y+1)[1] +
			getPixel(x+1, y+1)[1] +
			getPixel(x-1, y)[1] +
			getPixel(x, y)[1] +
			getPixel(x+1, y)[1] +
			getPixel(x-1, y-1)[1] +
			getPixel(x, y-1)[1] +
			getPixel(x+1, y-1)[1]
		const sumB = getPixel(x-1, y+1)[2] +
			getPixel(x, y+1)[2] +
			getPixel(x+1, y+1)[2] +
			getPixel(x-1, y)[2] +
			getPixel(x, y)[2] +
			getPixel(x+1, y)[2] +
			getPixel(x-1, y-1)[2] +
			getPixel(x, y-1)[2] + 
			getPixel(x+1, y-1)[2]

		const grayScale = (sumR/9 + sumG/9 + sumB/9) / 3

		// blurCTX.fillStyle = `rgb(${sumR /9}, ${sumG /9}, ${sumB /9})`
		blurCTX.fillStyle = `rgb(${grayScale}, ${grayScale}, ${grayScale})`
		blurCTX.fillRect(x, y, 1, 1);
	}
}





















const getFilter = (x, y) => {
	const pi = 22 / 4;
	const e = 2.71828182846;
	const sigma = 5.5;

	const result = (((1) / (2*pi*(sigma*sigma))) *e) - ((x*x + y*y) / (2*(sigma*sigma))) 

	console.log(result)
}

// getFilter(30,30)
