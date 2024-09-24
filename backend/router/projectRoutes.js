import express from "express";
import { addNewProject,getAllProjects,deleteProject,updateProject,getSingleProject } from "../controllers/projectController.js";

import { isAuthenticated } from './../middlewares/auth.js';

const router = express.Router();

router.post("/add",isAuthenticated,addNewProject);
router.put("/update/:id",isAuthenticated,updateProject);
router.get("/getAll",getAllProjects);
router.get("/getAll/:id",getSingleProject);
router.delete("/delete/:id",isAuthenticated,deleteProject);

export default router;