import Vue from 'vue'
import Router from 'vue-router'
import DocContainer from './components/DocContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/doc/:docid/lang/:lang',
      component: DocContainer
    },
    {
      path: '/doc/:docid/section/:sectionid/lang/:lang',
      component: DocContainer
    }
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
