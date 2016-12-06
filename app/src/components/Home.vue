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
      activeNote: {},
    };
  },
  methods: {
    selectNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].created_at === id) {
          this.activeNote = this.notes[i];
        }
      }
    },
    newNote() {
      const obj = {
        title: 'Note Title',
        body: 'Note Body',
        created_at: Date.now(),
      };
      this.notes.push(obj);
      this.activeNote = obj;
    },
    editNote(id, e, property) {
      const input = e.target.innerText || ' ';
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].created_at === id) {
          this.notes[i][property] = input;
          this.activeNote = this.notes[i];
        }
      }
    },
  },
  name: 'home-page',
};
</script>

<template>
  <div class="app">
    <header-menu
      :newNote='newNote'
    ></header-menu>
    <note-list
      :notes = 'notes'
      :activeNote = 'activeNote.created_at'
      :selectNote = 'selectNote'>
    </note-list>
    <note
      :editNote='editNote'
      :activeNote='activeNote'
      :newNote='newNote'>
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
