import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './style.scss';
import store from './store'

Vue.config.productionTip = false

const app = new Vue({
  vuetify,
  store,
  render: h => h(App)
});

app.$mount('#app')
