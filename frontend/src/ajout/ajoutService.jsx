import React, { useEffect, useState } from "react";
import axios from "axios";
 
import socket from '../socket';

function ServiceCRUD() {
    const [data, setData] = useState([]);
    const [titre, setTitre] = useState("");
    const [paragraphe, setParagraphe] = useState("");
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    // Charger les services
    const loadData = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/service");
            setData(response.data);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        loadData();
        // Quand un service est modifié/ajouté/supprimé, on recharge
        socket.on('caroussel_updated', loadData);

        // Nettoyage quand le composant est démonté
        return () => {
            socket.off('caroussel_updated', loadData);}
    }, []);

    // Ajouter ou modifier un service
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("titre", titre);
        formData.append("paragraphe", paragraphe);
        if (image) formData.append("image", image);

        try {
            if (editId) {
                await axios.put(`https://cliniqueleseauxbackend.onrender.com/api/service/${editId}`, formData);
            } else {
                await axios.post("https://cliniqueleseauxbackend.onrender.com/api/service/post", formData);
            }
            setTitre("");
            setParagraphe("");
            setImage(null);
            setEditId(null);
            loadData();
        } catch (error) {
            console.error("Erreur lors de l'ajout/modification", error);
        }
    };

    // Supprimer un service
    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer ce service ?")) {
            try {
                await axios.delete(`https://cliniqueleseauxbackend.onrender.com/api/service/${id}`);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    // Remplir les champs pour modification
    const handleEdit = (service) => {
        setTitre(service.titre);
        setParagraphe(service.paragraphe);
        setEditId(service.id);
    };

    return (
        <div className="commentaire">
            <div className="container pt-5">
                <h2 className="text-center" style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' }}>Gestion des Services</h2>
                <div className="discussion chat">
                    {/* Formulaire avec carte */}
                    <div className="card p-4 shadow-sm c1 mb-4 chat1">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="titre" className="form-label">Titre</label>
                                <input type="text" className="form-control" id="titre" placeholder="Entrez le titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="paragraphe" className="form-label">Paragraphe</label>
                                <textarea className="form-control" id="paragraphe" placeholder="Entrez le paragraphe" value={paragraphe} onChange={(e) => setParagraphe(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <button className="btn btn-primary w-100 envoyer" type="submit">{editId ? "Modifier" : "Ajouter"}</button>
                        </form>
                    </div>

                    {/* Liste avec carte */}
                    <div className="message chat2">
                        <h3 className="mt-2" style={{ color: '#13da66' }}>Liste des Services</h3>
                        <ul className="list-group mt-3">
                            {data.map((service) => (
                                <li key={service.id} className="d-flex justify-content-start m1">
                                    <div className="c2">
                                        <img src={`https://cliniqueleseauxbackend.onrender.com${service.image}`} alt={service.titre} width="100" className="mb-2" />
                                        <strong>Titre :</strong> {service.titre} <br />
                                        <strong>Paragraphe :</strong> {service.paragraphe} <br /><br />
                                        <button onClick={() => handleEdit(service)} className="btn btn-sm btn-warning me-2">Modifier</button>
                                        <button onClick={() => handleDelete(service.id)} className="btn btn-sm btn-danger">Supprimer</button>
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

export default ServiceCRUD;
