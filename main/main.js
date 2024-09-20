const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { exec } = require('child_process');  // Para ejecutar comandos de terminal

let win;
let nextServer;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Opcional
      nodeIntegration: true,
    },
  });

  // Cargar la aplicación Next.js en Electron
  win.loadURL('http://localhost:3000');  // Cambia esto si tienes un puerto diferente
}

// Inicia el servidor de Next.js y luego crea la ventana de Electron
app.whenReady().then(() => {
  nextServer = exec('npm run start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al iniciar el servidor de Next.js: ${error}`);
      return;
    }
    console.log(`Servidor de Next.js en ejecución: ${stdout}`);
  });

  // Espera 5 segundos para asegurarte de que el servidor esté listo
  setTimeout(() => {
    createWindow();
  }, 5000);  // Ajusta el tiempo si es necesario

  nextServer.stdout.pipe(process.stdout);
  nextServer.stderr.pipe(process.stderr);
});


// Handle file open requests
ipcMain.handle('open-file', async (event, filePath) => {
    shell.openPath(filePath);
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {

    exec('npm run stop', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error al detener el servidor de Next.js: ${error}`);
            return;
        }
        console.log(`Servidor de Next.js detenido: ${stdout}`);
    });

    if (nextServer) {
        nextServer.kill('SIGTERM');  // Matar el proceso
        nextServer.on('exit', (code) => {
            console.log(`Servidor de Next.js detenido con código ${code}`);
        });
    }
    app.quit();
  }
});

