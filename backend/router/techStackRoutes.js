import express from "express";
import { addNewApplication,getAllApplications,deleteApplications } from "../controllers/techStackController.js";

import { isAuthenticated } from './../middlewares/auth.js';

const router = express.Router();

router.post("/add",isAuthenticated,addNewApplication)
router.get("/getAll",getAllApplications)
router.delete("/delete/:id",isAuthenticated,deleteApplications)

export default router;