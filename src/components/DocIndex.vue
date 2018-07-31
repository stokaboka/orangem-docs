<template>
    <aside class="doc-index">
        <ul>
            <li v-for="item in index" :key="item.id">
                <a :href="item.url" v-on:click.prevent="onIndexClick($event, item)">{{item.title}}</a>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
  name: 'DocIndex',

  props: {
    index: {
      type: Array,
      value: []
    }
  },

  methods: {
    onIndexClick ($event, item) {
      console.log('***', item)
      this.$emit('document-selected', item)
    }
  }
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

    padding: 10px 20px 10px 10px;

    border-right: lightgray solid 1px;
}
</style>
