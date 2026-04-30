import express from 'express';
import { handleCreateChurchSection, handleGetAllChurchSection, handleGetOneChurchSection, handleUpdateChurchSection, handleDeleteChurchSection } from '../controllers/churchSection.controller.js';

const router = express.Router()

router.get('/', handleGetAllChurchSection)

router.get('/:id', handleGetOneChurchSection)

router.post('/', handleCreateChurchSection)

router.put('/:id', handleUpdateChurchSection)

router.delete('/:id', handleDeleteChurchSection)

export default router