import { Router } from "express";
import authRoutes from "./auth.js";
import jobRoutes from "./jobs.js"
import authMiddleWare from '../middleware/authentication.js'

const router = Router()

router.use('/api/v1/auth',authRoutes);
router.use('/api/v1/job',authMiddleWare,jobRoutes);

export default router
