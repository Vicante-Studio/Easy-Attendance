import express from 'express';
import { handleCreateChurchSection, handleGetAllChurchSection, handleGetOneChurchSection, handleUpdateChurchSection, handleDeleteChurchSection } from '../controllers/churchSection.controller.js';

const router = express.Router()

router.get('/', handleGetAllChurchSection)

router.get('/:sectionID', handleGetOneChurchSection)

router.post('/', handleCreateChurchSection)

router.put('/:sectionID', handleUpdateChurchSection)

router.delete('/:sectionID', handleDeleteChurchSection)

export default router