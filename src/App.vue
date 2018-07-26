<template>
  <div id="app" class="wrapper">
    <doc-toolbar
            :title="title"
            :links="links"/>
    <router-view/>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocToolbar from './components/DocToolbar'

export default {
  name: 'app',
  components: {
    DocToolbar,
    DocFooter
  },

  data () {
    return {
      title: '45646546',
      links: [
        {id: 0, title: 'About', href: '/did/about', target: null},
        {id: 1, title: 'RedButton', href: '/did/rb', target: null}
      ]
    }
  }
}
</script>

<style>

  html,
  body {
    height: 100%;
    margin: 0px;
  }

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }

</style>
