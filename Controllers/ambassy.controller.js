import mongoose from "mongoose";
import Ambassy from "./Models/ambassy.model.js";

export async function addAmbassy(nom, email) {

}


export async function getAllDiplomat() {
  try {
    const allDiplomat = await Ambassy.find(req, res);
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export async function getAllDiplomat() {
  try {
    const allDiplomat = await Ambassy.find(req, res);
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function get20Diplomat() {
  try {
    const allDiplomat = await Ambassy.find(req, res).limit(20);
    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};