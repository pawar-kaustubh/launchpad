
 import express from 'express';
 import { verifyToken } from '../utils/verifyUser.js';
import { createStartup } from '../controllers/startup.controller.js';
 
 const router = express.Router();
 
 router.post('/create', verifyToken, createStartup);
 
 export default router;