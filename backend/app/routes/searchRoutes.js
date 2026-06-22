import { Router } from 'express';
import { searchCandidates } from '../controllers/searchController.js';

const router = Router();

// POST /search — teruskan criteria pencarian ke n8n dan kembalikan hasilnya ke FE
router.post('/search', searchCandidates);

export default router;
