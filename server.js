import express from "express";
import connectDB from "./Config/database.js";
import router from "./routers/ambassade.router.js";

const app = express();

app.use(express.json());
connectDB();

app.use("/api/ambassade" , router);


app.listen(3000, () => console.log("Server listen on http://localhost:3000"));