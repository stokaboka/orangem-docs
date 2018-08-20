<template>
  <div id="app" class="wrapper">
    <router-view class="doc-toolbar" name="doc-toolbar"
                 :logo="api.state.logo"
                 :title="api.state.title"
                 :links="api.state.docs"
                 :languages="api.LANGUAGES"
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
      await this.api.init(this)
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

.doc-toolbar {
  grid-area: toolbar;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  /*z-index: 100;*/
  padding: 10px 10px 10px 10px;
}

.doc-index {
  grid-area: index;

  overflow-x: auto;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;

  margin: 40px 20px 10px 10px;
}

.doc-viewer {
  grid-area: viewer;

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
