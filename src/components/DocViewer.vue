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

    document: {
      type: Object,
      required: true
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

      // let self = this
      // api.HTTP.get(url)
      //   .then(response => {
      //     self.html = self.prepareData(response.data)
      //   })
      //   .catch(e => {
      //     self.html = ''
      //     self.load(self.page_404)
      //   })
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
