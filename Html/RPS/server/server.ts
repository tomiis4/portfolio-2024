import { createServer  } from "http";
import { Server  } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	},
});



io.on("connection", (socket:any) => {
	console.log('You connected to the websocket');
});

httpServer.listen(8080);
