import express from "express";
import {AmbassyController} from "../Controllers/index.controller.js";


const router = express.Router();

router.get("/", AmbassyController.getAllDiplomat);

router.get("/:id", AmbassyController.getid);

router.get("/search/iso/:iso2", AmbassyController.getBYiso);
router.get("/search/city/:city", AmbassyController.getBYcity);





export default router;