import { app, BrowserWindow } from 'electron'
import { spawn } from 'child_process'
import path from 'path'
import log from 'electron-log'
import fs from 'fs'

log.initialize()

const isDev = !app.isPackaged

let mainWindow: BrowserWindow | null = null
let serverProcess: ReturnType<typeof spawn>

function startServer() {
  const isDev = !app.isPackaged

  const serverPath = isDev
    ? path.join(__dirname, '../app/server/dist/server.cjs')
    : path.join(
        process.resourcesPath,
        'app/server/dist/server.cjs'
      )

    log.info('Starting server...')
    log.info('Server path:', serverPath)
    log.info('Server exists:', fs.existsSync(serverPath))

    serverProcess = spawn(process.execPath, [serverPath], {
        env: {
        ...process.env,
        ELECTRON_RUN_AS_NODE: '1',
        NODE_ENV: 'production',
        NODE_PATH: isDev ? path.join(__dirname, '../node_modules') : path.join(process.resourcesPath, 'app/node_modules'),
        stdio: 'pipe'
    }})

    serverProcess.stdout?.on('data', (data: Buffer) => {
        log.info(`SERVER: ${data.toString()}`)
    })

    serverProcess.stderr?.on('data', (data: Buffer) => {
        log.error(`SERVER ERROR: ${data.toString()}`)
    })

    serverProcess.on('error', (err: Error) => {
        log.error('Process error:', err)
    })

    serverProcess.on('exit', (code: number | null) => {
        log.info('Server exited with code:', code)
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
            contextIsolation: true,
            webSecurity: false
        },
        title: 'EasyCounter',
        show: false
    })

    const url = isDev
        ? 'http://localhost:5173'
        : 'http://localhost:8000'

    const loadURL = () => {
        mainWindow?.loadURL(url).catch(() => {
            console.log('Server not ready, retrying in 3s...')
            setTimeout(loadURL, 3000)
        })
    }

    loadURL()

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
        createWindow()
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