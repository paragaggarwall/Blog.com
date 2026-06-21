import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/image', verifyToken, uploadImage);

export default router;
