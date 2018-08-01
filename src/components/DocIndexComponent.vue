<template>
    <div>
        <h3>
            <a  v-if="item.url" :href="item.url" @click.prevent="onIndexClick($event, item)">{{item.title}}</a>
            <span v-else-if="item.url">{{item.title}}</span>
        </h3>
    <ul>
        <li v-for="child in item.content" :key="child.id">
            <a :href="child.url"
               @click.prevent="onIndexClick($event, child)">
                {{child.title}}
            </a>
        </li>
    </ul>
    </div>
</template>

<script>
export default {
  name: 'DocIndexComponent',
  props: {
    item: {
      type: Object,
      require: true
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
h3, ul, li {
    text-align: start;
}
</style>
