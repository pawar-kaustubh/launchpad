import express from "express";

import { createInvestor } from "../controllers/investor.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/createinvestor', verifyToken, createInvestor);
export default router;