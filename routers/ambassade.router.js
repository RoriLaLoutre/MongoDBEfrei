import express from "express";
import {AmbassyController} from "../Controllers/index.controller.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

router.get("/", AmbassyController.getAllDiplomat);
router.get("/all20", AmbassyController.get20Diplomat);
//router.post("/add", AmbassyController.addAmbassy);
//router.put("/update/:id", AmbassyController.updateAmbassy);
//router.delete("/delete/:id", AmbassyController.deleteAmbassy);
// Route pour afficher le formulaire
router.get('/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add_form.html'),
    AmbassyController.addAmbassy);
    });
router.get("/:id", AmbassyController.getid);

router.get("/search/iso/:iso2", AmbassyController.getBYiso);
router.get("/search/city/:city", AmbassyController.getBYcity);





export default router;
