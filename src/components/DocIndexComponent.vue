<template>
    <div>
        <h3>
            <router-link
                    v-if="item.href"
                    :key="item.id"
                    :to="item.href">
                {{ item.title }}
            </router-link>
            <span v-else-if="item.href">{{item.title}}</span>

        </h3>
    <ul>
        <li v-for="child in item.content" :key="child.id">
            <router-link
                    v-if="child.href"
                    :key="child.id"
                    :to="child.href">
                {{ child.title }}
            </router-link>
            <span v-else-if="child.href">{{child.title}}</span>
        </li>

    </ul>
    </div>
</template>

<script>

/*
            <a  v-if="item.url" :href="item.href" @click.prevent="onIndexClick($event, item)">{{item.title}}</a>
            <span v-else-if="item.url">{{item.title}}</span>

        <li v-for="child in item.content" :key="child.id">
            <a :href="child.href"
               @click.prevent="onIndexClick($event, child)">
                {{child.title}}
            </a>
        </li>

 */

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
      // console.log('***', item)
      this.$emit('document-selected', item)
    }
  }
}
</script>

<style scoped>
h3, ul, li {
    text-align: start;
    padding: 0;
    margin: 5px 0px 3px 0px;
}
</style>
