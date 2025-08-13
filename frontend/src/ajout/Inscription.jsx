import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
 
import socket from '../socket';
// import "../index1.css";


function Inscription() {
    const [data, setData] = useState([]);
    const [nom, setNom] = useState("");
    const [poste, setPoste] = useState("");
    const [mdp, setMdp] = useState("");
    const [editId, setEditId] = useState(null);

    // Charger les discussions
    const loadData = async () => {
        try {
            const response = await axios.get(`https://cliniqueleseauxbackend.onrender.com/api/inscription`);
            setData(response.data);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        console.log("Composant monté");
        loadData();

        // Quand un service est modifié/ajouté/supprimé, on recharge
        socket.on('caroussel_updated', loadData);

        // Nettoyage quand le composant est démonté
        return () => {
            socket.off('caroussel_updated', loadData);}
    }, []);

    // Ajouter ou modifier un commentaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!nom || !poste || !mdp) {
            alert("Veuillez remplir tous les champs");
            return;
        }

        const formData = { nom, poste, mdp };

        try {
            if (editId) {
                await axios.put(`https://cliniqueleseauxbackend.onrender.com/api/inscription/${editId}`, formData);
            } else {
                await axios.post(`https://cliniqueleseauxbackend.onrender.com/api/inscription/post`, formData);
            }
            setNom("");
            setPoste("");
            setMdp("");
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
                await axios.delete(`https://cliniqueleseauxbackend.onrender.com/api/inscription/${id}`);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    // Remplir les champs pour modification
    const handleEdit = (inscription) => {
        setNom(inscription.nom);
        setPoste(inscription.poste);
        setMdp(inscription.mdp);
        setEditId(inscription.id);
    };

    return (
        <>
            <div className="commentaire">
            <div className="container pt-5" >
            <h2 className="text-center" style={{textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)', }}>Inscription</h2>
            <div className="chat">
                <div className="card p-4 shadow-sm chat1">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" id="nom" placeholder="Entrez votre nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="poste" className="form-label">Poste</label>
                            <input type="text" className="form-control" id="poste" placeholder="Entrez votre nom" value={poste} onChange={(e) => setPoste(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mdp" className="form-label">Mdp</label>
                            <input type="password" className="form-control" id="mdp" placeholder="Entrez votre nom" value={mdp} onChange={(e) => setMdp(e.target.value)} required />
                        </div>
                        <button className="btn-primary w-100 envoyer" type="submit">
                            {editId ? "Modifier" : "Envoyer"}
                        </button>
                    </form>
                </div>

                <div className="chat2">
                    <h3 className="mt-5" style={{color: '#13da66',}}>liste des inscrits</h3>
                    <ul className="list-group mt-3">
                        {data.map((inscription) => (
                            <li key={inscription.id} className="d-flex justify-content-start m1">
                                <div className="c2">
                                    <strong>Nom : {inscription.nom}</strong> <br/>
                                    <strong>Poste : {inscription.poste}</strong> <br/>
                                    <strong>Mdp : {inscription.mdp}</strong> <br/>
                                    <button onClick={() => handleEdit(inscription)} className="btn btn-sm btn-warning me-2">Modifier</button>
                                    <button onClick={() => handleDelete(inscription.id)} className="btn btn-sm btn-danger">Supprimer</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            </div>
            
            </div>
        </div>
        </>
        
    );
}

export default Inscription;