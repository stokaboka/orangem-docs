<template>
  <div id="app" class="wrapper">
    <doc-toolbar
            :logo="state.logo"
            :title="state.title"
            :links="state.docs"
            :languages="api.LANGUAGES"
            :lang="state.lang"
            @language-change="onLanguageChange"
     />
    <div class="doc-container">
      <router-view class="doc-index" name="doc-index"></router-view>
      <router-view class="doc-viewer" name="doc-viewer"></router-view>
    </div>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocToolbar from './components/DocToolbar'
import {api} from './api'

export default {
  name: 'app',
  components: {
    DocToolbar,
    DocFooter
  },

  data () {
    return {
      api: api,
      state: api.state
    }
  },

  created () {
    this.created()
  },

  methods: {
    async created () {
      await api.init(this)
    },

    onLanguageChange (lang) {
      this.api.setLang(lang)
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

.doc-container{
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  top: 41px;
}

.doc-container > * {
  padding: 10px;
  flex: 1 100%;
}

.doc-index {
  overflow-x: auto;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  margin: 40px 20px 10px 10px;
}

.doc-viewer {
  min-height: 90vh;
  margin: 40px 0 0 0;
  padding: 10px 20px 10px 10px;
  border-left: lightgray solid 1px;
}

@media all and (min-width: 600px) {
  .doc-index {
    flex: 1 auto;
    min-height: 0;
  }
}

@media all and (min-width: 800px) {
  .doc-viewer {
    flex: 3 0px;
  }
  .doc-index {
    order: 1;
    min-height: 0;
  }
  .doc-viewer {
    order: 2;
  }

}

</style>
