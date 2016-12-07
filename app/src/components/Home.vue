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
  data() {
    return {
      notes: [],
      activeNote: {},
    };
  },
  created() {
    this.fetchNotes();
  },
  methods: {
    addNote(title, body, createdAt) {
      return database('notes').insert({ title, body, created_at: createdAt });
    },
    newNote() {
      const obj = {
        title: 'Note Title',
        body: 'Note Body',
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
      database('notes').where('id', id).update(property, input)
        .then(() => {
          this.fetchNotes();
        })
        .catch((err) => console.log(err));
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
      return moment(note.created_at).format('M/D/YY H:mm');
    },
    selectNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
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
      :deleteNote='deleteNote'
      :activeNote='activeNote.id'>
      </header-menu>
    <note-list
      :notes = 'notes'
      :activeNote = 'activeNote.id'
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
