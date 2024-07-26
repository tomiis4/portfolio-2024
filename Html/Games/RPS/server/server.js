"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});
var players = [];
var playersID = [];
io.on("connection", function (socket) {
    // when someone join
    console.log("You connected to the websocket");
    playersID.push(socket.id);
    // send players
    socket.emit("received players", players);
    console.log('S');
    // if get players data from server
    socket.on("send player", function (newPlayer) {
        var indexPlayer = playersID.indexOf(socket.id);
        var tempPlayers = [];
        // update all players depeding on who are you
        players[indexPlayer] = newPlayer;
        players.forEach(function (obj, index) {
            if (index != indexPlayer) {
                tempPlayers.push(obj);
            }
        });
        // update variable and send it;
        io.emit("received players", tempPlayers);
    });
});
httpServer.listen(8080);
