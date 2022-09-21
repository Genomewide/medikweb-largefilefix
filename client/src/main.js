import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import store from './store/index.js' // INDEX.JS IS NOT NECCESARY BUT I PUT IT SO I WOULD KNOW
// import HighchartsVue from 'highcharts-vue'
// import { application } from 'express'

import JsonExcel from "vue-json-excel";
 
Vue.component("downloadExcel", JsonExcel);

Vue.config.productionTip = false

// Vue.component('my-component', MyComponent);
// Vue.component('export-excel', excel);


new Vue({
  router,
  Vuex,
  store,
  // HighchartsVue,
  render: h => h(App)
}).$mount('#app')

// App.use(excel)

// Vue.use(Vuex)

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

// console.log("testing main.js")

// store.commit('increment')

// console.log(store.state.count) // -> 1