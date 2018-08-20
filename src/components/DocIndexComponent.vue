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

export default {
  name: 'DocIndexComponent',
  props: {
    item: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>
h3, ul, li {
    text-align: start;
    /*padding: 0;*/
    margin: 5px 0px 3px 0px;
}
</style>
