<script>
export default {
  props: ['notes', 'selectNote', 'activeNote', 'formatDate'],
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
      if (this.activeNote === id) { return 'active'; }
      return 'inactive';
    },
  },
};
</script>

<template>
  <ul>
    <li v-for = '(note, index) note in notes'
    @click='selectNote(note.id)'
    v-bind:class='isActive(note.id)'
    >
    {{note.title}}<span> updated: {{formatDate(note)}}</span>
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

  span {
    font-size: 12px;
  }
</style>
