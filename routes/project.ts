import express from "express";
import { createProject, getAllProject, getProjectById, updateProject } from "../controllers/project";



const router = express.Router();

router.post('/', createProject)
router.get('/', getAllProject)
router.put('/:id', updateProject)
router.patch('/:id', updateProject)
router.get('/:id', getProjectById)


export default router