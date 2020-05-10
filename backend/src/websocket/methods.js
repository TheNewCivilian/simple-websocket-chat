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
  sendMessageObject(connection, { user: {username:  connection.userName, userId: connection.userId} });

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
  // Inform all admins
  sendUpdateToAdmins(websocket,
    {
      text: data.text,
      userId: connection.userId,
      userName: connection.userName,
      users: [connection.userId, data.destination ? data.destination : undefined],
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
        users: [connection.userId],
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