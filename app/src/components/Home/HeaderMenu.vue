<style scoped>
  header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10%;
    position: absolute;
    top: 0px;
    left: 0px;
    -webkit-app-region: drag;
    background: #698679;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }
  p {
    margin: auto 10px;
    cursor: pointer;
  }
  button {
    border-radius: 2px;
    color: black;
    border: none;
    font-size: 14px;
    letter-spacing: 0.5px;
    background: #698679;
    cursor: pointer;
    margin-right: 40px;
  }
  button:disabled {
    border-radius: 2px;
    font-size: 14px;
    color: rgba(0,0,0,0.26);
    letter-spacing: 0.5px;
  }
</style>

<template>
  <header>
    <p @click='newNote'>
      <svg width="30px" height="30px" viewBox="0 -1 25 25" >
        <polygon id="Shape" stroke="none" fill="#000000" fill-rule="evenodd" points="11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11 13 11 13 5"></polygon>
      </svg>
    </p>
    <p @click='deleteNote(activeNote)'>
      <svg width="21px" height="28.5px" viewBox="0 1   20 20" >
        <path d="M17.999,7 L5.999,7 L5.999,19 C5.999,20.104 6.895,21 8,21 L15.999,21 C17.105,21 17.999,20.104 17.999,19 L17.999,7 M14.499,2.999 L9.499,2.999 L8.5,4 L5.999,4 C5.448,4 5,4.448 5,4.999 L5,6 L19,6 L19,4.999 C19,4.448 18.552,4 17.999,4 L15.5,4 L14.499,2.999" id="Fill-3" stroke="none" fill="#000000" fill-rule="evenodd"></path>
      </svg>
    </p>
    <p @click='saveNote(activeNote)'>
      <button v-bind:disabled='!isDirty'>SAVE</button>
    </p>
  </header>
</template>

<script>
  export default {
    props: ['newNote', 'deleteNote', 'activeNote', 'isDirty', 'saveNote'],
    created() {
      // Set $route values that are not preset during unit testing
      if (process.env.NODE_ENV === 'testing') {
        this.$route = {
          name: 'header',
          path: '/header',
        };
      }
    },
  };
</script>
