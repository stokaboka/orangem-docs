<template>
    <div>
    <router-link
            v-for="link in links"
            :key="link.id"
            :to="link.href"
            class="nav__item" >
        {{ link.title }}
    </router-link>
    </div>
</template>

<script>
export default {
  name: 'DocFullIndex',
  props: {
    links: {
      type: Array,
      required: true,
      value: []
    }
  }
}
</script>

<style scoped>

</style>
