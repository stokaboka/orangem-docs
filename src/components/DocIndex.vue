<template>
    <aside class="doc-index">
        <doc-index-component
                v-for="item in index"
                :key="item.id"
                :item="item"
                @document-selected="onDocumentSelected">
        </doc-index-component>
    </aside>
</template>

<script>
import api from '@/api'
import DocIndexComponent from './DocIndexComponent'
export default {
  name: 'DocIndex',
  components: {DocIndexComponent},
  props: {
    index: {
      type: Array,
      value: []
    },
    doc: {
      type: String,
      required: false
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
      required: false
    }
  },

  methods: {
    onDocumentSelected (item) {
      this.$emit('document-selected', item)
    }
  },

  created () {
    try {
      let response = api.loadUrl(`docs/${this.doc}/index.json`)
      this.index = api.prepareIndex(response, this.doc, this.lang)
    } catch (e) {
      console.log('*** DocIndex load index error ', e)
    }
  },

  watch: {
    'doc': function (val, oldVal) {
      try {
        let response = api.loadUrl(`docs/${val}/index.json`)
        this.index = api.prepareIndex(response, val, this.lang)
      } catch (e) {
        console.log('*** DocIndex load index error ', e)
      }
    }

  }
}
</script>

<style scoped>

</style>
