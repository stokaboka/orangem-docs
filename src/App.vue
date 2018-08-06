<template>
  <div id="app" class="wrapper">
    <doc-toolbar
            :title="title"
            :links="links"
            :languages="languages"
            :lang="lang"
            @language-change="onLanguageChange"/>
    <router-view/>
  </div>
</template>

<script>
import DocFooter from './components/DocFooter'
import DocToolbar from './components/DocToolbar'
import { HTTP } from './api'

export default {
  name: 'app',
  components: {
    DocToolbar,
    DocFooter
  },

  data () {
    return {
      lang: 'en',
      docid: '',
      sectionid: '',
      languages: [{ id: 'en', icon: '' }, { id: 'ru', icon: '' }],
      rawLinks: [],
      links: [],
      title: '',
      errors: []
    }
  },

  methods: {
    getTitle (links, lang, docid) {
      if (docid) {
        let doc = links.find(function (element) {
          if (element.id === docid) {
            return element
          }
        }, this)

        if (doc) {
          return doc.title
        } else {
          return ''
        }
      } else {
        return ''
      }
    },

    getLinks (links, lang) {
      return links.map(function (link) {
        return {
          id: link.id,
          title: link.title[lang],
          href: `/doc/${link.id}/lang/${lang}`,
          target: link.target ? link.target : null
        }
      })
    },

    onLanguageChange (value) {
      this.lang = value
      if (this.sectionid) {
        this.$router.push(
          `/doc/${this.docid}/section/${this.sectionid}/lang/${this.lang}`
        )
      } else {
        this.$router.push(`/doc/${this.docid}/lang/${this.lang}`)
      }
    }
  },

  created () {
    let self = this
    if (this.$route.params.lang) {
      this.lang = this.$route.params.lang
    }

    if (this.$route.params.docid) {
      this.docid = this.$route.params.docid
    }
    HTTP.get('docs/index.json')
      .then(response => {
        self.rawLinks = response.data.sort((a, b) => a.order - b.order)
        self.links = self.getLinks(self.rawLinks, self.lang)
        self.title = self.getTitle(self.links, self.lang, self.docid)
      })
      .catch(e => {
        self.errors.push(e)
        console.error(e.message)
      })
  },

  watch: {
    $route: function (to, from) {
      // console.log('app::$route', to.params.lang, to.params.docid)

      if (to.params.lang) {
        this.lang = to.params.lang
      }

      if (to.params.docid) {
        this.docid = to.params.docid
      }

      if (to.params.sectionid) {
        this.sectionid = to.params.sectionid
      } else {
        this.sectionid = ''
      }

      this.links = this.getLinks(this.rawLinks, this.lang)
      this.title = this.getTitle(this.links, this.lang, this.docid)
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
