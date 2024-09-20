const { contextBridge, ipcRenderer } = require("electron");

console.log('Se carga preload.js');

contextBridge.exposeInMainWorld('electron', {
    openFile: (filePath) => ipcRenderer.invoke('open-file', filePath)
});