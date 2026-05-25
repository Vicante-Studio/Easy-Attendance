import dotenv from 'dotenv'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import fs from 'fs'
import log from 'electron-log'

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
    const indexPath = path.join(getAppRoot(), 'app', 'client', 'dist', 'index.html')
    log.info('Loading UI from:', indexPath)
    log.info('UI file exists:', fs.existsSync(indexPath))
    mainWindow.loadFile(indexPath, { hash: '/adminPage' })
  } else {
    mainWindow.loadURL('http://localhost:5173/#/adminPage')
  }
}

app.whenReady().then(async () => {
  if (app.isPackaged) {
    const dbPath = path.join(app.getPath('userData'), 'easycounter.db')
    process.env.DATABASE_URL = `file:${dbPath}`
    process.env.PORT = '3000'

    // Dynamic import AFTER env vars are set
    const { startServer } = await import('../app/server/server')
    startServer()
  } else {
    dotenv.config({ path: path.join(__dirname, '../app/server/.env') })
  }

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})