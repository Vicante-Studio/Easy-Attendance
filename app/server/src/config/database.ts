import sqlite3 from "sqlite3"
import path from "path"
import fs from "fs"

// Detect environment safely
const isDev = process.env.NODE_ENV === "development"

// Safe DB directory (works in dev + packaged Electron)
const dbDir = isDev
  ? path.join(process.cwd(), "app/data")
  : path.join(process.resourcesPath, "app/data")

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

const dbPath = path.join(dbDir, "easycounter.db")

console.log("DB Path:", dbPath)

// Create database connection
export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("DB connection error:", err)
  } else {
    console.log("SQLite connected successfully")

    // Run setup AFTER connection opens
    db.serialize(() => {
      db.run(`PRAGMA journal_mode = WAL`)
      db.run(`PRAGMA foreign_keys = ON`)

      db.run(`
        CREATE TABLE IF NOT EXISTS services(
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          is_active INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `)

      db.run(`
        CREATE TABLE IF NOT EXISTS sections (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL UNIQUE,
          display_order INTEGER DEFAULT 0,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
      `)

      db.run(`
        CREATE TABLE IF NOT EXISTS attendance (
          id TEXT PRIMARY KEY,
          service_id TEXT NOT NULL,
          section_id TEXT NOT NULL,
          men INTEGER DEFAULT 0,
          women INTEGER DEFAULT 0,
          children INTEGER DEFAULT 0,
          counter_name TEXT,
          submitted_at TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (service_id) REFERENCES services(id),
          FOREIGN KEY (section_id) REFERENCES sections(id)
        );
      `)
    })
  }
})