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
      notes: [],
      activeNote: '',
    };
  },
  methods: {
    selectNote(e) {
      this.activeNote = e.target.innerText;
      console.log(this.activeNote);
    },
    addNote(e) {
      this.pushNotes(e.target.value);
      e.target.value = '';
    },
    pushNotes(note) {
      this.notes.push(note);
    },
  },
  name: 'home-page',
};
</script>

<template>
  <div class="app">
    <header-menu></header-menu>
    <note-list
      :notes = 'notes'
      :selectNote = 'selectNote'>
    </note-list>
    <note
      :note='notes[activeNote]'
      :addNote='addNote'
      :activeNote='activeNote'
    >
    </note>
  </div>
</template>

<style scoped>
  .app {
    width: 100%;
    height: 100%;
    postion: relative;
  }
</style>
