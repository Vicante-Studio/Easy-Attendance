import express from 'express';
import { handleCreateChurchAttendance, handleGetAllChurchAttendance, handleGetOneChurchAttendance, handleUpdateChurchAttendance, handleDeleteChurchAttendance, handleGetAttendanceByService } from '../controllers/churchAttendance.controller.js';

const router = express.Router()

router.get('/', handleGetAllChurchAttendance)

router.get('/:attendance_id', handleGetOneChurchAttendance)

router.get('/service/:service_id', handleGetAttendanceByService)

router.get('/service/total/:service_id')

router.post('/', handleCreateChurchAttendance)

router.put('/:attendance_id', handleUpdateChurchAttendance)

router.delete('/:attendance_id', handleDeleteChurchAttendance)

export default router