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
  },
  methods: {
    sendMessage() {
      WS.sendCommand(
        this.$socket,
        'SEND',
        {
          text: this.message,
          userId: 'askdjalskdjaksl',
        },
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
