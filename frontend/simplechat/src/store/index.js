import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    userId: '',
    messages: [],
    users: [],
    selectedUser: '',
  },
  mutations: {
    SET_USERNAME(currentState, payload) {
      currentState.userName = payload;
    },
    SET_USERID(currentState, payload) {
      currentState.userId = payload;
    },
    ADD_MESSAGE(currentState, payload) {
      currentState.messages.push(payload);
    },
    // admin functions
    SET_USERS(currentState, payload) {
      currentState.users = payload;
    },
    SET_SELECTED_USER(currentState, payload) {
      currentState.selectedUser = payload;
    },
    SET_MESSAGE(currentState, payload) {
      currentState.messages = payload;
    },
  },
  actions: {
    setUsername(context, payload) {
      context.commit('SET_USERNAME', payload);
    },
    setUserId(context, payload) {
      context.commit('SET_USERID', payload);
    },
    addMessage(context, payload) {
      context.commit('ADD_MESSAGE', payload);
    },
    // admin functions
    setUsers(context, payload) {
      context.commit('SET_USERS', payload);
    },
    setSelectedUser(context, payload) {
      context.commit('SET_SELECTED_USER', payload);
    },
    setMessages(context, payload) {
      context.commit('SET_MESSAGE', payload);
    },
  },
  getters: {
    userName(currentState) {
      return currentState.userName;
    },
    messages(currentState) {
      return currentState.messages;
    },
    messagesForUser: (currentState) => (selectedUserId) => currentState.messages.filter(
      (message) => {
        console.log(selectedUserId);
        console.log(message);
        if (message.users.includes(selectedUserId) && message.users.includes(currentState.userId)) {
          return true;
        }
        if (message.users.includes(selectedUserId) && message.users.includes('admin')) {
          return true;
        }

        if (
          message.users.includes(selectedUserId)
          && message.userId !== selectedUserId
          && message.admin
        ) {
          return true;
        }
        return false;
      },
    ),
    userId(currentState) {
      return currentState.userId;
    },
    // admin functions
    users(currentState) {
      return currentState.users;
    },
    selectedUser(currentState) {
      return currentState.selectedUser;
    },
  },
});
