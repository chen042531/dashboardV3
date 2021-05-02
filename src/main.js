import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'jquery/dist/jquery.min.js'
// import 'bootstrap/dist/js/bootstrap.min.js'
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})