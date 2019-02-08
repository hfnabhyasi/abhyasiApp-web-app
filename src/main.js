import Vue from 'vue'
// import App from './App.vue'

Vue.config.productionTip = false
alert(typeof document);
if (process.env.NODE_ENV === 'production') {
  document.addEventListener('deviceready', initializeVue.bind(this), false);
} else {
  initializeVue();
}

function initializeVue() {
  new Vue({
    render: h => h('h1', 'The Vue Cordova App..'),
  }).$mount('#app')
}
