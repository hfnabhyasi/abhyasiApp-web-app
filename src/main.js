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

function cb_deviceReady() {
    initialize_VueApp();
    set_deviceInfoOnStore();
    // writeFile_cordova();
    // writeToFile_persistent2('example7', { foo: 'bars' });
    // test_code();
    const data = new Blob([JSON.stringify({message:'You should log out now...'}, null, 2)], {type: 'application/json'})
    write_persistentFile('my-new-file5.json', data);
    // showMyFirstNotification();
    // createAPersistentFile();
    // test();
}

function setup_deviceReadyListener() {
    document.addEventListener('deviceready', cb_deviceReady, false);
}

function set_deviceInfoOnStore() {
    if(device) store.commit('env/SET_CORDOVA_DEVICE_INFO', device);
    else throw "device is not availble.";
}

// TEST CODE BELOW :
// WIP
async function test_code() {
    const fileName = 'example10.json'
    try {
        // const filePath = cordova.file.dataDirectory + fileName;
        const fileContent = await get_fileContent(fileName);
        alert(`fileContent : ${JSON.stringify(fileContent)}`);
    } catch (e) {
        alert(`error in test-code : ${e}`);
    }
}

function promise_fileWriter(file) {
    return new Promise((resolve, reject) => {
        try {
            file.createWriter(resolve);
        } catch (e) {
            alert(`promise_fileWriter error : ${JSON.stringify(e)}`)
            reject(e);
        }
    });
}

function readFromFile(fileName, cb) {
    var pathToFile = cordova.file.dataDirectory + fileName;
    window.resolveLocalFileSystemURL(pathToFile, function(fileEntry) {
        fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
                cb(JSON.parse(this.result));
            };

            reader.readAsText(file);
        }, errorHandler.bind(null, fileName));
    }, errorHandler.bind(null, fileName));
}

async function write_persistentFile(fileName, blob) {
    try {
        const dirFS = await promise_dirFS();
        const fileFS = await promise_fileFS(dirFS, fileName);
        const fileWriter = await promise_fileWriter(fileFS);
        fileWriter.onwriteend = async evt => {
            const file = await promise_file(fileFS);
            const fileContent = await promise_fileContent(file);
            alert(JSON.parse(fileContent).message);
        };
        fileWriter.write(blob);
    } catch (err) {
        alert(`write_persistentFile error : ${JSON.stringify(err)}`)
    }
}

function cordovaAlert(name, item) {
    alert(
        `
    ${name} : ${JSON.stringify(item)},
    type: ${typeof item}
  `
    );
}

async function get_fileContent(fileName) {
    try {
        const dirFS = await promise_dirFS();
        const fileFS = await promise_fileFS(dirFS, fileName);
        const file = await promise_file(fileFS);
        const fileContent = await promise_fileContent(file);
        return fileContent;
    } catch (err) {
        alert(`unable to get file content ${JSON.stringify(err)}`);
    }
}

async function promise_file(fileFS) {
    try {
        return new Promise((resolve, reject) => {
            fileFS.file(resolve)
        });
    } catch (e) {
        alert(`promise_file error : ${e}`)
    }
}

function promise_fileFS(fsURL, fileName) {
    return new Promise((resolve, reject) => {
        try {
            fsURL.getFile(fileName, { create: true }, resolve);
        } catch (e) {
            alert(`promise_file failed : ${e}`);
        }
    });
}

function promise_dirFS() {
    return new Promise((resolve, reject) => {
        try {
            window.resolveLocalFileSystemURL(
                cordova.file.dataDirectory,
                resolve,
                reject
            )
        } catch (e) {
            alert(`promise_dirFS failed : ${e}`);
        }
    });
}

function promise_fileContent(file) {
    return new Promise((resolve, reject) => {
        let result;
        try {
            const reader = new FileReader();
            reader.onloadend = evt => {
                const { target } = evt;
                if(target._error) throw target._error;
                else resolve(target.result);
            }
            reader.readAsText(file);
        } catch (err) {
            alert(`promise_fileContent error : ${JSON.stringify(err)}`)
        }
    });
}
