<template>
  <div id="app">
    <doc-toolbar/>
    <router-view/>
    <doc-footer/>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocToolbar from './components/DocToolbar'

export default {
  name: 'app',
  components: {
    DocToolbar,
    DocViewer,
    DocIndex,
    DocFooter
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
