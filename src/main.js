import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import {getStore} from '../src/utils/storage'


// 使用vue-lazylocad
import VueLazyLoad from 'vue-lazyload';
Vue.use(VueLazyLoad);

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error:'../public/static/images/error.png',
  loading: '../public/static/images/load.gif',
  attempt:1
})
Vue.config.productionTip = false
// 挂载到axios到vue的原型，由于继承性，所有的组件都可以使用this.$http
import axios from 'axios';
Vue.prototype.$http = axios;
axios.interceptors.request.use(config => {
  const token = getStore('token');
  if(token) {
    // 表示用户已登录
    config.headers.common['Authorization'] = token;
  }
  return config
},error => {
  return Promise.reject(error);
})
// 守卫
router.beforeEach((to, from, next) => {

  axios.post('/api/validate',{}).then(res => {
    let data = res.data;
    if(data.state !== 1){
      if(to.matched.some(record => record.meta.auth)){
        // 用户未登录 需要跳转登录页面
        next({
          path: '/login',
          query:{
            redirect:to.fullPath
          }
        })
      }else{
        next();
      }
    }else{
      // 保存用户的信息
      store.commit('ISLOGIN',data);
      if(to.path ==='/login') {
        router.push({
          path: '/'
        })
      }
    }
  }).catch(error => {
    console.log(error);
  })
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
