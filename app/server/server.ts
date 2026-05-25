import http from 'http'
import log from 'electron-log'

import app from './src/app.js'
import { initSocket } from './src/sockets/socket.js'
import { prisma } from './src/config/prisma.js'

async function runMigrations() {
    try {
        log.info('Running migrations...')

        await prisma.$executeRaw`
            CREATE TABLE IF NOT EXISTS "Service" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "name" TEXT NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT false,
                "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `
        await prisma.$executeRaw`
            CREATE TABLE IF NOT EXISTS "Section" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "name" TEXT NOT NULL UNIQUE,
                "display_order" INTEGER NOT NULL DEFAULT 0,
                "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `
        await prisma.$executeRaw`
            CREATE TABLE IF NOT EXISTS "Attendance" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "service_id" TEXT NOT NULL,
                "section_id" TEXT NOT NULL,
                "men" INTEGER NOT NULL DEFAULT 0,
                "women" INTEGER NOT NULL DEFAULT 0,
                "children" INTEGER NOT NULL DEFAULT 0,
                "counter_name" TEXT,
                "submitted_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY ("service_id") REFERENCES "Service"("id"),
                FOREIGN KEY ("section_id") REFERENCES "Section"("id")
            )
        `

        log.info('Migrations complete')
    } catch (error) {
        log.error('Migration error:', error)
    }
}

export async function startServer() {
    console.log('SERVER ENTRY STARTED')

    await runMigrations()

    const server = http.createServer(app)

    initSocket(server)

    const PORT = process.env.PORT || 3000

    console.log('STARTING HTTP SERVER...')

    server.listen(Number(PORT), '0.0.0.0', () => {
        console.log(`SERVER RUNNING ON ${PORT}`)
        log.info(`Server running at http://localhost:${PORT}`)
    })
}

if (process.env.RUN_SERVER_DIRECTLY === 'true') {
    startServer()
}