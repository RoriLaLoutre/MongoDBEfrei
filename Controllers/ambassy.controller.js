import mongoose from "mongoose";
import Ambassy from "../Models/ambassy.model.js";

// export async function addAmbassy(nom, email) {
// pass
// }



export async function getAllDiplomat(req, res, next) {
  try {
    const allDiplomat = await Ambassy.find();
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function get20Diplomat(req, res, next) {
  try {
    const allDiplomat = await Ambassy.find().limit(20);
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

