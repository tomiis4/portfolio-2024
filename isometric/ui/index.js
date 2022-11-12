//     VARAIBLES     //


// DOM
const imageDOM = '<img src="./images/coin.png" class="background-image">';
const coinDOM = `
	<div class="coin-container">
		<img src="./images/coin.png" alt="coin">
		<p id="coins-text"> 529 </p>
	</div>
`
// Objects
const shopItems = {
	// player
	player: [
		{
			img: "./img",
			name: "Player1",
			price: 50,
		},
		{
			img: "./img2",
			name: "Player2",
			price: 66,
		},
	],
	
	// block
	block: [
		{
			img: "./img",
			name: "Block1",
			price: 50,
		},
		{
			img: "./img2",
			name: "Block2",
			price: 66,
		},
	],
	
	// music
	music: [
		{
			music: "./img",
			name: "Music1",
			price: 50,
		},
		{
			music: "./img2",
			name: "Music2",
			price: 66,
		},
	],
};

//     UILTS     //

// reset screen
const resetScreen = () => {
	document.body.innerHTML = imageDOM;
}


//     FUNCTIONS     //


// Home
const getHome = () => {
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		<div class="menu-container">
			<h1 class="title"> Toxic <br> Collector </h1>
			<div class="button-container">
				<input type="button" value="Play" onClick="getHome()">
				<input type="button" value="Shop" onClick="getShop()">
				<input type="button" value="Settings" onClick="getSettings()">
			</div>
		</div>
	`;
}

// Shop
const getShop = () => {
	console.log('Shop');
}

// Settings
const getSettings = () => {
	console.log('Settings');
}
