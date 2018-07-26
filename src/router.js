import Vue from 'vue'
import Router from 'vue-router'
import DocContainer from './components/DocContainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/did/:docid',
      component: DocContainer
    }
  ]
})
