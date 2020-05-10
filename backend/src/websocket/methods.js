const messages = []

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

const checkAllUsersAlive = (websocket) => {
  const usersAlive = Array.from(websocket.clients).map((user) => user.userId);

  websocket.clients.forEach((client) => {
    client.selected_by = client.selected_by.filter((admin) => usersAlive.includes(admin))
  })

  // TODO: check all stored messages and delete old
  // messages.filter((message) => message.timeStamp < )
}

const sendUserList = (websocket) => {
  checkAllUsersAlive(websocket)
  const userIds = []
  
  websocket.clients.forEach((client) => {
    if (client.userId) {
      userIds.push({userId: client.userId, username: client.userName, selected_by: client.selected_by })
      console.log({userId: client.userId, username: client.userName, selected_by: client.selected_by })
    } else {
      console.log(client.userId)
    }
  });
  console.log(userIds)
  sendUpdateToAdmins(websocket, { users: userIds });
}

const onSubscribe = (websocket, connection, data) => {
  // Give connection needed Information
  connection.userName = data.name;
  connection.userId = data.userId;
  connection.admin = data.admin;
  connection.selected_by = [];

  // Confirm Username
  sendMessageObject(connection, {
    user: {
      username:  connection.userName,
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

  messages.push({
    text: data.text,
    userId: connection.userId,
    userName: connection.userName,
    users: [connection.userId, data.destination ? data.destination : "admins"],
  });

  // Inform all admins
  sendUpdateToAdmins(websocket,
    {
      text: data.text,
      userId: connection.userId,
      userName: connection.userName,
      users: [connection.userId, data.destination ? data.destination : "admins"],
    },
  );

  // send message to specific user
  if (data.destination) {
    websocket.clients.forEach((client) => {
      if (!client.admin && client.userId == data.destination) {
        sendMessageObject(client,
          {
            text: data.text,
            userId: connection.userId,
            userName: connection.userName,
            users: [connection.userId, data.destination],
          },
        );
      }
    });
  } else {
    sendMessageObject(connection,
      {
        text: data.text,
        userId: connection.userId,
        userName: connection.userName,
        users: [connection.userId, "admins"],
      },
    );
  }
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