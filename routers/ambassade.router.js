import express from "express";


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from vaccin router");
});

export default router;