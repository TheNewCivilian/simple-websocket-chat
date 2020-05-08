<template>
  <div class="login">
    <span class="login__description">Choose a Nickname to start:</span>
    <div>
      <input />
      <button></button>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
  @import "@/assets/defaults.scss";

  .login {
    height: fit-content;
    background-color: $c_white;
    padding: $sp_lg;
    border-radius: $br_md;
    box-shadow: $bs_md;
  }
</style>
