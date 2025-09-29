import express from "express";
import verifyToken from '../middleware/authMiddleware.js';
import { getSummary } from "../controller/summaryController.js";

const router  = express.Router();
router.get("/summary", verifyToken, getSummary);

export default router ;