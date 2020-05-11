let messages = []

const sendMessageObject = (connection, method, payload) => {
  connection.send(JSON.stringify({ method, payload }));
};

const sendUpdateToAdmins = (websocket, method, payload) => {
  if (websocket.clients) {
    websocket.clients.forEach((client) => {
      if (client.admin) {
        sendMessageObject(client, method, payload);
      }
    });
  }
};

const checkAllUsersAlive = (websocket) => {
  const usersAlive = Array.from(websocket.clients).map((user) => user.userId);

  websocket.clients.forEach((client) => {
    if (client.selected_by) {
      client.selected_by = client.selected_by.filter((admin) => usersAlive.includes(admin))
    }
  })

  const now = new Date();
  messages = messages.filter((message) => !message.timeStamp < (now.setHours(now.getHours() - 1)))
}

const sendUserList = (websocket) => {
  checkAllUsersAlive(websocket)
  const userIds = []
  
  websocket.clients.forEach((client) => {
    if (client.userId) {
      userIds.push({
        userId: client.userId,
        userName: client.userName,
        selected_by: client.selected_by,
      });
    }
  });
  sendUpdateToAdmins(websocket, 'USERS', { users: userIds });
}

const onSubscribe = (websocket, connection, data) => {
  // Give connection needed Information
  connection.userName = data.userName;
  connection.userId = data.userId;
  connection.admin = data.admin;
  connection.selected_by = [];

  // Confirm Username
  sendMessageObject(connection, 'SUB', {
    user: {
      userName:  connection.userName,
      userId: connection.userId,
      messages: connection.admin ? messages : messages.filter((message) => message.users.includes(connection.userId)),
    },
  });

  // Send USer Update
  sendUserList(websocket);
}

const onUnsubscribe = (websocket, connection) => {
  // remove selected_by flag
  if (connection.admin) {
    const userId = connection.userId
    websocket.clients.forEach((client) => {
      if (client.selected_by) {
        client.selected_by = client.selected_by.filter((adminId) => adminId != userId);
      }
    })
  }

  // Send User Update
  sendUserList(websocket);
}

const onSend = (websocket, connection, data) => {

  messageObject = {
    text: data.text,
    userId: connection.userId,
    userName: connection.userName,
    users: [connection.userId, data.destination],
    timeStamp: data.timeStamp,
    admin: connection.admin,
  }

  messages.push(messageObject);

  // Inform all admins
  sendUpdateToAdmins(websocket, 'MESSAGE', messageObject);

  if (!connection.admin) {
    sendMessageObject(connection, 'MESSAGE', messageObject);
  }

  // send message to specific user
  if (data.destination != 'admin') {
    websocket.clients.forEach((client) => {
      if (!client.admin && client.userId == data.destination) {
        sendMessageObject(client, 'MESSAGE', messageObject);
      }
    });
  }

  sendUserList(websocket);
}

const onSelect = (websocket, connection, data) => {
  const userId = data.userId
  websocket.clients.forEach((client) => {
    if (client.userId === userId) {
      if (!client.selected_by.includes(connection.userId)) {
        client.selected_by.push(connection.userId)
      }
    } else {
      if (client.selected_by) {
        client.selected_by = client.selected_by.filter((adminId) => adminId != connection.userId);
      }
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