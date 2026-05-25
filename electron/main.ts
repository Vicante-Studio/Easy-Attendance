import dotenv from 'dotenv'
import { app, BrowserWindow } from 'electron'
import path from 'path'
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
            webSecurity: false
        },
    })

    if (app.isPackaged) {
        const loadURL = () => {
            mainWindow?.loadURL('http://localhost:3000/#/adminPage').catch(() => {
                log.info('Server not ready, retrying...')
                setTimeout(loadURL, 2000)
            })
        }
        loadURL()
    } else {
        mainWindow.loadURL('http://localhost:5173/#/adminPage')
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(async () => {
    if (app.isPackaged) {
        const dbPath = path.join(app.getPath('userData'), 'easycounter.db')
        process.env.DATABASE_URL = `file:${dbPath}`
        process.env.PORT = '3000'
        process.env.RESOURCES_PATH = process.resourcesPath  // ← add this

        const { startServer } = await import('../app/server/server')
        await startServer()
    } else {
        dotenv.config({ path: path.join(__dirname, '../app/server/.env') })
    }

    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})