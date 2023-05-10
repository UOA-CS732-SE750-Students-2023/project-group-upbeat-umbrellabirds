import express from "express";
import cors from "cors";
import { join } from "path";
import connectToDatabase from "./db/conn";

// Setup our routes.
import routes from "./routes";

import http from "http";
import { Server } from "socket.io";
import { getAllPlayers } from "./db/endpointFunctions/player";

// Setup Express
const app = express();
const port = process.env.PORT || 5000;

// Setup http and socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.listen(4000);

io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("joinRoom", ({ roomName, playerName }) => {
    console.log("Joining room " + roomName);
    socket.join(roomName);
    io.in(roomName).emit("playerJoined", playerName);
    console.log(io.sockets.adapter.rooms);
  });

  socket.on("disconnect", ({roomCode}) => {
    console.log("Client disconnected: " + roomCode);
  });

  socket.on("removePlayer", ({roomCode, playerID}) => {
    console.log("Removing player " + playerID + " from room " + roomCode);
    io.in(roomCode).emit("playerRemoved", playerID);
    socket.leave(roomCode);
  });

  socket.on("startGame", ({roomCode})=> {
    console.log("Game started");
    io.in(roomCode).emit("gameStarted", roomCode);
  });

  socket.on("newMessage", ({message, roomCode}) => {
    console.log("New message: " + message);
    io.in(roomCode).emit("getMessage", message);
  });

  socket.on("gameInfoChange", ({gameInfo, roomInfo}) => {
    console.log("Game info changed");
    // console.log(gameInfo)
    io.in(roomInfo).emit("setGameInfo", gameInfo);
  });

  socket.on("getRooms", ({roomInfo}) => {
    console.log("Getting rooms");
    io.in(roomInfo).emit("rooms", io.sockets.adapter.rooms);
    console.log(io.sockets.adapter.rooms)
  });

  socket.on("tester", ({tester, roomInfo}) => {
    console.log("tester", + tester)
    io.in(roomInfo).emit("tester");
    
  });
});

// Setup body-parser

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/", routes);

// Make the "public" folder available statically
app.use(express.static(join(__dirname, "../public")));

// Start the DB running. Then, once it's connected, start the server.
connectToDatabase().then(function () {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`App server listening on port ${port}! `));
});
