<template>
  <div class="chat-messages" v-chat-scroll="{smooth: true}">
    <chat-message
      v-for="(message, index) in messages"
      :key="`message-${index}`"
      :message="message"
    />
  </div>
</template>

<script>
import ChatMessage from '@/components/chat-message.vue';

export default {
  components: {
    ChatMessage,
  },
  computed: {
    messages() {
      if (this.$route.meta.admin) {
        return this.$store.getters.messagesForUser(this.$store.getters.selectedUser);
      }
      return this.$store.getters.messages;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";

  .chat-messages {
    height: 500px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid $c_grey;
    border-radius: $br_md;
    padding: $sp_lg $sp_md;
    overflow-y: auto;
  }
</style>
