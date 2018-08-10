<template>
  <div id="app" class="wrapper">
    <doc-toolbar
            :logo="logo"
            :title="state.title"
            :links="state.links"
            :languages="languages"
            :lang="state.lang"
            @language-change="onLanguageChange"/>
    <router-view/>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocToolbar from './components/DocToolbar'
import api from './api'

export default {
  name: 'app',
  components: {
    DocToolbar,
    DocFooter
  },

  data () {
    return {
      logo: 'Orangem::DocViewer',
      languages: api.LANGUAGES,
      state: api.state
    }
  },

  methods: {

    onLanguageChange (value) {
      let route = ''

      if (this.state.doc) {
        route = route + `/doc/${this.state.doc}`
      }

      if (this.state.section) {
        route = route + `/section/${this.state.section}`
      }

      route = route + `/lang/${value}`

      this.$router.push(route)
    }
  },

  async created () {
    this.state = await api.initState(this.languages[0].id)
  },

  watch: {
    state: function (n, o) {
      console.log(n)
    },
    $route: function (to, from) {
      // if (to.params.lang) {
      //   this.lang = to.params.lang
      // }

      // if (to.params.doc) {
      //   this.doc = to.params.doc
      // }

      // if (to.params.section) {
      //   this.section = to.params.section
      // } else {
      //   this.section = ''
      // }

      this.state = api.dispatch(this.state, api.ACTIONS.SET_LANG, {lang: to.params.lang ? to.params.lang : 'en'})
      this.state = api.dispatch(this.state, api.ACTIONS.SET_DOC, {doc: to.params.doc ? to.params.doc : ''})
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

img {
  max-width: 70vw;
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
}
</style>
