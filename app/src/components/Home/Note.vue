<script>
  const synth = window.speechSynthesis;
  export default {
    props: ['editNote', 'activeNote', 'newNote', 'formatDate'],
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
    <p class="time-stamp" @keyup='onChange(activeNote.id, $event, `created_at`)'
    >{{formatDate(activeNote)}}</p>
    <h1 @keyup='onChange(activeNote.id, $event, `title`)' contenteditable="true"
    >{{activeNote.title}}</h1>
    <p class="body" @keyup='onChange(activeNote.id, $event, `body`)' contenteditable="true"
    >{{activeNote.body}}</p>
    <button @click='readNote(activeNote)'>Read Note</button>
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

  .body {
    letter-spacing: 0.5px;
    margin-top: 15px;
    margin-left: 20px;
    outline: none;
    text-align: left;
  }
</style>
