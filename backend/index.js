const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const http = require('http');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

// 📌 Connexion PostgreSQL
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT || 5432,
    ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("❌ Erreur de connexion à PostgreSQL:", err.message);
    } else {
        console.log("✅ Connexion réussie à PostgreSQL !");
        release();
    }
});

// Connexion Socket.io
io.on('connection', (socket) => {
    console.log('Un client est connecté');
});

// ================================
//            SERVICE
// ================================

const storage1 = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "assets/service/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload1 = multer({ storage: storage1 });

app.get("/api/service", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM service");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.post("/api/service/post", upload1.single("image"), async (req, res) => {
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/service/${req.file.filename}` : null;
    if (!titre || !paragraphe || !image) return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
        await pool.query("INSERT INTO service (image, titre, paragraphe) VALUES ($1, $2, $3)", [image, titre, paragraphe]);
        io.emit("service_updated");
        res.status(201).json({ message: "Service ajouté avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.put("/api/service/:id", upload1.single("image"), async (req, res) => {
    const { id } = req.params;
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/service/${req.file.filename}` : null;

    try {
        if (image) {
            await pool.query("UPDATE service SET titre = $1, paragraphe = $2, image = $3 WHERE id = $4", [titre, paragraphe, image, id]);
        } else {
            await pool.query("UPDATE service SET titre = $1, paragraphe = $2 WHERE id = $3", [titre, paragraphe, id]);
        }
        io.emit("service_updated");
        res.json({ message: "Service mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.delete("/api/service/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM service WHERE id = $1", [id]);
        io.emit("service_updated");
        res.json({ message: "Service supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ================================
//            EXAMEN
// ================================

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "assets/examen/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload2 = multer({ storage: storage2 });

app.get("/api/examen", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM examen");
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.post("/api/examen/post", upload2.single("image"), async (req, res) => {
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/examen/${req.file.filename}` : null;
    if (!titre || !paragraphe || !image) return res.status(400).json({ message: "Tous les champs sont requis" });

    try {
        await pool.query("INSERT INTO examen (image, titre, paragraphe) VALUES ($1, $2, $3)", [image, titre, paragraphe]);
        io.emit("examen_updated");
        res.status(201).json({ message: "examen ajouté avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.put("/api/examen/:id", upload2.single("image"), async (req, res) => {
    const { id } = req.params;
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/examen/${req.file.filename}` : null;

    try {
        if (image) {
            await pool.query("UPDATE examen SET titre = $1, paragraphe = $2, image = $3 WHERE id = $4", [titre, paragraphe, image, id]);
        } else {
            await pool.query("UPDATE examen SET titre = $1, paragraphe = $2 WHERE id = $3", [titre, paragraphe, id]);
        }
        io.emit("examen_updated");
        res.json({ message: "examen mis à jour avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

app.delete("/api/examen/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM examen WHERE id = $1", [id]);
        io.emit("examen_updated");
        res.json({ message: "examen supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// ================================
//         Caroussel
// ================================

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "assets/caroussel/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload3 = multer({ storage: storage3 });

app.get("/api/caroussel", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM caroussel");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/api/caroussel/post", upload3.single("image"), async (req, res) => {
  const image = req.file ? `/assets/caroussel/${req.file.filename}` : null;
  if (!image) return res.status(400).json({ message: "L'image est requise" });

  try {
    await pool.query("INSERT INTO caroussel (image) VALUES ($1)", [image]);
    io.emit("caroussel_updated");
    res.status(201).json({ message: "Caroussel ajouté avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.put("/api/caroussel/:id", upload3.single("image"), async (req, res) => {
  const { id } = req.params;
  const image = req.file ? `/assets/caroussel/${req.file.filename}` : null;
  if (!image) return res.status(400).json({ message: "L'image est requise" });

  try {
    await pool.query("UPDATE caroussel SET image = $1 WHERE id = $2", [image, id]);
    io.emit("caroussel_updated");
    res.json({ message: "Caroussel mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.delete("/api/caroussel/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM caroussel WHERE id = $1", [id]);
    io.emit("caroussel_updated");
    res.json({ message: "Caroussel supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ================================
//         Discussions
// ================================

app.get("/api/discussion", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM discussions");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/api/discussion/post", async (req, res) => {
  const { nom, message } = req.body;
  if (!nom || !message) return res.status(400).json({ message: "Tous les champs sont requis" });

  try {
    await pool.query("INSERT INTO discussions (nom, message) VALUES ($1, $2)", [nom, message]);
    io.emit("discussion_updated");
    res.status(201).json({ message: "Commentaire ajouté avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.put("/api/discussion/:id", async (req, res) => {
  const { id } = req.params;
  const { nom, message } = req.body;
  if (!nom || !message) return res.status(400).json({ message: "Champs manquants" });

  try {
    await pool.query("UPDATE discussions SET nom = $1, message = $2 WHERE id = $3", [nom, message, id]);
    io.emit("discussion_updated");
    res.json({ message: "Commentaire mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.delete("/api/discussion/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM discussions WHERE id = $1", [id]);
    io.emit("discussion_updated");
    res.json({ message: "Discussion supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ================================
//         Inscription
// ================================

app.get("/api/inscription", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inscription");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

app.post("/api/inscription/post", async (req, res) => {
  const { nom, poste, mdp } = req.body;
  if (!nom || !poste || !mdp) return res.status(400).json({ message: "Tous les champs sont requis" });

  try {
    await pool.query("INSERT INTO inscription (nom, poste, mdp) VALUES ($1, $2, $3)", [nom, poste, mdp]);
    io.emit("inscription_updated");
    res.status(201).json({ message: "Inscription ajoutée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ================================
//         Connexion
// ================================

app.post("/api/connexion", async (req, res) => {
  const { poste, mdp } = req.body;

  try {
    const result = await pool.query("SELECT * FROM inscription WHERE poste = $1 AND mdp = $2", [poste, mdp]);
    if (result.rows.length > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.json({ success: false, message: "Identifiants invalides" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// ================================
//       Lancer le serveur
// ================================

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port} avec socket.io`);
});