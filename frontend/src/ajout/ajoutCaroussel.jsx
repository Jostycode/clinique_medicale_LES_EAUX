import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from '../socket';
import '../index1.css';

function CarrouselCRUD() {
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    // Charger les carrousels
    const loadData = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/caroussel");
            setData(response.data);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        loadData();

         // Quand un service est modifié/ajouté/supprimé, on recharge
                 socket.on('carrousel_updated', loadData);
        
                 // Nettoyage quand le composant est démonté
                 return () => {
                     socket.off('carrousel_updated', loadData);}
    }, []);

    // Ajouter ou modifier un caroussel
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) formData.append("image", image);

        try {
            if (editId) {
                await axios.put(`/api/carrousel/${editId}`, formData);
            } else {
                await axios.post("https://cliniqueleseauxbackend.onrender.com/api/caroussel/post", formData);
            }
            setImage(null);
            setEditId(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification", error);
        }
    };

    // Supprimer un caroussel
    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce caroussel ?")) {
            try {
                await axios.delete(`https://cliniqueleseauxbackend.onrender.com/api/caroussel/${id}`);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    // Préparer la modification d'un caroussel
    const handleEdit = (caroussel) => {
        setEditId(caroussel.id);
    };

    return (
        <div className="commentaire">
            <div className="container pt-5">
                <h2 className="text-center" style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' }}>Gestion des carrousels</h2>
                    <div className="chat">
                        <div className="card p-4 shadow-sm c1 mb-4 chat1">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">{editId ? "Modifier" : "Ajouter"}</button>
                            </form>
                        </div>

                        <div className="list-group chat2">
                            <h3 className="mt-5" style={{ color: '#13da66' }}>Liste des Carrousels</h3>
                            <ul className="list-group mt-3">
                                {data.map((caroussel) => (
                                    <li key={caroussel.id} className="d-flex justify-content-start m1">
                                        <div className="c2">
                                            <img src={`http://localhost:8000${caroussel.image}`} alt={caroussel.titre} width="100" className="mb-2" />
                                            <button onClick={() => handleEdit(caroussel)} className="btn btn-sm btn-warning me-2">Modifier</button>
                                            <button onClick={() => handleDelete(caroussel.id)} className="btn btn-sm btn-danger">Supprimer</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div>
            </div>
        </div>

    );
}

export default CarrouselCRUD;
