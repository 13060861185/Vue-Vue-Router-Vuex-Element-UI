import Vue from 'vue'
import VueRouter from 'vue-router';
import Router from 'vue-router'
// import Index from './views/Index.vue'
// import Login from './views/Login/index.vue'
// import Home from './views/Home/index.vue'
// import Goods from './views/Goods/index.vue'
// import Thanks from './views/Thanks/index.vue'
// import GoodsDetail from './views/GoodsDetail/index.vue'
// import User from './views/User/index.vue'

// 解决路由命名冲突的方法
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this,location).catch(error => error)
}

const Index = () => import('./views/Index.vue');
const Login = () => import('./views/Login/index.vue');
const Home = () => import('./views/Home/index.vue');
const Goods = () => import('./views/Goods/index.vue');
const Thanks = () => import('./views/Thanks/index.vue');
const GoodsDetail = () => import('./views/GoodsDetail/index.vue');
const User = () => import('./views/User/index.vue');

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect:'/home',
    name:'home',
    component: Index,
    children:[
      {
        path:'home',
        component:Home
      },
      {
        path:'goods',
        component:Goods
      },
      {
        path: 'thanks',
        component:Thanks
      },
      {
        path: 'goodsDetail',
        name: 'goodsDetail',
        component: GoodsDetail
      }
    ]
  },
  {
    path: '/login',
    name: "login",
    component:Login
  },
  {
    path: '/user',
    name: "user",
    component: User,
    meta:{
      // 需要守卫
      auth:true
    }
  }
]

export default new Router({
  mode:'history',
  routes
})
