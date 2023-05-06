const express = require('express');
const cors = require('cors');
const {createServer} = require("http");
const {Server} = require("socket.io");


// Setup Express
const app = express();
const port = 9000;

// Setup body-parser
app.use(cors());
app.use(express.json());


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

let clientNo = 0;

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
  });

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

io.on('connection', (socket) => {
    console.log('a user connected');
    clientNo++;
    socket.emit('clientNo', clientNo);
});

