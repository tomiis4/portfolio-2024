//     VARAIBLES     //


// DOM
const imageDOM = '<img src="./images/coin.png" class="background-image">';
const coinDOM = `
	<div class="coin-container">
		<img src="./images/coin.png" alt="coin">
		<p id="coins-text"> 529 </p>
	</div>
`;
const exitDOM = `
	<div class="exit-button" onClick="getHome()">
		<div id="x"></div>
		<div id="y"></div>
	</div>
`;

// Objects
const shopItems = {
	// player
	player: [
		{
			img: "./images/player.png",
			name: "Player1",
			price: 50,
		},
		{
			img: "./images/player.png",
			name: "Player2",
			price: 1,
		},
		{
			img: "./images/player.png",
			name: "Player3",
			price: 420,
		}
	],
	
	// block
	block: [
		{
			img: "./images/coin.png",
			name: "Block1",
			price: 50,
		},
		{
			img: "./images/coin.png",
			name: "Block2",
			price: 66,
		},
	],
	
	// music
	music: [
		{
			music: "",
			name: "Music1",
			price: 50,
		},
		{
			music: "",
			name: "Music2",
			price: 66,
		},
	]
};


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
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		
		<div class="shop-container">
			<h1 class="title"> Shop </h1>
			<div class="shop-wrapper">
				<div class="item-select">
					<div id="player" onClick="changeCards('player')"> Player </div>
					<div id="block" onClick="changeCards('block')"> Block </div>
					<div id="music" onClick="changeCards('music')"> Music </div>
				</div>
				<div class="card-container">
				</div>
				${exitDOM}
			</div>
		</div>
	`;
	
	changeCards('player');
}

// Settings
const getSettings = () => {

	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}

		<div class="settings-container" onLoad="">
			<h1 class="title"> Settings </h1>
			<div class="settings-wrapper">
				<div class="music">
					<h3> Music </h3>
					<div class="music-input">
						<input type="range" value="50" onInput='changeVolume(this.value, "music")'>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
					</div>
				</div>
				<hr>
				<div class="sound">
					<h3> Sound </h3>
					<div class="sound-input">
						<input type="range" value="50" onInput='changeVolume(this.value, "sound")'>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
					</div>
				</div>
				<hr>
				${exitDOM}
			</div>
		</div>
	`;

	changeVolume(20.5, 'm');
changeVolume(50.5, 's');
}


//     X     //


// Change style 
const changeStyle = ({element, backgroundColor, textColor}) => {
	element.style.background = backgroundColor;
	element.style.color = textColor;
}

// Change volume
const changeVolume = (volumeRange, type) => {
	const typeSplit = type.split('')[0];
	const rangeElem = document.querySelectorAll(`.show-range-${typeSplit}`);
	const volume = Math.round(volumeRange / 10)+1;
	
	// toggle on first half
	for (let i=0; i<volume; i++) {
		rangeElem[i].style.background = 'var(--green)';
	}

	// toggle off last half
	for (let j=volume; j<rangeElem.length; j++) {
		rangeElem[j].style.background = 'var(--medium-green)';
	}
}

// Change shop cards
const changeCards = (type) => {
	const cardContainer = document.querySelector('.card-container');
	const selectCard = document.querySelector(`#${type}`);
	const othersCard = document.querySelectorAll('.item-select div');
	let elements = '';

	shopItems[type].map((data) => (
		elements += `<div class="card">
			<img class="card-icon" src="${data.img}">
			<div class="card-info">
				<h2 class="card-title"> ${data.name} </h2>
				<div class="buy-card" onClick="buyCard(this.id)" id="${data.name}">
					<p> ${data.price} </p>
					<img src="./images/coin.png">
				</div>
			</div>
		</div>`
	));

	othersCard.forEach((elem) => {
		changeStyle({
			element: elem,
			backgroundColor: 'var(--dark-green)',
			textColor: 'var(--grey)'
		});
	})
	
	changeStyle({
		element: selectCard,
		backgroundColor: 'var(--black-green)',
		textColor: 'var(--green)'
	});
	cardContainer.innerHTML = elements;
}

//TODO
// Buy from shop
const buyCard = (type) => {
	console.log(type);
}


