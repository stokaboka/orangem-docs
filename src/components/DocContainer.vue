<template>
    <div class="doc-container">
        <doc-index
                :index="index"
                @document-selected="onDocumentSelected"
        />
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

  created () {
    if (this.$route.params.docid && this.$route.params.lang) {
      this.loadIndex(this.$route.params.docid, this.$route.params.lang)
    }
  },

  methods: {
    loadIndex (docid, lang) {
      let self = this
      HTTP.get(`docs/${docid}/${lang}/index.json`)
        .then(response => {
          self.docid = docid
          self.lang = lang
          self.index = this.prepareIndex(response.data, docid, lang)
        })
        .catch(e => {
          self.docid = ''
          self.lang = ''
          self.index = []
          self.url = ''
          self.errors.push(e)
          console.error(e.message)
        })
    },

    prepareIndex (data, docid, lang) {
      return data.map(function (elem) {
        return Object.assign(
          {},
          elem,
          { url: `docs/${docid}/${lang}/${elem.file}` }
        )
      })
    },

    onDocumentSelected (item) {
      this.url = item.url
    }

  },

  watch: {
    '$route': function (to, from) {
      console.log('container::docid', to.params.docid, to.params.lang)
      this.loadIndex(to.params.docid, to.params.lang)
    }
  }

}
</script>

<style scoped>
    .doc-container{
        flex: 1 0 auto;
    }
</style>
