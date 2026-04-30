import express from 'express';
import { handleCreateService, handleGetAllServices, handleGetOneService, handleUpdateService, handleDeleteService } from '../controllers/churchService.controller.js';

const router = express.Router()

router.get('/', handleGetAllServices)

router.get('/:serviceID', handleGetOneService)

router.post('/', handleCreateService)

router.put('/:serviceID', handleUpdateService)

router.delete('/:serviceID', handleDeleteService)

export default router