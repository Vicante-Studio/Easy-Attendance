import express from 'express'
import { handleGenerateAttendanceCSV } from '../controllers/csvExport.controller.js'

const router = express.Router()

router.get('/:service_id', handleGenerateAttendanceCSV)

export default router