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
    }
  },
  props: {
    url: {
      type: String,
      reguired: false
    }
  },

  methods: {
    load (url) {
      HTTP.get(url)
        .then(response => {
          this.html = this.prepareData(response.data)
        })
        .catch(e => {
          this.html = ''
          this.errors.push(e)
          console.error(e)
        })
    }
  },

  watch: {
    url: function (val, oldVal) {
      this.load(val)
    }
  }
}
</script>

<style scoped>
.doc-viewer{
    width: 100%;
    height: 100%;
}
</style>
