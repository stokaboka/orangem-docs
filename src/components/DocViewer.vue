<template>
    <div class="doc-viewer" v-html="html"></div>
</template>

<script>

import {HTTP} from '@/api'

export default {
  name: 'DocViewer',
  data: function () {
    return {
      html: '',
      errors: []
    }
  },
  props: {
    url: {
      type: String,
      reguired: false
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
          self.errors.push(e)
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
