<template>
  <div class="chat-window">
    <chat-messages />
    <chat-input />
    <customer-list v-if="$route.meta.admin"/>
  </div>
</template>

<script>
import ChatMessages from '@/components/ChatWindow/chat-messages.vue';
import ChatInput from '@/components/ChatWindow/chat-input.vue';
import CustomerList from '@/components/ChatWindow/customer-list.vue';

export default {
  components: {
    ChatMessages,
    ChatInput,
    CustomerList,
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";

  .chat-window {
    margin: 100px auto;
    width: 90%;
    max-width: 600px;
    background-color: $c_white;
    padding: $sp_lg;
    border-radius: $br_md;
    box-shadow: $bs_md;
  }
</style>
