import sendNotification from '@/helpers/notification';

const chatIcon = require('../assets/simple_chat.svg');

const sendCommand = (socket, method, data = null) => {
  if (data === null) {
    socket.send(method);
  } else {
    const message = {};
    message[method] = data;
    socket.sendObj(message);
  }
};

const sendSubscribe = (socket, userId, userName, admin) => {
  sendCommand(
    socket,
    'SUB',
    {
      userName,
      userId,
      admin,
    },
  );
};

const sendSelect = (socket, userId) => {
  sendCommand(
    socket,
    'SELECT',
    {
      userId,
    },
  );
};

const sendMessage = (socket, text, destination = undefined) => {
  sendCommand(
    socket,
    'MESSAGE',
    {
      text,
      destination,
      timeStamp: new Date().getTime(),
    },
  );
};

const onResponse = (store, response, socket, userName, userId, admin) => {
  if (typeof response.data !== 'string') {
    console.error('Response could not be passed!');
    return;
  }
  const data = JSON.parse(response.data);
  console.log(data);
  const { method, payload } = data;

  switch (method) {
    case 'SUB':
      store.dispatch('setUsername', payload.user.userName);
      if (payload.user.messages) {
        store.dispatch('setMessages', payload.user.messages.map((message) => ({
          text: message.text,
          self: message.userId === userId,
          userName: message.userName,
          userId: message.userId,
          users: message.users,
          admin: message.admin,
        })));
      }
      break;
    case 'MESSAGE': {
      const ownMessage = payload.userId === userId;
      store.dispatch('addMessage', {
        text: payload.text,
        self: ownMessage,
        userName: payload.userName,
        userId: payload.userId,
        users: payload.users,
        admin: payload.admin,
      });
      if (!ownMessage) {
        sendNotification(`New Message from ${payload.userName}`, payload.text, chatIcon);
      }
      break;
    }
    case 'USERS': {
      store.dispatch('setUsers', payload.users);
      const selectedUser = payload.users.find(
        (user) => user.selected_by.includes(userId),
      );
      if (selectedUser) {
        store.dispatch('setSelectedUser', selectedUser.userId);
      }
      break;
    }
    case 'CONNECT':
      if (userName) {
        sendCommand(
          socket,
          'SUB',
          {
            userName,
            userId,
            admin,
          },
        );
      }
      break;
    default:
      console.error('Unknown message received!');
  }
};

export default {
  onResponse,
  sendSubscribe,
  sendMessage,
  sendSelect,
};
