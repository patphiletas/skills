import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Indispensable pour Neon
  },
});

// Petit test de connexion immédiat au démarrage
pool.connect((err, client, release) => {
  if (err) {
    return console.error("❌ Erreur de connexion à Neon:", err.message);
  }
  console.log("✅ Connecté à Neon avec succès !");
  release();
});