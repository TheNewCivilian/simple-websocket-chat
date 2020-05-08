const express = require('express');
const WebSocket = require('ws');
const SocketActions = require('./websocket/websocket');

const socketPort = 8000;
const websocket = new WebSocket.Server({ port: socketPort });

console.log(`Websocket Server started on ${socketPort}`);

websocket.on('connection', (connection) => {
  SocketActions.onConnect(connection);

  connection.on('message', (message) => {
    SocketActions.onMessage(websocket, connection, message);
  });

  connection.on('close', () => {
    SocketActions.onClose(connection);
  });
});



const app = express();
const webPort = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(webPort, () => console.log(`Example app listening at http://localhost:${webPort}`))