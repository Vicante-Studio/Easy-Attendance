import dotenv from 'dotenv'
import { app, BrowserWindow, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'
import path from 'path'
import log from 'electron-log'

log.catchErrors({ showDialog: true })

autoUpdater.logger = log as any

autoUpdater.on('checking-for-update', () => {
  log.info('Checking for update...')
})

autoUpdater.on('update-available', () => {
  log.info('Update available')
})

autoUpdater.on('update-not-available', () => {
  log.info('No updates available')
})

autoUpdater.on('error', (err) => {
  log.error('Updater error:', err)
})

autoUpdater.on('download-progress', (progress) => {
  log.info(`Download speed: ${progress.bytesPerSecond}`)
  log.info(`Downloaded ${progress.percent}%`)
})

autoUpdater.on('update-downloaded', async () => {
  const result = await dialog.showMessageBox({
    type: 'info',
    buttons: ['Restart Now', 'Later'],
    defaultId: 0,
    message: 'A new update has been downloaded.',
    detail: 'Restart the app to apply the updates.'
  })

  if (result.response === 0) {
    autoUpdater.quitAndInstall()
  }
})

let mainWindow: BrowserWindow | null = null

function getAppRoot(): string {
  return path.join(__dirname, '..')
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: path.join(getAppRoot(), '../build/EasyAttendanceIcon.png'),
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
        const dbPath = path.join(app.getPath('userData'), 'easy-attendance.db')
        process.env.DATABASE_URL = `file:${dbPath}`
        process.env.PORT = '3000'
        process.env.RESOURCES_PATH = process.resourcesPath

        const { startServer } = await import('../app/server/server')
        await startServer()
    } else {
        dotenv.config({ path: path.join(__dirname, '../app/server/.env') })
    }

    createWindow()

    if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify()
    }
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})