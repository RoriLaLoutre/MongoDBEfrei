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
  try {
    const {
        pays,
        type,
        nom,
        adresse,
        ville,
        code_postal,
        telephone,
        fax,
        courriel,
        url,
        latitude,
        longitude,
        iso2,
        socials
    } = req.body;

    if (!pays || !type || !nom || !adresse || !ville || !latitude || !longitude || !iso2) {
        return res.status(400).json({ message: "Les champs obligatoires doivent être remplis." });
    }

    const newAmbassy = new Ambassy({
        _id: new mongoose.Types.ObjectId(),
        pays,
        type,
        nom,
        adresse,
        ville,
        code_postal: code_postal || null,
        telephone: telephone || null,
        fax: fax || null,
        courriel: courriel || null,
        url: url || null,
        latitude,
        longitude,
        socials: socials || {},
        iso2,
    });

    await newAmbassy.save();
    res.status(201).json({ message: "Ambassade ajoutée avec succès"});
} catch (error) {
    res.status(500).json({ message: "Erreur serveur"});
}
}


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
