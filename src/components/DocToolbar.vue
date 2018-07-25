<template>
<div class="toolbar">

</div>
</template>

<script>
export default {
  name: 'DocToolbar'
}
</script>

<style scoped>
    .toolbar {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 999;
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        background-color: azure;
    }
</style>
