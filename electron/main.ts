// electron/main.ts
import { app, BrowserWindow } from 'electron'
import { spawn, ChildProcess } from 'child_process'
import path from 'path'
import fs from 'fs'
import log from 'electron-log'

log.catchErrors({ showDialog: true })

let backendProcess: ChildProcess | null = null
let mainWindow: BrowserWindow | null = null

// With asar:false, __dirname = resources/app/electron/ in production
// and project_root/electron/ in dev.
// Either way, going up one level gives us the app root.
function getAppRoot(): string {
  return path.join(__dirname, '..')
}

function startBackend() {
  const appRoot = getAppRoot()

  const serverScript = path.join(appRoot, 'app', 'server', 'dist', 'server.cjs')

  const dbPath = app.isPackaged
    ? path.join(app.getPath('userData'), 'easycounter.db')
    : path.join(appRoot, 'app', 'server', 'prisma', 'easycounter.db')

  // Diagnostic logs — these will tell us exactly what paths are being used
  log.info('=== BACKEND STARTUP ===')
  log.info('appRoot:', appRoot)
  log.info('serverScript:', serverScript)
  log.info('serverScript exists:', fs.existsSync(serverScript))
  log.info('DATABASE_URL:', `file:${dbPath}`)
  log.info('isPackaged:', app.isPackaged)
  log.info('__dirname:', __dirname)
  log.info('resourcesPath:', process.resourcesPath)

  if (!fs.existsSync(serverScript)) {
    log.error('FATAL: server.cjs not found at expected path. Listing parent dir...')
    const parentDir = path.join(appRoot, 'app', 'server', 'dist')
    if (fs.existsSync(parentDir)) {
      log.error('Contents of dist/:', fs.readdirSync(parentDir))
    } else {
      log.error('dist/ folder does not exist either. Listing appRoot...')
      log.error('Contents of appRoot:', fs.readdirSync(appRoot))
    }
    return
  }

  const env: NodeJS.ProcessEnv = {
    ...process.env,
    NODE_ENV: app.isPackaged ? 'production' : 'development',
    DATABASE_URL: `file:${dbPath}`,
  }

  backendProcess = spawn('node', [serverScript], { env, stdio: 'pipe' })

  backendProcess.stdout?.on('data', (d) => log.info('[server]', d.toString().trim()))
  backendProcess.stderr?.on('data', (d) => log.error('[server error]', d.toString().trim()))
  backendProcess.on('exit', (code) => log.warn('[server] exited with code', code))
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
    mainWindow.loadFile(indexPath)
  } else {
    mainWindow.loadURL('http://localhost:5173')
  }
}

app.whenReady().then(() => {
  startBackend()
  setTimeout(createWindow, 1500)
})

app.on('will-quit', () => {
  backendProcess?.kill()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})