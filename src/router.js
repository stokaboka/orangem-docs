import Vue from 'vue'
import Router from 'vue-router'

import DocIndex from './components/DocIndex'
import DocViewer from './components/DocViewer'
import DocFullIndex from './components/DocFullIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DocFullIndex
    },
    {
      path: '/doc/:doc/lang/:lang',
      components: { 'doc-index': DocIndex, 'doc-viewer': DocViewer },
      props: { 'doc-index': true, 'doc-viewer': true }
    },
    {
      path: '/doc/:doc/article/:article/lang/:lang',
      components: { 'doc-index': DocIndex, 'doc-viewer': DocViewer },
      props: { 'doc-index': true, 'doc-viewer': true }
    },
    {
      path: '/doc/:doc/article/:article/section/:section/lang/:lang',
      components: { 'doc-index': DocIndex, 'doc-viewer': DocViewer },
      props: { 'doc-index': true, 'doc-viewer': true }
    },
    { path: '*', redirect: '/' }
  ],

  scrollBehavior (to, from, savedPosition) {
    // возвращаем требуемую позицию прокрутки
    if (to.hash) {
      return {
        selector: `[id='${to.hash}']`,
        offset: { y: 80 }
      }
    } else {
      // return { y: 0 }
      return null
    }
  }

})
