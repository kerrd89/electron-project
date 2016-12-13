<script>
  import { remote } from 'electron';
  import path from 'path';
  const directory = process.env.NODE_ENV === 'development' ? process.cwd() : __dirname;
  const mainProcess = remote.require(path.join('/Users/davidkerr/Projects/electron-project/app', '/electron.js'));
  const currentWindow = remote.getCurrentWindow();
  const synth = window.speechSynthesis;

  import applescript from 'applescript';
  export default {
    props: ['editNote', 'activeNote', 'newNote', 'formatDate', 'isDirty', 'toggleFlag'],
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'note',
          path: '/note',
        };
      }
    },
    methods: {
      onChange(id, e, prop) {
        this.editNote(id, e, prop);
      },
      readNote(note) {
        const voices = synth.getVoices();
        const noteText1 = new SpeechSynthesisUtterance(this.formatDate(note));
        const noteText2 = new SpeechSynthesisUtterance(note.title);
        const noteText = new SpeechSynthesisUtterance(note.body);
        noteText.voice = voices[0];
        synth.speak(noteText1);
        synth.speak(noteText2);
        synth.speak(noteText);
      },
      copyToClipboard(body) {
        const script = `set the clipboard to "${body}"`;
        applescript.execString(script);
        mainProcess.copyToClipboard(currentWindow);
      },
      cancelReadNote() {
        synth.cancel();
      },
    },
  };
</script>

<template>
  <article v-if='activeNote.title' @focusout='cancelReadNote'>
    <div class='note-header'>
      <p @keyup='onChange(activeNote.id, $event, `created_at`)' class='note-created-at'
      >{{formatDate(activeNote)}}</p>
      <button @click='toggleFlag' class='toggle-flag-button'>
        <svg width="20px" height="20px" viewBox="2 2 20 20">
            <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 L13,13 Z" id="Shape" stroke="none" fill-opacity="0.7" fill="#000000" fill-rule="evenodd"></path>
        </svg>
      </button>
      <button @click='readNote(activeNote)' class='read-note-button'>
        <svg width="19px" height="18px" viewBox="3 3 19 18">
            <path d="M3,9 L3,15 L7,15 L12,20 L12,4 L7,9 L3,9 L3,9 Z M16.5,12 C16.5,10.23 15.48,8.71 14,7.97 L14,16.02 C15.48,15.29 16.5,13.77 16.5,12 L16.5,12 Z M14,3.23 L14,5.29 C16.89,6.15 19,8.83 19,12 C19,15.17 16.89,17.85 14,18.71 L14,20.77 C18.01,19.86 21,16.28 21,12 C21,7.72 18.01,4.14 14,3.23 L14,3.23 Z" id="Shape" stroke="none" fill-opacity="0.7" fill="#000000" fill-rule="evenodd"></path>
        </svg>
      </button>
      <button @click='copyToClipboard(activeNote.body)' class='copy-to-clipboard-button'>
        <svg width="24px" height="24px" viewBox="432 48 24 24">
          <g id="ic_content_copy" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(432.000000, 48.000000)">
            <path d="M16,1 L4,1 C2.9,1 2,1.9 2,3 L2,17 L4,17 L4,3 L16,3 L16,1 L16,1 Z M19,5 L8,5 C6.9,5 6,5.9 6,7 L6,21 C6,22.1 6.9,23 8,23 L19,23 C20.1,23 21,22.1 21,21 L21,7 C21,5.9 20.1,5 19,5 L19,5 Z M19,21 L8,21 L8,7 L19,7 L19,21 L19,21 Z" id="Shape" fill-opacity="0.7" fill="#000000"></path>
          </g>
        </svg>
      </button>
    </div>
    <textarea v-model='activeNote.title' @keyup='onChange(activeNote.id, $event, `title`)' contenteditable="true" class='note-title'
    />
    <textarea v-model='activeNote.body' @keyup='onChange(activeNote.id, $event, `body`)' contenteditable="true" class='note-body'
    />
    <p class="save-message" v-show='isDirty'>
      <span>This note has unsaved changes. Please save before leaving note.</span>
    </p>
  </article>
  <article v-else
    @click='newNote'>
  </article>
</template>

<style scoped>
  article {
    height: 90%;
    width: 74%;
    position: absolute;
    top: 10%;
    left: 25%;
    border-left: 4px solid #c6d6c2;
    display: flex;
    flex-direction: column;
  }

  textarea {
    font-size: 20px;
    border: none;
    text-align: left;
    margin: 10px 30px;
    outline: none;
    padding: 10px;
  }

  span {
    background-color: #fff59d;
    padding: 5px;
  }

  button {
    font-size: 20px;
    background-color: #e0e0e7;
    border: none;
    padding: 5px;
    margin: auto 20px auto 0px;
  }

  .time-stamp {
    margin: 30px auto 0px auto;
  }

  .note-header {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
  }

  .note-created-at {
    margin: auto;
  }

  .note-title {
    height: 25px;
    margin-top: 30px;
  }

  .note-body {
    height: 55%;
    font-size: 16px;
    overflow-y: scroll;
    margin-bottom: 20px;
  }
</style>
