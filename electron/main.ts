import { app, BrowserWindow } from 'electron'
import path from 'path'
import log from 'electron-log'
import { startServer } from '../app/server/server'

let mainWindow: BrowserWindow | null = null

const isDev = !app.isPackaged

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800
  })

  const url = isDev
    ? 'http://localhost:5173'
    : 'http://localhost:3000'

  mainWindow.loadURL(url)
}

app.whenReady().then(() => {
  if (!isDev) {
    startServer()
  }

  createWindow()
})