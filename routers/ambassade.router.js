import express from "express";
import {AmbassyController} from "../Controllers/index.controller.js";


const router = express.Router();

router.get("/", AmbassyController.getAllDiplomat);
router.get("/all20", AmbassyController.get20Diplomat);
router.post("/add", AmbassyController.addAmbassy);
router.put("/update/:id", AmbassyController.updateAmbassy);
router.delete("/delete/:id", AmbassyController.deleteAmbassy);

export default router;