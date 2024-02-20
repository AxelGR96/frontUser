import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  vuetify,
  created(){
    let api_url = process.env.VUE_APP_API_URL;
    this.$axios.defaults.baseURL = api_url;
  },
  render: h => h(App)
}).$mount('#app')
