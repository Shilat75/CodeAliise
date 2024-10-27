
import express from 'express';
import {
    getTags
} from '../controllers/tags.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/tags', getTags);

export default router;
