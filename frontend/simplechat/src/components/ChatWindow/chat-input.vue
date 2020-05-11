<template>
  <form @submit="sendMessage" class="chat-input">
    <input
      class="chat-input__message"
      :placeholder="`You are chatting as ${userName}`"
      v-model="message"
    />
    <button
      class="chat-input__send"
    >
      Send
    </button>
  </form>
</template>

<script>
import WS from '@/ws';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    userName() {
      return this.$store.getters.userName;
    },
    selectedUser() {
      return this.$store.getters.selectedUser;
    },
  },
  methods: {
    sendMessage(event) {
      event.preventDefault();
      WS.sendMessage(
        this.$socket,
        this.message,
        this.$route.meta.admin ? this.selectedUser : 'admin',
      );
      this.message = '';
    },
  },
};
</script>

<style lang="scss" scoped>
 @import "@/assets/defaults.scss";

  .chat-input {
    margin: 10px 0;
    @extend .row;

    &__message {
      @extend .input;
      flex-grow: 1;
    }

    &__send {
      @extend .button;

      background-color: $c_accent;
      color: $c_white;
      margin-left: 10px;
    }
  }
</style>
