<script>
  export default {
    props: ['note', 'addNote', 'activeNote'],
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
  <article>
    <textarea
      @blur='addNote($event)'>
      {{activeNote}}
    </textarea>
  </article>
</template>

<style scoped>
  textarea {
  width: 75%;
  height: 30%;
  background-color: red;
  position: absolute;
  top: 10%;
  left: 25%;
}
</style>
