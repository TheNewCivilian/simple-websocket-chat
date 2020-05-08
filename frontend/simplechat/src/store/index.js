import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: '',
    userId: '',
    messages: [],
  },
  mutations: {
    SET_USERNAME(currentState, payload) {
      currentState.username = payload;
    },
    ADD_MESSAGE(currentState, payload) {
      currentState.messages.push(payload);
    },
  },
  actions: {
    setUsername(context, payload) {
      context.commit('SET_USERNAME', payload);
    },
    addMessage(context, payload) {
      context.commit('ADD_MESSAGE', payload);
    },
  },
  getters: {
    username(currentState) {
      return currentState.username;
    },
    messages(currentState) {
      return currentState.messages;
    },
  },
});
