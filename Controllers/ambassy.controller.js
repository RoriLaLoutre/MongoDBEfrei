import mongoose from "mongoose";
import Ambassy from "../Models/ambassy.model.js";


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

export async function addAmbassy(req, res) {
  console.log(req.body); // Affiche les données envoyées pour le débogage

  try {
      // Destructuration des données envoyées dans le corps de la requête
      const {
          id,
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

      // Validation des champs obligatoires
      if (!pays || !type || !nom || !adresse || !ville || !latitude || !longitude || !iso2) {
          return res.status(400).json({ message: "Les champs obligatoires doivent être remplis." });
      }

      // Validation de la structure des réseaux sociaux
      if (socials && Array.isArray(socials)) {
          socials.forEach(social => {
              if (!social.type || !social.url) {
                  return res.status(400).json({ message: "Chaque réseau social doit avoir un type et une URL." });
              }
          });
      }

      // Création d'une nouvelle ambassade
      const newAmbassy = new Ambassy({
          _id: new mongoose.Types.ObjectId(),
          id: id || Date.now(),
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
          socials: socials || [], // Utiliser un tableau vide si pas de données
          iso2,
          date_ajout: new Date() // Ajouter la date de création
      });

      console.log(newAmbassy); // Pour vérifier l'objet créé

      // Enregistrer l'ambassade dans la base de données
      await newAmbassy.save();

      // Répondre avec succès
      res.status(201).json({ message: "Ambassade ajoutée avec succès" });

  } catch (error) {
      console.error(error); // Afficher l'erreur pour débogage
      res.status(500).json({ message: "Erreur lors de l'envoi des données" });
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
