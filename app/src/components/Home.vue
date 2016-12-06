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
    <note-list
      :notes = 'notes'
      :selectNote = 'selectNote'>
    </note-list>
    <note :note = 'notes[activeNote]'></note>
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

    data() {
      return {
        notes: ['note 1', 'note 2', 'note 3'],
        activeNote: 0,
      };
    },
    methods: {
      selectNote(index) {
        this.activeNote = index;
      },
    },
    name: 'home-page',
  };
</script>
