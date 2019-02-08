// CSS ASSETS
import "framework7/css/framework7.bundle.css";
import 'framework7-icons/css/framework7-icons.css'
// JS ASSETS
import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
// APP ASSETS
import App from './App.vue';

Framework7.use(Framework7Vue);
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
