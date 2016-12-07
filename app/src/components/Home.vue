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
    fetchNotes() {
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
    addNotes(title, body, createdAt) {
      return database('notes').insert({ title, body, created_at: createdAt });
    },
    selectNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
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

      this.addNotes(obj.title, obj.body, obj.created_at)
        .then((r) => {
          obj.id = r[0];
          this.notes.push(obj);
          this.activeNote = obj;
        })
        .catch(err => console.log(err));
    },
    editNote(id, e, property) {
      const input = e.target.innerText || ' ';
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          this.notes[i][property] = input;
          this.activeNote = this.notes[i];
        }
      }
    },
    deleteNote(id) {
      for (let i = 0; i < this.notes.length; i++) {
        if (this.notes[i].id === id) {
          this.notes.splice(i, 1);
          this.activeNote = {};
        }
      }
      database('notes').where('id', id).del()
        .then((r) => console.log(r))
        .catch((err) => console.log(err));
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
