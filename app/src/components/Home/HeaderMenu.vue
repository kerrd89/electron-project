<style scoped>
  header {
    display:block;
    width: 100%;
    height: 10%;
    background-color: blue;
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>

<template>
  <header>
    <h1>header</h1>
    <button @click='newNote'>new Note</button>
  </header>
</template>

<script>
  export default {
    props: ['newNote'],
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'header',
          path: '/header',
        };
      }
    },
  };
</script>
