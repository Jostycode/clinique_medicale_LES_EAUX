import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socket';
import '../index1.css';

function Discussion() {
    const [data, setData] = useState([]);
    const [nom, setNom] = useState('');
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(null);

    // Charger les discussions
    const loadData = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/discussion");
            setData(response.data);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        loadData();

        // Quand un service est modifié/ajouté/supprimé, on recharge
        socket.on('discussion_updated', loadData);

        // Nettoyage quand le composant est démonté
        return () => {
            socket.off('discussion_updated', loadData);
        };
    }, []);

    // Ajouter ou modifier un commentaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nom || !message) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const formData = { nom, message };

        try {
            if (editId) {
                await axios.put(`https://cliniqueleseauxbackend.onrender.com/api/discussion/${editId}`, formData);
            } else {
                await axios.post("https://cliniqueleseauxbackend.onrender.com/api/discussion/post", formData);
            }
            setNom('');
            setMessage("");
            setEditId(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification", error);
        }
    };

    // Supprimer un commentaire
    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
            try {
                await axios.delete(`https://cliniqueleseauxbackend.onrender.com/api/discussion/${id}`);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    // Remplir les champs pour modification
    const handleEdit = (discussion) => {
        setNom(discussion.nom);
        setMessage(discussion.message);
        setEditId(discussion.id);
    };

    return (
        <div className="container mt-5 ab cd">
            <h2 className="text-center">Laissez un commentaire</h2>
            <div className="chat">
            <div className="card p-4 shadow-sm chat1">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="nom" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea className="form-control" id="message" rows="3" placeholder="Votre message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>
                    <button className="btn btn-primary w-50 connecter1" type="submit">
                        {editId ? "Modifier" : "Envoyer"}
                    </button>
                </form>
            </div>
            
            <ul className="list-group chat2">
                <h3 className="mt-3 d-flex justify-content-center mb-5">Liste des commentaires</h3>
                {data.map((discussion) => (
                <li key={discussion.id} className="d-block justify-content-start m1">
                    <div className="c2" style={discussion.nom === 'Clinique "LES EAUX"' ? { background: '#13da66', color: 'white' } : {}}>
                        <strong>{discussion.nom} :</strong><br />{discussion.message}<br /><br />
                    </div>
                </li>
            ))}
            </ul>    
            </div>
        </div>
    );
}

export default Discussion;
