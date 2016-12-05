<style scoped>
  .app {
    width: 100%;
    height: 100%;
    postion: relative;
  }
</style>

<template>
  <div class="app">
    <header-menu></header-menu>
    <note-list></note-list>
    <note></note>
  </div>
</template>

<script>
  import HeaderMenu from './Home/HeaderMenu';
  import NoteList from './Home/NoteList';
  import Note from './Home/Note';

  export default {
    components: {
      HeaderMenu,
      NoteList,
      Note,
    },
    name: 'home-page',
  };
</script>
