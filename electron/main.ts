import { app, BrowserWindow } from 'electron'
import { spawn, ChildProcess } from 'child_process'
import path from 'path'

const isDev = !app.isPackaged

let mainWindow: BrowserWindow | null = null
let serverProcess: ChildProcess | null = null

function startServer() {
    const serverPath = isDev
        ? path.join(__dirname, '../app/server/dist/server.js')
        : path.join(process.resourcesPath, 'app/server/dist/server.js')

    serverProcess = spawn('node', [serverPath], {
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
    })

    serverProcess.on('error', (err) => {
        console.error('Failed to start server:', err)
        // Show a dialog if node isn't found
        const { dialog } = require('electron')
        dialog.showErrorBox(
            'Setup Required',
            'Node.js is required to run EasyCounter. Please install Node.js from nodejs.org and restart the app.'
        )
    })
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        minWidth: 900,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        title: 'EasyCounter',
        show: false
    })

    const url = isDev
        ? 'http://localhost:5173'
        : 'http://localhost:8000'

    mainWindow.loadURL(url)

    mainWindow.once('ready-to-show', () => {
        mainWindow?.show()
    })

    if (isDev) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    if (!isDev) {
        startServer()
        setTimeout(createWindow, 2000)
    } else {
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

app.on('before-quit', () => {
    if (serverProcess) {
        serverProcess.kill()
    }
})

