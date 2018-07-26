<template>
<div class="toolbar toolbar-layout toolbar-deco">
    <a href="/">
        <span>Orangem::DocViewer</span>
    </a>
    <div class="toolbal-title">{{title}}</div>
    <nav class="nav nav__position-right">
        <router-link
                v-for="link in links"
                :key="link.id"
                :to="link.href"
                class="nav__item" >
            {{ link.title }}
        </router-link>
    </nav>
</div>
</template>

<script>
export default {
  name: 'DocToolbar',
  data () {
    return {
      title: 'Help!!!',
      links: [
        {id: 0, title: 'About', href: '/', target: null},
        {id: 1, title: 'Technology', href: '#technology', target: null},
        {id: 2, title: 'Events', href: '#events', target: null},
        {id: 3, title: 'Projects', href: '#projects', target: null}
      ]
    }
  }
}
</script>

<style scoped>
    .toolbar {
        position: fixed;
        top: 0;
        z-index: 100;
        width: 100%;
        height: 40px;
    }

    .toolbar-layout{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
    }

    .toolbar-deco {
        background-color: #fff;
        padding: 10px 60px;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
        transition: background-color 0.3s ease-in-out;
    }

    .toolbal-title {
        font-weight: bold;
        margin: auto 10px;
    }

    nav {
        list-style-type: none;
        margin: 0;
        padding: 0;
        position: absolute;
        right: 30px;
        top: 10px;
        height: 40px;
        line-height: 40px;
    }

</style>
