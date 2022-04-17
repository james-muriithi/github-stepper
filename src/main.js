import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './style.scss';

Vue.config.productionTip = false

const app = new Vue({
  vuetify,
  render: h => h(App)
});

app.$mount('#app')
