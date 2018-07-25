<template>
  <div id="app">
    <doc-toolbar/>
    <doc-index/>
    <doc-viewer/>
    <doc-footer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Toolbar from './components/DocToolbar'
import DocFooter from './components/DocFooter'
import DocIndex from './components/DocIndex'
import DocViewer from './components/DocViewer'

export default {
  name: 'app',
  components: {
    DocViewer,
    DocIndex,
    DocFooter,
    Toolbar,
    HelloWorld
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
