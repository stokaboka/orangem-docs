<template>
    <div class="doc-viewer" v-html="html"></div>
</template>

<script>

import api from '@/api'

export default {
  name: 'DocViewer',
  data: function () {
    return {
      html: '',
      state: api.state,
      api: api
    }
  },
  props: {

    doc: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: false
    },
    article: {
      type: String,
      required: false
    },
    lang: {
      type: String,
      required: true
    }
  },

  methods: {

    prepareData (data) {
      return data
    },

    load (url) {
      let self = this
      api.HTTP.get(url)
        .then(response => {
          self.html = self.prepareData(response.data)
        })
        .catch(e => {
          self.html = ''
          self.load(self.page_404)
        })
    }
  },

  computed: {

    article_url () {
      return api.getArticleUrl(this.doc, this.section, this.article, this.lang)
    },
    page_404 () {
      return api.get404PageUrl(this.lang)
    },

    page_empty () {
      return api.getEmptyPageUrl(this.lang)
    }
  },

  created () {

  },

  watch: {
    article_url: function (val, oldVal) {
      if (val) {
        this.html = api.loadUrl(val)
      } else {
        this.html = api.loadUrl(this.page_empty)
      }
    }
  }
}
</script>

<style scoped>

.doc-viewer{
    width: 80vw;
    text-align: start;
}
</style>
