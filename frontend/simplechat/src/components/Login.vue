<template>
  <div class="login">
    <span class="login__description">Choose a nickname to start:</span>
    <div class="login__row">
      <input
        class="login__input"
        v-model="username"
      />
      <button
        class="login__button"
        @click="enterName"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import WS from '../ws';

export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    enterName() {
      if (this.username) {
        WS.sendCommand(
          this.$socket,
          'SUB',
          {
            name: this.username,
            userId: uuidv4(),
            admin: this.$route.meta.admin,
          },
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";

  .login {
    margin: 100px auto;
    width: fit-content;
    height: fit-content;
    background-color: $c_white;
    padding: $sp_lg;
    border-radius: $br_md;
    box-shadow: $bs_md;

    &__description {}

    &__row {
      @extend .row;
      margin-top: 10px;
    }

    &__input {
      @extend .input;
      font-weight: 600;
    }

    &__button {
      @extend .button;
      background-color: $c_red;
      color: $c_white;
      margin: 0 10px;
      font-weight: 500;
    }
  }
</style>
