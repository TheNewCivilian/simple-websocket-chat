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
import messageModel from '@/models/message';

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
      this.$store.dispatch('addMessage', messageModel(this.message, true, this.username));
      this.$store.dispatch('addMessage', messageModel('Hey', false, 'no'));
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
