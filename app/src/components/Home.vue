<script>
import HeaderMenu from './Home/HeaderMenu';
import NoteList from './Home/NoteList';
import Note from './Home/Note';
import moment from 'moment';

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
      console.log(moment(this.activeNote.created_at).format('YYYY-MM-DD HH:mm'));
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
    deleteNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].created_at === id) {
          this.notes.splice(i, 1);
          this.activeNote = {};
        }
      }
    },
    formatDate(note) {
      return moment(note.created_at).format('M/D/YY H:mm');
    },
  },
  name: 'home-page',
};
</script>

<template>
  <div class="app">
    <header-menu
      :newNote='newNote'
      :deleteNote='deleteNote'
      :activeNote='activeNote.created_at'>
      </header-menu>
    <note-list
      :notes = 'notes'
      :activeNote = 'activeNote.created_at'
      :selectNote = 'selectNote'
      :formatDate = 'formatDate'>
    </note-list>
    <note
      :editNote='editNote'
      :activeNote='activeNote'
      :newNote='newNote'
      :formatDate='formatDate'>
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
