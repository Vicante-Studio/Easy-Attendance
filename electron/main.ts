import { app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'
import log from 'electron-log'

import { startServer } from '../app/server/server'

log.catchErrors({ showDialog: true })

let mainWindow: BrowserWindow | null = null

function getAppRoot(): string {
  return path.join(__dirname, '..')
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (app.isPackaged) {
    const indexPath = path.join(
      getAppRoot(),
      'app',
      'client',
      'dist',
      'index.html'
    )

    log.info('Loading UI from:', indexPath)
    log.info('UI file exists:', fs.existsSync(indexPath))

    mainWindow.loadFile(indexPath, { hash: '/adminPage'})
  } else {
    mainWindow.loadURL('http://localhost:5173/#/adminPage')
  }
}

app.whenReady().then(() => {
  if (app.isPackaged) {
    startServer() // production only — Electron owns the server
  }
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})