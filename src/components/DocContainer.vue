<template>
    <div class="doc-container">
        <doc-index class="doc-index"
                :index="index"
                :lang="lang"
                @document-selected="onDocumentSelected"
        />
        <doc-viewer class="doc-viewer"
                    :url="url"
                    :docid="docid"
                    :document="documnet"
                    :lang="lang"
        />
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
      section: '',
      lang: '',
      index: [],
      url: '',
      errors: []
    }
  },

  created () {
    // console.log('container::created::docid', this.$route.params)
    if (this.$route.params.docid && this.$route.params.lang) {
      this.loadIndex(this.$route.params.docid, this.$route.params.lang, this.$route.params.sectionid ? this.$route.params.sectionid : '')
    }
  },

  methods: {
    getItemByID (section, index) {
      if (index) {
        let item = index.find(function (elem) { return elem.id === section })
        if (item) {
          return item
        } else {
          for (let i = 0; i < index.length; i++) {
            let elem1 = index[i]
            if (elem1['content']) {
              let item = this.getItemByID(section, elem1['content'])
              return item || null
            }
          }
          return null
        }
      } else {
        return null
      }
    },

    loadIndex (docid, lang, section) {
      let self = this
      console.log('loadIndex')
      HTTP.get(`docs/${docid}/index.json`)
        .then(response => {
          self.docid = docid
          self.lang = lang
          self.section = section || ''
          self.index = this.prepareIndex(response.data, docid, lang)
          let showItem = null
          if (section) {
            showItem = self.getItemByID(section, self.index)
          } else {
            if (self.index && self.index.length > 0) {
              showItem = self.index[0]
            }
          }
          if (showItem) {
            self.setDocument(showItem)
          }
        })
        .catch(e => {
          self.docid = ''
          self.lang = ''
          self.section = ''
          self.index = []
          self.url = ''
          self.errors.push(e)
          console.error(e.message)
        })
    },

    prepareIndex (data, docid, lang, parent) {
      if (data) {
        return data.map(function (elem) {
          let _title = elem.title[lang] ? elem.title[lang] : ''
          let _url = elem.file[lang] ? `docs/${this.docid}/${elem.file[lang]}` : ''
          let _section = parent ? elem.id : ''
          let _href = _section
            ? `/doc/${docid}/section/${_section}/lang/${lang}`
            : `/doc/${docid}/lang/${lang}`

          return Object.assign(
            {},
            elem,
            {
              title: _title,
              url: _url,
              href: _href,
              content: this.prepareIndex(elem.content, docid, lang, elem)
            }
          )
        }, this)
      } else {
        return []
      }
    },

    onDocumentSelected (item) {
      this.setDocument(item)
      this.$router.push(item.href)
    },

    setDocument (document) {
      this.documnet = document
      this.url = this.documnet.url
    }

  },

  watch: {
    '$route': function (to, from) {
      // console.log('container::watch::docid', to.params)
      // if (to.params.docid !== this.docid || to.params.lang !== this.lang || to.params.sectionid !== this.section) {
      if (to.params.docid !== this.docid || to.params.lang !== this.lang) {
        this.loadIndex(to.params.docid, to.params.lang, to.params.sectionid ? to.params.sectionid : null)
      }
    }
  }

}
</script>

<style scoped>
    .doc-container{
        flex: 1 0 auto;
        height: 100%;
    }

    .doc-index {
        position: fixed;
        z-index: 10;

        top: 41px;
        left: 0;
        bottom: 0;

        width: 20vw;
        height: auto;
        min-height: 100vh;

        overflow-x: hidden;
        overflow-y: auto;

        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;

        margin: 10px 20px 10px 10px;

    }

    .doc-viewer {
        position: relative;
        top: 41px;
        left: 201px;
        height: auto;
        min-height: 100vh;
        width: 80vw;
        margin: 10px;
        padding: 10px 20px 10px 10px;

        border-left: lightgray solid 1px;
    }

</style>
