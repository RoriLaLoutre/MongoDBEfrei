import mongoose from "mongoose";
import Ambassy from "./Models/ambassy.model.js";

export async function addAmbassy(nom, email) {
  try {
    const newAmbassy = new Ambassy({ nom, email });
    await newAmbassy.save();
    console.log(`✅ Ambassade ajoutée : ${nom} (${email})`);
  } catch (error) {
    console.error("❌ Erreur :", error.message);
  } finally {
    mongoose.connection.close();
  }
}


export async function getAllDiplomat() {
  try {
    const allDiplomat = await Ambassy.find(req, res);
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
