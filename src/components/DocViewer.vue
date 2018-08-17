<template>
    <div class="doc-viewer" v-html="html"></div>
</template>

<script>

import {api} from '@/api'

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

    async loadHTML (url) {
      this.html = await api.loadUrl(url)
      console.log(this.html)
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
        this.loadHTML(val)
      } else {
        this.loadHTML(this.page_empty)
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
