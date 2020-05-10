import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    userId: '',
    messages: [],
    users: [],
    selectedUser: '',
  },
  mutations: {
    SET_USERNAME(currentState, payload) {
      currentState.username = payload;
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
    username(currentState) {
      return currentState.username;
    },
    messages(currentState) {
      return currentState.messages;
    },
    messagesForUser: (currentState) => (userId) => currentState.messages.filter(
      (message) => message.users.includes(userId),
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
