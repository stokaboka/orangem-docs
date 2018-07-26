<template>
  <div id="app">
    <doc-toolbar/>
    <router-view/>
    <doc-index/>
    <doc-viewer/>
    <doc-footer/>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocIndex from './components/DocIndex'
import DocViewer from './components/DocViewer'
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
