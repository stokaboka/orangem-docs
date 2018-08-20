<template>
<div class="toolbar-layout toolbar-deco">
    <div class="toolbar-layout">
        <a href="/">
        <span>{{logo}}</span>
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
import {api} from '../api'

export default {
  name: 'DocToolbar',

  data: function () {
    return {
      api
    }
  },

  props: {
    logo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    links: {
      type: Array,
      required: false,
      default: function () {
        return []
      }
    },
    languages: {
      type: Array,
      required: true
    },
    lang: {
      type: String,
      required: true,
      default: 'en'
    }
  },

  methods: {
    onChangeLang (value) {
      this.api.setLang(value)
    }
  },

  computed: {
    selectedLang: {
      get () {
        return this.lang
      },
      set (val) {
      }
    }
  }

}
</script>

<style scoped>

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
