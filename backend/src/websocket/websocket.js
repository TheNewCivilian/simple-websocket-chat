/* eslint no-param-reassign: ["error", { "props": false }] */
const Errors = require('./errors');

const sendMessageObject = (connection, message) => {
  connection.send(JSON.stringify(message));
};

const broadcastUpdate = (websocket, data) => {
  if (websocket.clients) {
    websocket.clients.forEach((client) => {
      sendMessageObject(client, data);
    });
  }
};

const processReturn = (websocket, connection, returnObject) => {
  if (returnObject.broadcast) {
    broadcastUpdate(websocket, returnObject.message);
  } else {
    sendMessageObject(connection, returnObject.message);
  }
};

const parseMessage = (message) => {
  let dataIsNotObject = false;
  let data;
  try {
    data = JSON.parse(message);
  } catch (e) {
    dataIsNotObject = true;
  }

  if (dataIsNotObject) {
    if (typeof message === 'string') {
      return { method: message };
    }
    return { error: true };
  }

  const method = Object.keys(data)[0];
  return {
    method,
    data: data[method],
  };
};

const onConnect = (connection) => {
  sendMessageObject(connection, { error: false });
};

const onMessage = (websocket, connection, message) => {
  const receivedData = parseMessage(message);
  let userIds = [];

  if (receivedData.error) {
    sendMessageObject(connection, Errors.dataFormatError);
    return;
  }

  console.log(receivedData);

  switch (receivedData.method) {
    case 'SUB':
      if (!receivedData.data.name || !receivedData.data.userId) {
        sendMessageObject(connection, Errors.dataFormatError);
        return;
      }
      connection.userName = receivedData.data.name;
      connection.userId = receivedData.data.userId;
      userIds = []
      if (websocket.clients) {
        websocket.clients.forEach((client) => userIds.push({userId: client.userId, username: client.userName }));
      }
      processReturn(
        websocket,
        connection,
        { broadcast: true, message: { users: userIds } },
      );
      sendMessageObject(connection, { user: connection.userName });
      break;
    case 'UNSUB':
      userIds = []
      if (websocket.clients) {
        websocket.clients.forEach((client) => userIds.push(client.userId));
      }
      processReturn(websocket, connection, { broadcast: true, message: { users: userIds }});
      break;
    case 'SEND':
      if (!receivedData.data.text) {
        sendMessageObject(connection, Errors.dataFormatError);
        return;
      }
      if (!receivedData.data.userId) {
        processReturn(websocket, connection, { broadcast: true, message: { text: receivedData.data.text, userId: connection.userId, userName: connection.userName }});
      } else {
        websocket.clients.forEach((client) => {
          if (client.userId == receivedData.data.userId) {
            sendMessageObject(client, { text: receivedData.data.text, userId: connection.userId, userName: connection.userName });
          }
        });
        processReturn(websocket, connection, { broadcast: false, message: { text: receivedData.data.text, userId: connection.userId, userName: connection.userName }});
      }
      break;
    default:
      processReturn(websocket, connection, Errors.methodNotFound);
      break;
  }
};

const onClose = (connection) => {
  const userIds = []
  if (websocket.clients) {
    websocket.clients.forEach((client) => userIds.push(client.userId));
  }
  processReturn(websocket, connection, { broadcast: true, message: { users: userIds }});
};

module.exports = {
  onConnect,
  onMessage,
  onClose,
};
