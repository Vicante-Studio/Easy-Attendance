import express from 'express';
import { handleCreateService, handleGetAllServices, handleGetOneService, handleUpdateService, handleDeleteService, handleActivateService, handleGetActiveService } from '../controllers/churchService.controller.js';

const router = express.Router()

router.get('/', handleGetAllServices)

router.get('/active', handleGetActiveService)

router.get('/:service_id', handleGetOneService)

router.post('/', handleCreateService)

router.put('/:service_id', handleUpdateService)

router.put('/activate/:service_id', handleActivateService)

router.delete('/:service_id', handleDeleteService)

export default router