<template>
  <div id="app">
    <div class="logo__container">
      <img class="logo__image" src="https://vignette.wikia.nocookie.net/logopedia/images/e/e7/SJ_(rail_operator)_logo.svg/revision/latest?cb=20140104224553"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import messageModel from '@/models/message';

export default {
  created() {
    this.$options.sockets.onmessage = this.onMessage;
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    onMessage(message) {
      if (typeof message.data !== 'string') {
        return;
      }

      const data = JSON.parse(message.data);
      console.log(data);

      if (data.text) {
        this.$store.dispatch('addMessage', messageModel(
          data.text,
          data.userId === this.userId,
          data.username,
          data.userId,
        ));
      } else if (data.user) {
        this.$store.dispatch('setUsername', data.user);
      }
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
      margin: 50px;
    }

    &__image {
      height: 100px;
    }
  }
</style>
