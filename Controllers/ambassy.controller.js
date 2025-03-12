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
  console.log("c ok");
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
    console.log("moment de verité")
    await newAmbassy.save();
    console.log("100% c la que ca foire")
    res.status(201).json({ message: "Ambassade ajoutée avec succès"});
} catch (error) {
    res.status(500).json({ message: "Erreur lors de l'envoie des donnée"});
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

export async function searchAmbassy(req, res) {
  try {
      console.log("🔍 Requête reçue :", req.query); // Debugging

      const { texte, code_postal } = req.query;

      if (!texte) {
          return res.status(400).json({ message: "Veuillez fournir un terme de recherche." });
      }

      console.log("📝 Recherche dans MongoDB pour :", texte);

      let filter = { nom: { $regex: texte, $options: "i" } }; // Recherche insensible à la casse

      // Ajout du filtre sur le code postal
      if (code_postal === "null") {
          filter.code_postal = null;  // Cherche les ambassades SANS code postal
      } else if (code_postal === "non_null") {
          filter.code_postal = { $ne: null };  // Cherche celles qui ONT un code postal
      }

      console.log("🔍 Filtre MongoDB :", filter);

      const results = await Ambassy.find(filter);

      if (results.length === 0) {
          console.log("❌ Aucune ambassade trouvée avec ces critères.");
          return res.status(404).json({ message: `Aucune ambassade trouvée.` });
      }

      console.log("✅ Ambassade(s) trouvée(s) :", results);
      res.status(200).json(results);
  } catch (error) {
      console.error("❌ Erreur lors de la recherche :", error);
      res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
}

