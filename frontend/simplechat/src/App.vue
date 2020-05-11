<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import WS from './ws';

export default {
  created() {
    this.$options.sockets.onmessage = this.onMessage;

    if (!this.$route.meta.admin) {
      const oldUserId = localStorage.getItem('sc_userId');
      if (oldUserId) {
        this.$store.dispatch('setUserId', oldUserId);
      } else {
        const newUserId = uuidv4();
        this.$store.dispatch('setUserId', newUserId);
        localStorage.setItem('sc_userId', newUserId);
      }
    } else {
      this.$store.dispatch('setUserId', uuidv4());
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    userName() {
      return this.$store.getters.userName;
    },
  },
  methods: {
    onMessage(recievedMessage) {
      WS.onResponse(
        this.$store,
        recievedMessage,
        this.$socket,
        this.userName,
        this.userId,
        this.$route.meta.admin,
      );
    },
  },
};
</script>

<style lang="scss">
  @import "@/assets/defaults.scss";

  html, body, #app {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Jost', sans-serif;
    background-color: $c_grey--light;
    color: $c_primary;
    position: relative;
  }

  .logo {
    &__container {
      text-align: center;
      padding: 50px;
    }

    &__image {
      height: 100px;
    }
  }
</style>
