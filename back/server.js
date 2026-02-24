import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route de test simple
app.get("/testdb", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS test");
    res.json({ ok: true, result: result.rows });
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// Ta route finale pour les thèmes et skills
app.get("/themes", async (req, res) => {
  try {
    // Utilisation des guillemets pour respecter la casse de tes tables Neon
    const themesResult = await pool.query('SELECT * FROM "themes" ORDER BY id');
    const skillsResult = await pool.query('SELECT * FROM "skills" ORDER BY id');

    const themes = themesResult.rows;
    const skills = skillsResult.rows;

    const result = themes.map(theme => ({
      id: theme.id,
      name: theme.name,
      skills: skills.filter(skill => skill.themes_id === theme.id)
    }));

    res.json(result);
  } catch (error) {
    console.error("ERROR in /themes:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/skills", async (req, res) => {
    try {
        const { name, level, themes_id } = req.body;
        const query = 'INSERT INTO "skills" (name, level, themes_id) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, level, themes_id];
        
        const result = await pool.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.delete("/skills/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Utilisation des guillemets pour "skills" comme pour les autres routes
        await pool.query('DELETE FROM "skills" WHERE id = $1', [id]);
        res.json({ message: "Compétence supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Port d'écoute
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});