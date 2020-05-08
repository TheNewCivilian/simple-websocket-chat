import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import VueNativeSock from 'vue-native-websocket';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueChatScroll);
Vue.use(VueNativeSock, 'ws://localhost:8000', { format: 'json' });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
