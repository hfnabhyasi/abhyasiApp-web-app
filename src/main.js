import Vue from 'vue';
import App from './App.vue';

setupVueConfig();
if(process.env.NODE_ENV === 'production') setDeviceReadyListener();
else initializeVue();

// private functions
function setupVueConfig() {
  Vue.config.productionTip = false;
}

function setDeviceReadyListener() {
  document.addEventListener('deviceready', initializeVue.bind(this), false);
}

function initializeVue() {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}
