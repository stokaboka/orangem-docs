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
import {api} from '@/api'
import DocIndexComponent from './DocIndexComponent'
export default {
  name: 'DocIndex',
  components: {DocIndexComponent},

  data () {
    return {
      index: []
    }
  },

  props: {

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
    async loadIndex (doc, lang) {
      try {
        this.index = await api.loadDocIndex(doc, lang)
      } catch (e) {
        // TODO show global index
        console.log('DocIndex::loadIndex', e)
        this.index = []
      }
    },
    onDocumentSelected (item) {
      this.$emit('document-selected', item)
    }
  },

  async created () {
    this.loadIndex(this.doc, this.lang)
  },

  watch: {
    doc: function (val, oldVal) {
      this.loadIndex(val, this.lang)
    },

    lang: function (val, oldVal) {
      this.loadIndex(this.doc, val)
    }

  }
}
</script>

<style scoped>

</style>
