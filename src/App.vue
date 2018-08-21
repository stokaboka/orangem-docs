<template>
  <div id="app" class="container">
    <router-view class="doc-toolbar" name="doc-toolbar"
                 :logo="api.state.logo"
                 :title="api.state.title"
                 :links="api.state.docs"
                 :languages="api.LANGUAGES"
    />

      <router-view class="doc-index" name="doc-index"/>
      <router-view class="doc-viewer" name="doc-viewer"/>

    <doc-footer class="footer"/>
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
      api: api
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

.container {
  display: grid;
  grid-template-rows: 40px auto 120px;
  grid-template-columns: 25% 75%;

  grid-template-areas:
  "toolbar toolbar"
  "index viewer"
  "footer footer";

  justify-items: stretch;
  align-items: stretch;

  width: 100vw;
  height: 100vh;
}

.doc-toolbar {
  grid-area: toolbar;

  /*grid-column: 1 / 3;*/
  /*grid-row: 1;*/

  padding: 10px 10px 10px 10px;
}

.doc-index {
  grid-area: index;

  /*grid-column: 1 ;*/
  /*grid-row: 2 / 3;*/

  padding: 10px 20px 10px 10px;

  overflow-x: auto;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
}

.doc-viewer {
  grid-area: viewer;

  width: 80vw;
  max-width: 650px;
  /*grid-column: 2;*/
  /*grid-row: 2 / 3;*/

  padding: 10px 20px 10px 10px;
  border-left: lightgray solid 1px;
}

.footer {
  grid-area: footer;
  /*width: 100%;*/
  /*max-height: 120px;*/
  border-top: lightgray solid 1px;
}

/*@media all and (min-width: 600px) {*/
  /*.doc-index {*/
    /*flex: 1 auto;*/
    /*min-height: 0;*/
  /*}*/
/*}*/

/*@media all and (min-width: 800px) {*/
  /*.doc-viewer {*/
    /*flex: 3 0px;*/
  /*}*/
  /*.doc-index {*/
    /*order: 1;*/
    /*min-height: 0;*/
  /*}*/
  /*.doc-viewer {*/
    /*order: 2;*/
  /*}*/

/*}*/

</style>
