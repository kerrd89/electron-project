<script>
  export default {
    props: ['note', 'editNote', 'activeNote', 'newNote', 'formatDate'],
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'note',
          path: '/note',
        };
      }
    },
  };
</script>

<template>
  <article v-if='activeNote.title'>
    <p @keyup='editNote(activeNote.created_at, $event, `title`)' contenteditable="true"
    >{{activeNote.title}}</p>
    <p @keyup='editNote(activeNote.created_at, $event, `created_at`)' contenteditable="true"
    >updated: {{formatDate(activeNote)}}</p>
    <p @keyup='editNote(activeNote.created_at, $event, `body`)' contenteditable="true"
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
  background-color: red;
  position: absolute;
  top: 10%;
  left: 25%;
  }
</style>
