<template>
    <aside class="doc-index">

    </aside>
</template>

<script>
export default {
  name: 'DocIndex'
}
</script>

<style scoped>
.doc-index {
    position: absolute;
    z-index: 10;
    top: 61px;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
}
</style>
