const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.loadURL('http://localhost:3000'); // Donde se ejecuta Next.js en desarrollo
    } 
    else {
        mainWindow.loadFile(path.join(__dirname, '../out/index.html')); // En producción, carga el HTML generado
    };

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});