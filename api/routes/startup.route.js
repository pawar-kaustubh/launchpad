
 import express from 'express';
 import { verifyToken } from '../utils/verifyUser.js';
import { createStartup, deleteStartup } from '../controllers/startup.controller.js';
 
 const router = express.Router();
 
 router.post('/create', verifyToken, createStartup);
 router.delete('/delete/:id', verifyToken, deleteStartup);
 
 export default router;