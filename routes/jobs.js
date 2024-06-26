import { Router } from "express";
import jobsController from '../controllers/jobs.js'

const router = Router();

router.get('/',jobsController.getAllJobs);
router.get('/:id',jobsController.getJob);
router.post('/',jobsController.createJob);
router.patch('/:id',jobsController.updateJob);
router.delete('/:id',jobsController.deleteJob);

export  default router;