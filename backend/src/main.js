const WebSocket = require('ws');
const SocketActions = require('./websocket');

const socketPort = 3000;
const websocket = new WebSocket.Server({ port: socketPort });

console.log(`Websocket Server started on ${socketPort}`);

websocket.on('connection', (connection) => {
  SocketActions.onConnect(connection);

  connection.on('message', (message) => {
    SocketActions.onMessage(websocket, connection, message);
  });

  connection.on('close', () => {
    SocketActions.onClose(websocket, connection);
  });
});