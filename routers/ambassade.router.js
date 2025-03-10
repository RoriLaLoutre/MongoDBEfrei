import express from "express";
import {AmbassyController} from "../Controllers/index.controller.js";


const router = express.Router();

router.get("/", AmbassyController.getAllDiplomat);

export default router;