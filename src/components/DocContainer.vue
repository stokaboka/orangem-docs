<template>
    <div class="doc-container">
        <doc-index class="doc-index"
                :index="index"
                :lang="lang"
                @document-selected="onDocumentSelected"
        />
        <doc-viewer class="doc-viewer" :url="url" :document="documnet" :lang="lang"/>
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
      documnet: null,
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
      // HTTP.get(`docs/${docid}/${lang}/index.json`)
      HTTP.get(`docs/${docid}/index.json`)
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
      if (data) {
        return data.map(function (elem) {
          let _title = elem.title[lang] ? elem.title[lang] : ''
          let _url = elem.file[lang] ? `docs/${this.docid}/${elem.file[lang]}` : ''

          return Object.assign(
            {},
            elem,
            {
              title: _title,
              url: _url,
              content: this.prepareIndex(elem.content, docid, lang)
            }
          )
        }, this)
      } else {
        return []
      }
    },

    onDocumentSelected (item) {
      this.documnet = item
      this.url = this.documnet.url
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

    .doc-index {
        position: absolute;
        z-index: 10;
        top: 61px;
        left: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;

        padding: 10px 20px 10px 10px;

        border-right: lightgray solid 1px;
    }

    .doc-viewer {
        position: relative;
        top: 61px;
        padding: 10px 20px 10px 10px;
    }

</style>
