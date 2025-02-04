import mongoose from "mongoose";
const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://51.210.103.122:27017/local", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB connecté");
    } catch (error) {
      console.error("Erreur de connexion à la DB :", error);
      process.exit(1);
    }
  };
  export default connectDB;