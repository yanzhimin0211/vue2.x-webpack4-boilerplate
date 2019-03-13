import Vue from 'vue'
import Router from 'vue-router'
const HelloWorld = () => import( /* webpackChunkName: "HelloWorld" */ '@/components/HelloWorld');
const Test = () => import( /* webpackChunkName: "test" */ '@/components/Test');
const Home = () => import( /* webpackChunkName: "home" */ '@/home/Home.vue');

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
