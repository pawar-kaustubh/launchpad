import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import {
  createStartup,
  deleteStartup,
  getAllStartup,
  getStartup,
  updateStartup,

} from '../controllers/startup.controller.js';
import Startup from '../models/startup.model.js'; // Import your Startup model
import { askGeminiInvestor } from '../utils/gemini.js'; // Import the function to interact with Gemini AI

const router = express.Router();

// Existing routes
// Route to create a new startup
router.post('/create', verifyToken, createStartup);

// Route to delete a startup by ID
router.delete('/delete/:id', verifyToken, deleteStartup);

// Route to update a startup by ID
router.put('/update/:id', verifyToken, updateStartup);
router.get('/get/:id',  getStartup);
router.get('/getall',  getAllStartup);
// 🧠 New route for AI Investor analysis
router.get('/analyze/:id', verifyToken, async (req, res) => {
  try {
    // Find the startup by ID from the database
    const startup = await Startup.findById(req.params.id);
    if (!startup) {
      return res.status(404).json({ message: 'Startup not found' });
    }

    // Send the startup data to Gemini for investment analysis
    const analysis = await askGeminiInvestor(startup);

    // Respond with the analysis from Gemini
    res.json({ analysis });
  } catch (error) {
    console.error('Error in Gemini analysis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

