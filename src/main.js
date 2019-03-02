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
if(process.env.NODE_ENV === 'production') setDeviceReadyListener();
else initializeVue();

// private functions
function setupVueConfig() {
    Vue.config.productionTip = false;
}

function setDeviceReadyListener() {
    document.addEventListener('deviceready', initializeVue.bind(this), false);
    // document.addEventListener('deviceready', showMyFirstNotification.bind(this),
    //   false);
    // document.addEventListener('deviceready', showDevice.bind(this), false);
    // document.addEventListener('deviceready', createAPersistentFile.bind(this), false);
    document.addEventListener('deviceready', test.bind(this), false);
}

function writeFileToExternalDirectory() {
    window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory,
        resolvedLocalFileSystemCb, errorHandler);
}

function resolvedLocalFileSystemCb(dirEntry) {
    const dirName = 'test-directory';
    dirEntry.getDirectory(dirName, { create: true },
        dirEntryCb, errorHandler)
}

function errorHandler(err) {
    alert('error : ', err);
}

function dirEntryCb(dirEntry) {
    const fileName = 'test-file.json';
    dirEntry.getFile(fileName, { create: true },
        function(fileEntry) {
            alert(
                "Create the file: " + fileEntry
                .name + ', ' + fileEntry.fullPath
            );
        });
}

function test() {
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



    function writeToFile1(fileName, data) {
        data = JSON.stringify(data, null, '\t');
        window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(
            directoryEntry) {
            directoryEntry.getFile(fileName, { create: true }, function(
                fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        // for real-world usage, you might consider passing a success callback
                        readFromFile('example.json',
                            function(data) {
                                alert('data : ' +
                                    JSON.stringify(
                                        data
                                    ));
                            })
                    };

                    fileWriter.onerror = function(e) {
                        // you could hook this up with our global error handler, or pass in an error callback
                        alert('Write failed: ' + e.toString());
                    };

                    var blob = new Blob([data], { type: 'text/plain' });
                    fileWriter.write(blob);
                }, errorHandler.bind(null, fileName));
            }, errorHandler.bind(null, fileName));
        }, errorHandler.bind(null, fileName));
    }

    function errorHandler(fileName) {
        alert('fileName error : ' + fileName);
    }
    writeToFile1('example.json', { foo: 'bar' });
    writeFileToExternalDirectory();
}

function test1() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
        requestFileSystemCallback);
}

function requestFileSystemCallback(fs) {
    const config = {
        create: true,
        exclusive: false
    };
    fs.root.getFile("newPersistentFile.txt", config, getFileCallback);
}

function createWriterCallback(fileWriter) {
    fileWriter.onwriteend = onWriteEndCallback;
    fileWriter.write({ foo: 'bar' });
}

function onWriteEndCallback() {
    alert('writeend trigerred');
    readFile(fileEntry);
}

function getFileCallback(fileEntry) {
    alert(fileEntry.isFile);
    fileEntry.createWriter(createWriterCallback);
    /*
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
    */
}

function createAPersistentFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {

        console.log('file system open: ' + fs.name);
        fs.root.getFile("newPersistentFile.txt", {
                create: true,
                exclusive: false
            },
            function(fileEntry) {

                console.log("fileEntry is file?" + fileEntry.isFile
                    .toString());
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
            alert("Successful file read: " + this.result);
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
        store,
        render: h => h(App)
    }).$mount('#app')
}
