import mongoose from "mongoose";
import Ambassy from "../Models/ambassy.model.js";


export async function getAllDiplomat(req, res, next) {
  try {
    // Paramètres pour la projection
    const fields = req.query.fields ? req.query.fields.split(",") : [];

    // Paramètres pour la pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Paramètre pour le tri
    const sortBy = req.query.sortBy || "pays"; // Par défaut, trier par "pays"
    const sortOrder = req.query.sortOrder === "desc" ? -1 : 1; // 1 pour croissant, -1 pour décroissant

    const allDiplomat = await Ambassy.find()
      .select(fields.length ? fields.join(" ") : "")
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });

    res.status(200).json(allDiplomat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



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


export async function getid(req, res, next) {
  const id = req.params.id;
  try {
    const getid = await Ambassy.find({ _id: id });
    res.status(200).json(getid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export async function getBYiso(req, res, next) {
  const iso2 = req.params.iso2;
  try {
    const getiso2 = await Ambassy.find({ iso2: iso2 });
    res.status(200).json(getiso2);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export async function getBYcity(req, res, next) {
  const city = req.params.city;
  try {
    const getcity = await Ambassy.find({ ville: city });
    res.status(200).json(getcity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
