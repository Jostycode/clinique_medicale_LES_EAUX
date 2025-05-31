const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);  // ⬅️  Important
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));

// 📌 Database
// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "clinique_les_eaux"
// });
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
});
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erreur de connexion à la base de données :", err.message);
    } else {
        console.log("✅ Connexion réussie à la base de données !");
        connection.release(); // Libère la connexion
    }
});
// Connexion Socket.io
io.on('connection', (socket) => {
    console.log('Un client est connecté');
});

// ================================
//          SERVICE
// ================================

// Get services
app.get("/api/service", (req, res) => {
    const request = "SELECT * FROM service";
    db.query(request, (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        res.json(result);
    });
});

// Multer pour service
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "assets/service/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload1 = multer({ storage: storage1 });

// Ajouter service
app.post("/api/service/post", upload1.single("image"), (req, res) => {
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/service/${req.file.filename}` : null;
    if (!titre || !paragraphe || !image) return res.status(400).json({ message: "Tous les champs sont requis" });

    const request = "INSERT INTO service (image, titre, paragraphe) VALUES (?, ?, ?)";
    db.query(request, [image, titre, paragraphe], (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("service_updated");  // 👈 Emission événement
        res.status(201).json({ message: "Service ajouté avec succès" });
    });
});

// Modifier service
app.put("/api/service/:id", upload1.single("image"), (req, res) => {
    const { id } = req.params;
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/service/${req.file.filename}` : null;

    let request, values;
    if (image) {
        request = "UPDATE service SET titre = ?, paragraphe = ?, image = ? WHERE id = ?";
        values = [titre, paragraphe, image, id];
    } else {
        request = "UPDATE service SET titre = ?, paragraphe = ? WHERE id = ?";
        values = [titre, paragraphe, id];
    }

    db.query(request, values, (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("service_updated");  // 👈
        res.json({ message: "Service mis à jour avec succès" });
    });
});

// Supprimer service
app.delete("/api/service/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM service WHERE id = ?";
    db.query(request, [id], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("service_updated");  // 👈
        res.json({ message: "Service supprimé avec succès" });
    });
});

// ================================
//          EXAMEN
// ================================

// Get examen
app.get("/api/examen", (req, res) => {
    const request = "SELECT * FROM examen";
    db.query(request, (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        res.json(result);
    });
});

// Multer examen
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "assets/examen/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload2 = multer({ storage: storage2 });

// Ajouter examen
app.post("/api/examen/post", upload2.single("image"), (req, res) => {
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/examen/${req.file.filename}` : null;
    if (!titre || !paragraphe || !image) return res.status(400).json({ message: "Tous les champs sont requis" });

    const request = "INSERT INTO examen (image, titre, paragraphe) VALUES (?, ?, ?)";
    db.query(request, [image, titre, paragraphe], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("examen_updated");  // 👈
        res.status(201).json({ message: "Examen ajouté avec succès" });
    });
});

// Modifier examen
app.put("/api/examen/:id", upload2.single("image"), (req, res) => {
    const { id } = req.params;
    const { titre, paragraphe } = req.body;
    const image = req.file ? `/assets/examen/${req.file.filename}` : null;

    let request, values;
    if (image) {
        request = "UPDATE examen SET titre = ?, paragraphe = ?, image = ? WHERE id = ?";
        values = [titre, paragraphe, image, id];
    } else {
        request = "UPDATE examen SET titre = ?, paragraphe = ? WHERE id = ?";
        values = [titre, paragraphe, id];
    }

    db.query(request, values, (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("examen_updated");  // 👈
        res.json({ message: "Examen mis à jour avec succès" });
    });
});

// Supprimer examen
app.delete("/api/examen/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM examen WHERE id = ?";
    db.query(request, [id], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("examen_updated");  // 👈
        res.json({ message: "Examen supprimé avec succès" });
    });
});

// ================================
//         Caroussel
// ================================

// Récupérer caroussel
app.get("/api/caroussel", (req, res) => {
    const request = "SELECT * FROM caroussel";
    db.query(request, (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        res.json(result);
    });
});

// Multer caroussel
const storage3 = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "assets/caroussel/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload3 = multer({ storage: storage3 });

// Ajouter caroussel
app.post("/api/caroussel/post", upload3.single("image"), (req, res) => {
    const image = req.file ? `/assets/caroussel/${req.file.filename}` : null;
    if (!image) return res.status(400).json({ message: "L'image est requise" });

    const request = "INSERT INTO caroussel (image) VALUES (?)";
    db.query(request, [image], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("caroussel_updated");  // 👈
        res.status(201).json({ message: "Caroussel ajouté avec succès" });
    });
});

// Modifier caroussel
app.put("/api/caroussel/:id", upload3.single("image"), (req, res) => {
    const { id } = req.params;
    const image = req.file ? `/assets/caroussel/${req.file.filename}` : null;
    if (!image) return res.status(400).json({ message: "L'image est requise" });

    const request = "UPDATE caroussel SET image = ? WHERE id = ?";
    db.query(request, [image, id], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("caroussel_updated");  // 👈
        res.json({ message: "Caroussel mis à jour avec succès" });
    });
});

// Supprimer caroussel
app.delete("/api/caroussel/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM caroussel WHERE id = ?";
    db.query(request, [id], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("caroussel_updated");  // 👈
        res.json({ message: "Caroussel supprimé avec succès" });
    });
});

// ================================
//           Discussions
// ================================

// Récupérer discussions
app.get("/api/discussion", (req, res) => {
    const request = "SELECT * FROM discussions";
    db.query(request, (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        res.json(result);
    });
});

// Ajouter discussion
app.post("/api/discussion/post", (req, res) => {
    const { nom, message } = req.body;
    if (!nom || !message) return res.status(400).json({ message: "Tous les champs sont requis" });

    const request = "INSERT INTO discussions (nom, message) VALUES (?, ?)";
    db.query(request, [nom, message], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("discussion_updated");  // 👈
        res.status(201).json({ message: "Commentaire ajouté avec succès" });
    });
});

// Modifier une discussion
app.put("/api/discussion/:id", (req, res) => {
    const { id } = req.params;
    const { nom, message } = req.body;

    if (!nom || !message) {
        return res.status(400).json({ message: "Champs manquants" });
    }

    const sql = "UPDATE discussions SET nom = ?, message = ? WHERE id = ?";
    const values = [nom, message, id];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Erreur lors de la mise à jour :", error);
            return res.status(500).json({ message: "Erreur serveur" });
        }

        // Emission de l'événement Socket.io pour alerter le front que la liste doit être rechargée
        io.emit('discussion_updated');

        res.json({ message: "Commentaire mis à jour avec succès" });
    });
});



// Supprimer discussion
app.delete("/api/discussion/:id", (req, res) => {
    const { id } = req.params;
    const request = "DELETE FROM discussions WHERE id = ?";
    db.query(request, [id], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("discussion_updated");  // 👈
        res.json({ message: "Discussion supprimée avec succès" });
    });
});

// ================================
//         Inscription
// ================================

// Récupérer inscriptions
app.get("/api/inscription", (req, res) => {
    const request = "SELECT * FROM inscription";
    db.query(request, (error, result) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        res.json(result);
    });
});

// Ajouter inscription
app.post("/api/inscription/post", (req, res) => {
    const { nom, poste, mdp } = req.body;
    if (!nom || !poste || !mdp) return res.status(400).json({ message: "Tous les champs sont requis" });

    const request = "INSERT INTO inscription (nom, poste, mdp) VALUES (?, ?, ?)";
    db.query(request, [nom, poste, mdp], (error) => {
        if (error) return res.status(500).json({ message: "Erreur serveur" });
        io.emit("inscription_updated");  // 👈
        res.status(201).json({ message: "Inscription ajoutée avec succès" });
    });
});

// ================================
//         Connexion
// ================================
app.post("/api/connexion", (req, res) => {
    const { poste, mdp } = req.body;

    const sql = "SELECT * FROM inscription WHERE poste = ? AND mdp = ?";
    db.query(sql, [poste, mdp], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: "Erreur serveur" });

        if (result.length > 0) {
            res.json({ success: true, user: result[0] });
        } else {
            res.json({ success: false, message: "Identifiants invalides" });
        }
    });
});

// ================================
//       Lancer le serveur
// ================================
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port} avec socket.io`);
});
