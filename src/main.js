import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import BootstrapVue from 'bootstrap-vue'
//import './directives/Transform';
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.http.options.root = 'https://frozen-spire-43188.herokuapp.com';
//Vue.http.options.root = 'http://localhost:8081';
const router = new VueRouter({ 
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

