const sendMessageObject = (connection, message) => {
  connection.send(JSON.stringify(message));
};

const sendUpdateToAdmins = (websocket, data) => {
  if (websocket.clients) {
    websocket.clients.forEach((client) => {
      if (client.admin) {
        sendMessageObject(client, data);
      }
    });
  }
};

const sendUserList = (websocket) => {
  // TODO: Check if every admin is still alive
  const userIds = []
  if (websocket.clients) {
    websocket.clients.forEach((client) => userIds.push({userId: client.userId, username: client.userName, selected_by: client.selected_by }));
  }
  sendUpdateToAdmins(websocket, { users: userIds });
}

const onSubscribe = (websocket, connection, data) => {
  // Give connection needed Information
  connection.userName = data.name;
  connection.userId = data.userId;
  connection.admin = data.admin;
  connection.selected_by = [];

  // Send USer Update
  sendUserList(websocket);

  // Confirm Username
  sendMessageObject(connection, { user: connection.userName });
}

const onUnsubscribe = (websocket, connection) => {
  // remove selected_by flag
  if (connection.admin) {
    const userId = connection.userId
    websocket.clients.forEach((client) => {
      client.selected_by = client.selected_by.filter((adminId) => adminId != userId);
    })
  }

  // Send User Update
  sendUserList(websocket);
}

const onSend = (websocket, connection, data) => {
  // Inform all admins
  sendUpdateToAdmins(websocket,
    {
      text: data.text,
      userId: connection.userId,
      userName: connection.userName,
    },
  );

  // send message to specific user
  if (data.userId) {
    websocket.clients.forEach((client) => {
      if (client.userId == data.userId) {
        sendMessageObject(client,
          {
            text: data.text,
            userId: connection.userId,
            userName: connection.userName
          },
        );
      }
    });
  }
}

const onSelect = (websocket, connection, data) => {
  const userId = data.userId
  websocket.clients.forEach((client) => {
    if (client.userId = userId) {
      client.selected_by.push(connection.userId)
    } else {
      client.selected_by = client.selected_by.filter((adminId) => adminId != userId);
    }
  })

 // Inform all admins
 sendUserList(websocket);
}

module.exports = {
  onSubscribe,
  onUnsubscribe,
  onSend,
  onSelect,
  sendUpdateToAdmins,
  sendMessageObject,
  sendUserList,
};