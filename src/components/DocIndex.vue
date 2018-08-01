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
import DocIndexComponent from './DocIndexComponent'
export default {
  name: 'DocIndex',
  components: {DocIndexComponent},
  props: {
    index: {
      type: Array,
      value: []
    },
    lang: {
      type: String,
      required: true
    }
  },

  methods: {
    onDocumentSelected (item) {
      console.log('***', item)
      this.$emit('document-selected', item)
    }
  }
}
</script>

<style scoped>

</style>
