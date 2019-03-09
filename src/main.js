// Vendor CSS
import "framework7/css/framework7.bundle.css";
import 'framework7-icons/css/framework7-icons.css'
// Vendor Libs
import Vue from 'vue';
import Framework7 from 'framework7/framework7.esm.bundle.js'
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js'
import Vuex from 'vuex';
// APP ASSETS
import App from './App.vue';
import store from './store/index.js';

import writePersistentFileData from './api/File.js';

Framework7.use(Framework7Vue);
setupVueConfig();
if(process.env.NODE_ENV === 'production') setup_deviceReadyListener();
else initialize_VueApp();

// private functions
function initialize_VueApp() {
    new Vue({
        store,
        render: h => h(App)
    }).$mount('#app')
}

function setupVueConfig() {
    Vue.config.productionTip = false;
}

function setup_deviceReadyListener() {
    document.addEventListener('deviceready', cb_deviceReady, false);
}

function cb_deviceReady() {
    initialize_VueApp();
    set_cordova_deviceInfoOnStore();
    set_cordova_fileInfoOnStore();
    writePersistentFileData();
    // showMyFirstNotification();
    // createAPersistentFile();
    // test();
}

function set_cordova_deviceInfoOnStore() {
    if(device) store.commit('env/SET_CORDOVA_DEVICE_INFO', device);
    else throw "cordova device is not availble.";
}

function set_cordova_fileInfoOnStore() {
    if(cordova && cordova.file) store.commit('env/SET_CORDOVA_FILE_INFO', cordova.file);
    else throw "cordova file is not available...";
}
