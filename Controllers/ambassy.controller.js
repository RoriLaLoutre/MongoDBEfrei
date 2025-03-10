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

export async function addAmbassy(req, res, next) {
  const ambassy = new Ambassy({    // a faire plus tard
    pays: req.body.pays,
    type: req.body.type,
    nom: req.body.nom,
    adresse: req.body.adresse,
    ville: req.body.ville,
    code_postal: req.body.code_postal,
    telephone: req.body.telephone,
    fax: req.body.fax,
    courriel: req.body.courriel,
    url: req.body.url,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    socials: req.body.socials,
    iso2: req.body.iso2,
    date_ajout: req.body.date_ajout,
  });
    
};

