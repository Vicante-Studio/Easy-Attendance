import os from 'os'
import express from 'express'

const router = express.Router()

function getLocalIP() {
    const interfaces = os.networkInterfaces()
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address
            }
        }
    }
    return 'localhost'
}

router.get('/ip', (req, res) => {
    const port = process.env.RUN_SERVER_DIRECTLY === 'true' ? 5173 : 3000
    res.json({ ip: getLocalIP(), port })
})


export default router


