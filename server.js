import express from "express";
import connectDB from "./Config/database.js";
import router from "./routers/ambassade.router.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/style', express.static(path.join(__dirname, 'views', 'style')));
app.use(express.static(path.join(__dirname, 'views')));
connectDB();

app.use("/api/ambassade" , router);


app.listen(3000, () => console.log("Server listen on http://localhost:3000/api/ambassade/"));