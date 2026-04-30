import express from 'express';
import { handleCreateChurchAttendance, handleGetAllChurchAttendance, handleGetOneChurchAttendance, handleUpdateChurchAttendance, handleDeleteChurchAttendance } from '../controllers/churchAttendance.controller.js';

const router = express.Router()

router.get('/', handleGetAllChurchAttendance)

router.get('/:attendanceID', handleGetOneChurchAttendance)

router.post('/', handleCreateChurchAttendance)

router.put('/:attendanceID', handleUpdateChurchAttendance)

router.delete('/:attendanceID', handleDeleteChurchAttendance)

export default router