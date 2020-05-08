<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "@/assets/defaults.scss";

  html, body, #app {
    margin: 0;
    height: 100%;
    width: 100%;
    font-family: 'Jost', sans-serif;
    background-color: $c_grey;
  }
</style>
