<script>
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
  </article>
  <article v-else
    @click='newNote'>
  </article>
</template>

<style scoped>
  article {
    width: 75%;
    height: 90%;
    position: absolute;
    top: 10%;
    left: 25%;
    border-left: 2px solid #595d58;
  }

  h1 {
    letter-spacing: 0.5px;
    margin-top: 10px;
    margin-left: 20px;
    outline: none;
    text-align: left;
  }

  .time-stamp {
    margin-top: 30px;
  }

  .body {
    letter-spacing: 0.5px;
    margin-top: 15px;
    margin-left: 20px;
    outline: none;
    text-align: left;
  }
</style>
