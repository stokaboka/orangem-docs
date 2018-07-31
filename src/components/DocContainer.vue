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
      docid: '',
      lang: '',
      index: [],
      url: '',
      errors: []
    }
  },

  methods: {
    load (docid, lang) {
      HTTP.get(`docs/${docid}/${lang}/index.json`)
        .then(response => {
          this.index = this.prepareIndex(response.data)
          this.docid = docid
          this.lang = lang
        })
        .catch(e => {
          this.docid = ''
          this.lang = ''
          this.index = []
          this.url = ''
          this.errors.push(e)
          console.error(e.message)
        })
    },
    prepareIndex (data) {
    }

  },

  created () {
    this.load(this.docid)
  },

  watch: {
    '$route': function (to, from) {
      console.log('container::docid', to.params.docid, to.params.lang)
      this.load(to.params.docid, to.params.lang)
    }
  }

}
</script>

<style scoped>
    .doc-container{
        flex: 1 0 auto;
    }
</style>
