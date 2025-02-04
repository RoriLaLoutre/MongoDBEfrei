const mongoose = require("mongoose");
const Ambassy = require("./Models/ambassy.model.js");

async function addAmbassy(nom, email) {
  try {
    const newAmbassy = new Ambassy({ nom, email });
    await newAmbassy.save();
    console.log(`✅ Utilisateur ajouté : ${nom} (${email})`);
  } catch (error) {
    console.error("❌ Erreur :", error.message);
  } finally {
    mongoose.connection.close();
  }
}
