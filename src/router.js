import Vue from 'vue'
import Router from 'vue-router'
import DocContainer from './components/DocContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/docid/:docid/lang/:lang',
      component: DocContainer
    },
    {
      path: '/docid/:docid/section/:sectionid/lang/:lang',
      component: DocContainer
    }
  ]
})
