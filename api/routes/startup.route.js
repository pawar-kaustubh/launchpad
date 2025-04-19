
 import express from 'express';
 import { verifyToken } from '../utils/verifyUser.js';
import { createStartup, deleteStartup, updateStartup } from '../controllers/startup.controller.js';
 
 const router = express.Router();
 
 router.post('/create', verifyToken, createStartup);
 router.delete('/delete/:id', verifyToken, deleteStartup);
 router.put('/update/:id', verifyToken, updateStartup);
 
 export default router;