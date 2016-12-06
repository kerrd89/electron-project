<style scoped>
  textarea {
  width: 75%;
  height: 90%;
  background-color: red;
  position: absolute;
  top: 10%;
  left: 25%;
}
</style>

<template>
  <article>
    <textarea>{{note}}<textarea>
  </article>
</template>


<script>
  export default {
    props: ['note'],
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
