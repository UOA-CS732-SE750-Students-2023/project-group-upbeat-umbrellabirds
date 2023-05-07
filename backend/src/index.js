import express from "express";
import cors from "cors";
import { join } from "path";
import connectToDatabase from "./db/conn";

// Setup our routes.
import routes from "./routes";

import http from 'http';
import { Server } from 'socket.io';

// Setup Express
const app = express();
const port = process.env.PORT || 5000;

// Setup http and socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origin: "*"
  }
});

io.listen(4000);

io.on('connection', (socket) => {
  console.log("Client connected");
  socket.on('joinRoom', ({roomName, playerName}) => {
    console.log("Joining room " + roomName);
    socket.join(roomName);
    io.in(roomName).emit('playerJoined', playerName);
  });

});

// Setup body-parser

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use("/", routes);

// Make the "public" folder available statically
app.use(express.static(join(__dirname, "../public")));

// Start the DB running. Then, once it's connected, start the server.
connectToDatabase().then(function () {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`App server listening on port ${port}! `));
});
