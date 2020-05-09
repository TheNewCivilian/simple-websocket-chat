<template>
  <div class="chat-input">
    <input
      class="chat-input__message"
      :placeholder="`You are chatting as ${username}`"
      v-model="message"
    />
    <button
      class="chat-input__send"
      @click="sendMessage"
    >
      Send
    </button>
  </div>
</template>

<script>
import WS from '../ws';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    selectedUser() {
      return this.$store.getters.selectedUser;
    },
  },
  methods: {
    sendMessage() {
      if (!this.$route.meta.admin) {
        WS.sendCommand(
          this.$socket,
          'SEND',
          {
            text: this.message,
          },
        );
      } else {
        WS.sendCommand(
          this.$socket,
          'SEND',
          {
            text: this.message,
            destination: this.selectedUser,
          },
        );
      }
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
