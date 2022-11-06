// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
import { app, BrowserWindow, ipcMain, Menu } from 'electron';

const createWindow = () => {
  const menu = new Menu();
  Menu.setApplicationMenu(menu);
  let win = new BrowserWindow({
    title: 'Compi',
    width: 720,
    height: 480,
    hasShadow: false,
    center: false,
    alwaysOnTop: true,
    fullscreenable: false,

    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration: true,
      contextIsolation: false,
      // enableRemoteModule: true,
      // preload: path.join(app.getAppPath(), 'preload', 'index.js'),
    },
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.send('main-chanel', { message: 'cool' });
  });

  // and load the index.html of the app.
  win.loadFile('renderer/index.html');

  // send data to renderer process
  win.webContents.on('did-finish-load', () => {
    win.webContents.send('loaded', {
      appName: CONFIG.name,
      electronVersion: process.versions.electron,
      nodeVersion: process.versions.node,
      chromiumVersion: process.versions.chrome,
    });
  });

  win.on('ready-to-show', () => {
    const { screen } = require('electron');

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    const currentSize = win.getSize();
    win.setPosition(width - currentSize[0], 0);

    console.log(width, height);
  });

  // win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('action', (event, data) => {
  console.log(data);
});
