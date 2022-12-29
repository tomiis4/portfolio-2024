type GameResult = 'enemy' | 'player' | 'draw';

type PlayerType = 'rock' | 'paper' | 'scissors';

type Child = {
	type: PlayerType,
	
	position: number[],
	velocity: number[],
	
	width: number,
	height: number
}

type Player = {
	type: PlayerType,
	
	position: number[],
	velocity: number[],
	
	speed: number,
	isMoving: boolean[],
	
	width: number,
	height: number,
	
	child: Child[]
}

export type {PlayerType, Child, Player, GameResult};
