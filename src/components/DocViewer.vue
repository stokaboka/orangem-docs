<template>
    <div class="doc-viewer" v-html="html"></div>
</template>

<script>

import {HTTP} from '@/api'

export default {
  name: 'DocViewer',
  data: function () {
    return {
      html: ''
      // errors: []
    }
  },
  props: {
    docid: {
      type: String,
      reguired: true
    },
    document: {
      type: Object,
      reguired: true
    },

    lang: {
      type: String,
      reguired: true
    }
  },

  methods: {

    prepareData (data) {
      return data
    },

    load (url) {
      let self = this
      HTTP.get(url)
        .then(response => {
          self.html = self.prepareData(response.data)
        })
        .catch(e => {
          self.html = ''
          // self.errors.push(e)
          // console.error(e)
          self.load(self.page_404)
        })
    }
  },

  computed: {
    page_404 () {
      return `docs/404/${this.lang}/404.html`
    },

    page_empty () {
      return `docs/404/${this.lang}/empty.html`
    }
  },

  created () {

  },

  watch: {
    document: function (val, oldVal) {
      if (val.url) {
        this.load(val.url)
      } else {
        this.load(this.page_empty)
      }
    },

    lang: function (val, oldVal) {
      if (this.document) {
        let _url = this.document.file[val] ? `docs/${this.docid}/${this.document.file[val]}` : ''
        if (_url) {
          this.load(_url)
        } else {
          this.load(this.page_empty)
        }
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
