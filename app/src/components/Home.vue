<script>
import HeaderMenu from './Home/HeaderMenu';
import NoteList from './Home/NoteList';
import Note from './Home/Note';
import moment from 'moment';
import { remote } from 'electron';
import path from 'path';
const database = remote.require(path.join(process.cwd(), 'app/database.js'));

global.database = database;

export default {
  components: {
    HeaderMenu,
    NoteList,
    Note,
  },
  created() {
    this.fetchNotes();
  },
  data() {
    return {
      notes: [],
      activeNote: {},
      savedNote: {},
    };
  },
  methods: {
    addNote(title, body, createdAt) {
      return database('notes').insert({ title, body, created_at: createdAt });
    },
    newNote() {
      const obj = {
        title: 'New Note',
        body: 'Body',
        created_at: Date.now(),
      };
      this.addNote(obj.title, obj.body, obj.created_at)
        .then((r) => {
          obj.id = r[0];
          this.activeNote = obj;
          this.fetchNotes();
        })
        .catch(err => console.log(err));
    },
    fetchNotes() {
      this.notes = [];
      database.select().from('notes').then((notes) => {
        notes.forEach((note) => {
          this.notes.push({
            title: note.title,
            body: note.body,
            created_at: parseInt(note.created_at, 10),
            id: note.id,
          });
        });
      });
    },
    editNote(id, e, property) {
      const input = e.target.innerText || ' ';
      this.activeNote[property] = input;
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          this.notes[i][property] = input;
        }
      }
    },
    saveNote(id) {
      database('notes').where('id', id).update({ title: this.activeNote.title,
        body: this.activeNote.body })
        .then(() => {
          this.fetchNotes();
          this.savedNote = { ...this.activeNote };
        })
        .catch((err) => console.log(err));
    },
    isDirty() {
      return !(this.activeNote.title === this.savedNote.title &&
        this.activeNote.body === this.savedNote.body);
    },
    deleteNote(id) {
      database('notes').where('id', id).del()
        .then(() => {
          this.fetchNotes();
          this.activeNote = {};
        })
        .catch((err) => console.log(err));
    },
    formatDate(note) {
      return moment(note.created_at).format('MMMM do, YYYY h:mm a');
    },
    formatListDate(note) {
      return moment(note.created_at).format('MM/d/YY');
    },
    selectNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          this.activeNote = { ...this.notes[i] };
          this.savedNote = { ...this.notes[i] };
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
      :isDirty='this.isDirty()'
      :newNote='newNote'
      :deleteNote='deleteNote'
      :saveNote='saveNote'
      :activeNote='activeNote.id'>
      </header-menu>
    <note-list
      :notes = 'notes'
      :activeNote = 'activeNote.id'
      :selectNote = 'selectNote'
      :formatListDate = 'formatListDate'>
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
