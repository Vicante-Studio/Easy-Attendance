import express from 'express';
import { handleCreateService, handleGetAllServices, handleGetOneService, handleUpdateService, handleDeleteService } from '../controllers/churchService.controller.js';

const router = express.Router()

router.get('/', handleGetAllServices)

router.get('/:id', handleGetOneService)

router.post('', handleCreateService)

router.put('/:id', handleUpdateService)

router.delete('/:id', handleDeleteService)

export default router