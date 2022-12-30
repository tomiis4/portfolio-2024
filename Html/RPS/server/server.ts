import { createServer  } from "http";
import { Server  } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: "http://localhost:3000"
	}
});

let players:any = [];
let playersID: string[] = [];

io.on("connection", (socket: any) => {
	// when someone join
	console.log("You connected to the websocket");
	playersID.push(socket.id);
	
	// send players
	socket.emit("received players", players);
	console.log('S')
	
	// if get players data from server
	socket.on("send player", (newPlayer: any) => {
		const indexPlayer = playersID.indexOf(socket.id);
		let tempPlayers:any[] = [];
		
		// update all players depeding on who are you
		players[indexPlayer] = newPlayer;
		
		players.forEach((obj:any, index:number) => {
			if (index != indexPlayer) {
				tempPlayers.push(obj);
			}
		});
		
		// update variable and send it;
		io.emit("received players", tempPlayers);
	});
});

httpServer.listen(8080);
