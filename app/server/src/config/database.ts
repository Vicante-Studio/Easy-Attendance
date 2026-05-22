import Database from 'better-sqlite3';
import path from 'path';

const __dirname = path.dirname(__filename)

const isProd = process.env.NODE_ENV === 'production'

// dev:  src/config → src → server → app → root
// prod: dist/src/config → dist/src → dist → server → app → root
const levelsUp = isProd ? 5 : 4
const appRoot = path.resolve(__dirname, ...Array(levelsUp).fill('..'))
const dbPath = path.join(appRoot, 'app', 'data', 'easycounter.db')

console.log('DB Path:', dbPath)
const db = new Database(dbPath)

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
    CREATE TABLE IF NOT EXISTS services(
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      is_active INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sections (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        display_order INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

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

  export default db