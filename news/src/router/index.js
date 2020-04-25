import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "../components/Login.vue";
import Index from "../components/Index.vue";
import Admin from "../components/Admin.vue";
import Tourist from "../components/Tourist.vue";


Vue.use(VueRouter)


const routes = [
  { path: '/', name: Login, component: Login, },
  { path: '/index', name: Index, component: Index },
  { path: '/admin', name: Admin, component: Admin },
  { path: '/tourist', name: Tourist, component: Tourist },

]
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
