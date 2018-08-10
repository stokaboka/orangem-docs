<template>
    <div class="doc-container">
        <doc-index class="doc-index"
                :index="index"
                :lang="lang"
                @document-selected="onDocumentSelected"
        />
        <doc-viewer class="doc-viewer"
                    :document="documnet"
                    :lang="lang"
        />
    </div>
</template>

<script>

import api from '@/api'
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
      doc: '',
      documnet: null,
      section: '',
      lang: '',
      index: [],
      url: '',
      errors: []
    }
  },

  created () {
    // console.log('container::created::doc', this.$route.params)
    if (this.$route.params.doc && this.$route.params.lang) {
      this.loadIndex(this.$route.params.doc, this.$route.params.lang, this.$route.params.section ? this.$route.params.section : '')
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

    loadIndex (doc, lang, section) {
      let self = this
      // console.log('loadIndex')
      api.HTTP.get(`docs/${doc}/index.json`)
        .then(response => {
          self.doc = doc
          self.lang = lang
          self.section = section || ''
          self.index = this.prepareIndex(response.data, doc, lang)
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
          self.doc = ''
          self.lang = ''
          self.section = ''
          self.index = []
          self.url = ''
          // self.errors.push(e)
          // console.log(e.message)
        })
    },

    prepareIndex (data, doc, lang, parent) {
      if (data) {
        return data.map(function (elem) {
          let _title = elem.title[lang] ? elem.title[lang] : ''
          let _url = elem.file[lang] ? `docs/${this.doc}/${elem.file[lang]}` : ''
          let _section = parent ? elem.id : ''
          let _href = _section
            ? `/doc/${doc}/section/${_section}/lang/${lang}`
            : `/doc/${doc}/lang/${lang}`

          return Object.assign(
            {},
            elem,
            {
              title: _title,
              url: _url,
              href: _href,
              content: this.prepareIndex(elem.content, doc, lang, elem)
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
      if (to.params.doc !== this.doc || to.params.lang !== this.lang) {
        this.loadIndex(to.params.doc, to.params.lang, to.params.section ? to.params.section : null)
      }
    }
  }

}
</script>

<style scoped>
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
        /*.footer {*/
            /*order: 3;*/
        /*}*/
    }

</style>
