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
  document.addEventListener('deviceready', showMyFirstNotification.bind(this),
    false);
  document.addEventListener('deviceready', showDevice.bind(this), false);
  document.addEventListener('deviceready', createAPersistentFile.bind(this),
    false);
}

function createAPersistentFile() {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false },
      function(fileEntry) {

        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        writeFile(fileEntry, null);

      }, onErrorCreateFile);

  }, onErrorLoadFs);
}

function onErrorLoadFs(err) {
  console.log('error loading fs', err)
}

function onErrorCreateFile(err) {
  console.log('error creating file', err)
}

function readFile(fileEntry) {

  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onloadend = function() {
      console.log("Successful file read: " + this.result);
      displayFileData(fileEntry.fullPath + ": " + this.result);
    };

    reader.readAsText(file);

  }, onErrorReadFile);
}

function displayFileData(data) {
  console.log('file-data', data);
}

function onErrorReadFile(err) {
  console.log('error in reading file...', err);
}

function writeFile(fileEntry, dataObj, isAppend) {
  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function(fileWriter) {

    fileWriter.onwriteend = function() {
      console.log("Successful file read...");
      readFile(fileEntry);
    };

    fileWriter.onerror = function(e) {
      console.log("Failed file read: " + e.toString());
    };

    // If we are appending data to file, go to the end of the file.
    if(isAppend) {
      try {
        fileWriter.seek(fileWriter.length);
      } catch (e) {
        console.log("file doesn't exist!");
      }
    }
    fileWriter.write(dataObj);
  });
}

function showDevice() {
  // alert(`
  //   ${device.cordova},
  //   ${device.model},
  //   ${device.platform},
  //   ${device.uuid},
  //   ${device.version},
  //   ${device.manufacturer},
  //   ${device.isVirtual},
  //   ${device.serial}
  //   `
  // );
}

function showMyFirstNotification() {

}

function initializeVue() {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}
