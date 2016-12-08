<script>
export default {
  props: ['notes', 'selectNote', 'activeNote', 'formatListDate'],
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
    v-bind:class='isActive(note.id)'>
    <h3>{{note.title}}</h3>
    <span>Created on: {{formatListDate(note)}}</span>
  </li>
</ul>
</template>

<style scoped>
  ul {
    width: 25%;
    position: absolute;
    left: 0px;
    top: 10%;
  }

  li {
    border: 2px solid #dfebe0;
    font-size: 20px;
    height: 80px;
    margin: 10px;
  }

  h3 {
    margin-top: 10px;
  }

  .active {
    background-color: rgb(92, 159, 95);
  }

  span {
    font-size: 15px;
    font-weight: 500;
  }
</style>
