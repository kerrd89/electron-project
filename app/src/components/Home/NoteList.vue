<script>
export default {
  props: ['notes', 'selectNote', 'activeNote'],
  created() {
    // Set $route values that are not preset during unit testing
    if (process.env.NODE_ENV === 'testing') {
      this.$route = {
        name: 'home-page',
        path: '/home-page',
      };
    }
  },
  methods: {
    isActive(id) {
      if (this.activeNote === id) {
        return 'active';
      }
      return 'inactive';
    },
  },
};
</script>

<template>
  <ul>
    <li v-for = '(note, index) note in notes'
    @click='selectNote(note.created_at)'
    v-bind:class='isActive(note.created_at)'
    >
    {{note.title}}
  </li>
</ul>
</template>

<style scoped>
  ul {
    width: 25%;
    height: 90%;
    background-color: white;
    position: absolute;
    left: 0px;
    top: 10%;
  }

  li {
    border: 2px solid black;
  }

  .active {
    background-color:grey
  }
</style>
