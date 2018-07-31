<template>
<div class="toolbar toolbar-layout toolbar-deco">
    <div class="toolbar-layout">
        <a href="/">
        <span>Orangem::DocViewer</span>
    </a>
        <div class="toolbal-title">{{title}}</div>
    </div>
    <nav class="nav">
        <router-link
                v-for="link in links"
                :key="link.id"
                :to="link.href"
                class="nav__item" >
            {{ link.title }}
        </router-link>
        <select
                v-model="selectedLang"
                title="Language"
                v-on:change="onChangeLang($event.target.value)">
            <option
                    v-for="lng in languages"
                    :key="lng.id"
                    :value="lng.id"
                    >
                {{lng.id}}
            </option>
        </select>
    </nav>
</div>
</template>

<script>
export default {
  name: 'DocToolbar',
  props: {
    title: {
      type: String,
      reguired: true
    },
    links: {
      type: Array,
      reguired: true
    },
    languages: {
      type: Array,
      reguired: true
    },
    lang: {
      type: String,
      reguired: true
    }
  },

  methods: {
    onChangeLang (value) {
      this.$emit('language-change', value)
    }
  },

  computed: {
    selectedLang: {
      get () {
        // console.log('DocToolbar::selectedLang', this.lang)
        return this.lang
      },
      set (val) {

      }
    }
  }

}
</script>

<style scoped>
    .toolbar {
        position: fixed;
        top: 0px;
        left: 5px;
        right: 5px;
        z-index: 100;
        height: 40px;
    }

    .toolbar-layout{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .toolbar-deco {
        background-color: #fff;
        border-bottom: 1px solid lightgray;
        transition: background-color 0.3s ease-in-out;
    }

    .toolbal-title {
        font-weight: bold;
        margin: auto 10px;
    }

    .nav {
    }

    .nav__item{
        margin: 5px;
        text-align: center;
    }

</style>
