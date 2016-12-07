<style scoped>
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10%;
    background-color: blue;
    position: absolute;
    top: 0px;
    left: 0px;
  }
  p {
    margin: auto 0px auto auto;
    font-size: 50px;
    background-color: red;
    border: none;
    cursor: pointer;
  }
</style>

<template>
  <header>
    <p @click='newNote'>⊕</p>
    <p @click='deleteNote(activeNote)'>DELETE</p>
  </header>
</template>

<script>
  export default {
    props: ['newNote', 'deleteNote', 'activeNote'],
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
