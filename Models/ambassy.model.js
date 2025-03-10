import mongoose from "mongoose";

const AmbassySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Identifiant MongoDB
  id: { type: Number, required: true }, // ID numérique unique
  pays: { type: String, required: true }, // Nom du pays
  type: { type: String, required: true }, // Type de représentation (ex: ambassade)
  nom: { type: String, required: true }, // Nom complet
  adresse: { type: String, required: true }, // Adresse
  ville: { type: String, required: true }, // Ville
  code_postal: { type: String, default: null }, // Code postal (nullable)
  telephone: { type: String, default: null }, // Téléphone
  fax: { type: String, default: null }, // Fax
  courriel: { type: String, default: null }, // Email
  url: { type: String, default: null }, // Lien officiel
  latitude: { type: Number, required: true }, // Coordonnée latitude
  longitude: { type: Number, required: true }, // Coordonnée longitude
  socials: {
    type: Map, // Un objet clé-valeur dynamique
    of: new mongoose.Schema({
      type: { type: String, required: true }, // Type de réseau social (ex: "facebook")
      url: { type: String, required: true }, // URL du réseau social
      url_complet: { type: String, required: true } // Lien HTML complet
    }, { _id: false }) // Empêche d'ajouter un _id pour chaque sous-document
  },
  iso2: { type: String, required: true }, // Code ISO du pays
  date_ajout: { type: Date, required: true }, // Date d'ajout
});


const Ambassy = mongoose.model("Ambassy", AmbassySchema);
export default Ambassy;

