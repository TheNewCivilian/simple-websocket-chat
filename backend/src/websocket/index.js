/* eslint no-param-reassign: ["error", { "props": false }] */
const Errors = require('./errors');
const {
  onSubscribe,
  onUnsubscribe,
  onSend,
  sendMessageObject,
  onSelect,
  sendUserList,
} = require('./methods');

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
  sendMessageObject(connection, 'CONNECT', { error: false });
};

const onMessage = (websocket, connection, message) => {
  const receivedData = parseMessage(message);

  if (receivedData.error) {
    sendMessageObject(connection, 'ERROR', Errors.dataFormatError);
    return;
  }

  console.log(receivedData);

  switch (receivedData.method) {
    case 'SUB':
      if (!receivedData.data.userName || !receivedData.data.userId || typeof receivedData.data.admin === 'undefined') {
        sendMessageObject(connection, 'ERROR', Errors.dataFormatError);
        return;
      }
      onSubscribe(websocket, connection, receivedData.data)
      break;
    case 'UNSUB':
      onUnsubscribe(websocket, connection)
      break;
    case 'MESSAGE':
      if (!receivedData.data.text || !receivedData.data.timeStamp || !receivedData.data.destination) {
        sendMessageObject(connection, 'ERROR', Errors.dataFormatError);
        return;
      }
      onSend(websocket, connection, receivedData.data)
      break;
    case 'SELECT':
      if (connection.admin) {
        sendMessageObject(connection, 'ERROR', Errors.methodNotAllowed);
      }
      if (!receivedData.data.userId) {
        sendMessageObject(connection, 'ERROR', Errors.dataFormatError);
        return;
      }
      onSelect(websocket, connection, receivedData.data)
      break;
    default:
      sendMessageObject(connection, 'ERROR', Errors.methodNotFound);
      break;
  }
};

const onClose = (websocket) => {
  sendUserList(websocket);
};

module.exports = {
  onConnect,
  onMessage,
  onClose,
};
