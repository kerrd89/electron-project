<script>
  export default {
    props: ['note', 'editNote', 'activeNote'],
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'note',
          path: '/note',
        };
      }
    },
    data() {
      return {
        editable: 'false',
      };
    },
  };
</script>

<template>
  <article>
    <p @keyup='editNote(activeNote.created_at, $event, `title`)' contenteditable="true"
    >{{activeNote ? activeNote.title : "New Note"}}</p>
    <p @keyup='editNote(activeNote.created_at, $event, `created_at`)' contenteditable="true"
    >{{activeNote ? activeNote.created_at : "New Note"}}</p>
    <p @keyup='editNote(activeNote.created_at, $event, `body`)' contenteditable="true"
    >{{activeNote ? activeNote.body : "New Note"}}</p>
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
