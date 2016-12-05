<style scoped>
  ul {
    width: 25%;
    height: 90%;
    background-color: grey;
    position: absolute;
    left: 0px;
    top: 10%;
  }
</style>

<template>
  <ul>
    <li>
    this is a note preview
  </li>
  </ul>
</template>

<script>
  export default {
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'home-page',
          path: '/home-page',
        };
      }
    },
  };
</script>
