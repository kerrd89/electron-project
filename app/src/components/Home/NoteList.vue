<script>
export default {
  props: ['filteredNotes', 'selectNote', 'activeNote', 'formatListDate', 'search'],
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
    sliceTitle(title) {
      const shortTitle = title.slice(0, 30).concat('...');
      return shortTitle;
    },
  },
};
</script>

<template>
  <ul>
    <li v-for = '(note, index) note in filteredNotes'
      @click='selectNote(note.id)'
      v-bind:class='isActive(note.id)'>
      <svg width="15px" height="15px" viewBox="2 2 20 20" v-show='note.flagged'>
        <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 L12,2 Z M13,17 L11,17 L11,15 L13,15 L13,17 L13,17 Z M13,13 L11,13 L11,7 L13,7 L13,13 L13,13 Z" id="Shape" stroke="none" fill-opacity="0.7" fill="#F44336" fill-rule="evenodd"></path>
      </svg>
      <h3 v-if='note.title.length < 10'>{{note.title}}</h3>
      <h3 v-else>{{sliceTitle(note.title)}}</h3>
      <span>Created on: {{formatListDate(note)}}</span>
    </li>
  </ul>
</template>

<style scoped>
  ul {
    height: 90%;
    width: 25%;
    position: fixed;
    left: 0px;
    top: 10%;
    overflow-y: scroll;
  }

  li {
    border: 2px solid #dfebe0;
    font-size: 16px;
    margin: 10px;
    padding: 20px
  }

  .active {
    background-color: #81C784;
  }

  span {
    font-size: 12px;
    font-weight: 500;
  }

  svg {
    float: right;
    margin-top: 3px;
  }
</style>
