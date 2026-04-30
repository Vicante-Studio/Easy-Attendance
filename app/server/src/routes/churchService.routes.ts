import express from 'express';
import { handleCreateService, handleGetAllServices, handleGetOneService, handleUpdateService, handleDeleteService } from '../controllers/churchService.controller.js';
import { getOneService } from '../services/churchService.service.js';

const router = express.Router()

router.get('/', handleGetAllServices)

router.get('/:id', getOneService)

router.post('/', handleCreateService)

router.put('/:id', handleUpdateService)

router.delete('/:id', handleDeleteService)

export default router