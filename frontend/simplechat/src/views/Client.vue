<template>
  <div class="client">
    <Login  v-if="logedIn == ''"/>
    <ChatWindow v-if="logedIn != ''" client />
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import ChatWindow from '@/components/ChatWindow.vue';


export default {
  name: 'Client',
  components: {
    Login,
    ChatWindow,
  },
  computed: {
    logedIn() {
      return this.$store.getters.username;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";

  .client {
    width: 100%;
  }
</style>
