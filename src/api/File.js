import store from '../store';

var fileData;
var savedFileEntry = {};
var fileName = 'test-451.json';

function createNewFileAndSetupData() {
  promise_getPersistentDirectoryEntry()
    .then(promise_fileEntry.bind(null, fileName, { create: true }))
    .then(promise_fileWriter)
    .then(edit_content)
    .then(promise_writeContent)
    .then(promise_getPersistentDirectoryEntry)
    .then(promise_fileEntry.bind(null, fileName, { create: false }))
    .then(promise_file)
    .then(promise_fileContent)
    .then(evt => store.commit('persistentData/SET_TEST_DATA_ON_STORE', JSON.parse(evt.target.result)))
    .catch(err => alert(JSON.stringify(err)));
}

export default function writePersistentFileData() {
    promise_getPersistentDirectoryEntry()
        .then(promise_fileEntry.bind(null, fileName, { create: false }))
        .then((fileEntry) => {
          const ERR_CODE = {
            FILE_NOT_FOUND: 1
          };
          if(fileEntry.code == ERR_CODE.FILE_NOT_FOUND) {
            createNewFileAndSetupData()
          } else {
            return fileEntry
          }
        })
        // if file doesn't exist do
        .then(save_fileEntry)
        .then(promise_file)
        .then(promise_fileContent)
        .then(save_fileData)
        .then(remove_fileEntry)
        // skip to
        .then(promise_getPersistentDirectoryEntry)
        .then(promise_fileEntry.bind(null, fileName, { create: true }))
        .then(promise_fileWriter)
        .then(edit_content)
        .then(promise_writeContent)
        .then(promise_getPersistentDirectoryEntry)
        .then(promise_fileEntry.bind(null, fileName, { create: false }))
        .then(promise_file)
        .then(promise_fileContent)
        .then(evt => store.commit('persistentData/SET_TEST_DATA_ON_STORE', JSON.parse(evt.target.result)))
        .catch(err => console.log(err));
}

function logit(text, obj) {
    console.log(`${text} : `, obj);
}

function promise_getPersistentDirectoryEntry() {
    return new Promise((resolve, reject) => {
        try {
            window.resolveLocalFileSystemURL(cordova.file.dataDirectory, resolve, reject);
        } catch (e) {
            reject(e);
            throw e;
        }
    });
}

function promise_fileEntry(fileName, config, dataDirectory) {
    return new Promise((resolve, reject) => {
        try {
            dataDirectory.getFile(fileName, config, resolve, resolve);
        } catch (e) {
            reject(e);
            throw e;
        }
    })
}

function promise_file(fileEntry) {
    return new Promise((resolve, reject) => {
        try {
            fileEntry.file(resolve);
        } catch (e) {
            reject(e);
            throw "get_fileFromFileObject error : " + e;
        }
    });
}

function promise_fileContent(file) {
    return new Promise((resolve, reject) => {
        try {
            var reader = new FileReader();
            reader.onloadend = resolve;
            reader.onerror = reject;
            reader.readAsText(file);
        } catch (e) {
            reject(e);
            throw e;
        }
    });
}

function save_fileData(fileLoadEvent) {
    try {
        fileData = fileLoadEvent.target.result;
        return fileLoadEvent;
    } catch (e) {
        throw e;
    }
    return result;
}

function save_fileEntry(fileEntry) {
    savedFileEntry = fileEntry;
    return fileEntry;
}

function remove_fileEntry() {
    savedFileEntry.remove();
}

function promise_fileWriter(fileEntry) {
    try {
        return new Promise((resolve, reject) => {
            fileEntry.createWriter(resolve);
        })
    } catch (e) {
        reject(e);
        throw "error in promise_fileEntry : " + e;
    }
}

function promise_writeContent(obj) {
    return new Promise((resolve, reject) => {
        try {
            obj.fileWriter.onwriteend = resolve;
            obj.fileWriter.write(obj.data);
        } catch (e) {
            reject(e)
            throw e;
        }
    });
}

function edit_content(fileWriter) {
    if(fileData) {
        var savedData = JSON.parse(fileData);
        savedData[new Date().getTime()] = new Date().toString();
        var content = new Blob([JSON.stringify(savedData, null, 2)], { type: 'application/json' });
        return { data: content, fileWriter }
    } else {
        var content = new Blob([JSON.stringify({ message: 'first data for this file...' }, null, 2)], { type: 'application/json' });
        return { data: content, fileWriter }
    }
}
