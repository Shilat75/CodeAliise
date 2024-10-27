

import express from 'express';
import {
    getMessage
} from '../controllers/message.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/messages/:from/:to', getMessage);

export default router;
