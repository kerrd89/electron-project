<script>
  const synth = window.speechSynthesis;
  export default {
    props: ['editNote', 'activeNote', 'newNote', 'formatDate', 'isDirty'],
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
        const noteText = new SpeechSynthesisUtterance(note.body);
        noteText.voice = voices[0];
        synth.speak(noteText);
      },
    },
  };
</script>

<template>
  <article v-if='activeNote.title'>
    <div class='note-header'>
      <p class="time-stamp" @keyup='onChange(activeNote.id, $event, `created_at`)'
      >{{formatDate(activeNote)}}</p>
      <button @click='readNote(activeNote)' class='read-note-button'>
        <svg width="19px" height="18px" viewBox="3 3 19 18">
            <path d="M3,9 L3,15 L7,15 L12,20 L12,4 L7,9 L3,9 L3,9 Z M16.5,12 C16.5,10.23 15.48,8.71 14,7.97 L14,16.02 C15.48,15.29 16.5,13.77 16.5,12 L16.5,12 Z M14,3.23 L14,5.29 C16.89,6.15 19,8.83 19,12 C19,15.17 16.89,17.85 14,18.71 L14,20.77 C18.01,19.86 21,16.28 21,12 C21,7.72 18.01,4.14 14,3.23 L14,3.23 Z" id="Shape" stroke="none" fill-opacity="0.7" fill="#000000" fill-rule="evenodd"></path>
        </svg>
      </button>
    </div>
    <h1 @keyup='onChange(activeNote.id, $event, `title`)' contenteditable="true"
    >{{activeNote.title}}</h1>
    <p class="body" @keyup='onChange(activeNote.id, $event, `body`)' contenteditable="true"
    >{{activeNote.body}}</p>
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
  }

  span {
    background-color: yellow;
    font-weight: 900;
  }

  h1 {
    letter-spacing: 0.5px;
    margin-top: 10px;
    margin-left: 20px;
    outline: none;
    text-align: left;
  }

  button {
    font-size: 20px;
    background-color: #e0e0e7;
    border: none;
    padding: 5px;
  }

  .time-stamp {
    margin: 30px auto 0px auto;
  }

  .note-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .read-note-button {
    margin: 20px 20px 0px 0px;
  }

  .body {
    height: 100px;
    letter-spacing: 0.5px;
    margin-top: 15px;
    margin-left: 20px;
    outline: none;
    text-align: left;
  }
</style>
