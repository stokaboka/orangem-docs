<template>
    <div class="doc-container">
        <doc-index :index="index"/>
        <doc-viewer :url="url"/>
    </div>
</template>

<script>

import {HTTP} from '@/api'
import DocIndex from './DocIndex'
import DocViewer from './DocViewer'

export default {
  name: 'DocContainer',
  components: {
    DocIndex,
    DocViewer
  },

  data () {
    return {
      docid: 'about',
      index: [],
      url: '',
      errors: []
    }
  },

  methods: {
    load (docid) {
      HTTP.get(`${docid}.json`)
        .then(response => {
          this.index = this.prepareIndex(response.data)
          this.docid = docid
        })
        .catch(e => {
          this.index = []
          this.url = ''
          this.errors.push(e)
          console.error(e)
        })
    },
    prepareIndex (data) {
    }

  },

  watch: {
    '$route': function (to, from) {
      console.log('docid', to.params.docid)
      this.load(to.params.docid)
    }
  }

}
</script>

<style scoped>
    .doc-container{
        flex: 1 0 auto;
    }
</style>
