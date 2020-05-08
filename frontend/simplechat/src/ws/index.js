const sendCommand = (socket, method, data = null) => {
  if (data === null) {
    socket.send(method);
  } else {
    const message = {};
    message[method] = data;
    socket.sendObj(message);
  }
};

export default {
  sendCommand,
};
