import Vue from 'vue';
import VueRouter from 'vue-router';
import Controller from '../views/Controller.vue';
import Client from '../views/Client.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client,
  },
  {
    path: '/admin',
    name: 'Controller',
    component: Controller,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
