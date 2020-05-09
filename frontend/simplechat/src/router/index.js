import Vue from 'vue';
import VueRouter from 'vue-router';
import Client from '../views/Client.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client,
    meta: {
      admin: false,
    },
  },
  {
    path: '/admin',
    name: 'Controller',
    component: Client,
    meta: {
      admin: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
