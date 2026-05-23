import dotenv from 'dotenv'
import { app, BrowserWindow } from 'electron'
import path from 'path'
import log from 'electron-log'

dotenv.config({ path: path.join(__dirname, '../app/server/.env') })

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
            webSecurity: false
        },
    })

    if (app.isPackaged) {
        // Load from Express — not from file system
        const loadURL = () => {
            mainWindow?.loadURL('http://localhost:3000').catch(() => {
                log.info('Server not ready, retrying...')
                setTimeout(loadURL, 4000)
            })
        }
        loadURL()
    } else {
        mainWindow.loadURL('http://localhost:5173')
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
  if (app.isPackaged) {
        // Only start server in production packaged app
        startServer()
    }
    // In dev, server is already running via npm run dev:server
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})