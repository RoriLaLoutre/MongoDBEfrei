import mongoose from "mongoose";

const RepresentationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  adresse: { type: String, required: true },
  ville: { type: String, required: true },
  code_postal: { type: String },
  pays: { type: String, required: true },
  telephone: { type: String },
  fax: { type: String },
  courriel: { type: String },
  url: { type: String },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  socials: {
    type: Map,
    of: new mongoose.Schema({
      type: { type: String },
      url: { type: String },
      url_complet: { type: String }
    })
  },
  iso2: { type: String },
  date_ajout: { type: Date, default: Date.now }
});

const Representation = mongoose.model("Representation", RepresentationSchema);
export default Representation;
