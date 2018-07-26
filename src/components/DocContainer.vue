<template>
    <div>
        <doc-index/>
        <doc-viewer/>
    </div>
</template>

<script>
import DocIndex from './DocIndex'
import DocViewer from './DocViewer'

export default {
  name: 'DocContainer',
  components: {
    DocIndex,
    DocViewer
  }
}
</script>

<style scoped>

</style>
