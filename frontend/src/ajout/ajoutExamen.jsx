import React, { useEffect, useState } from "react";
import axios from "axios";
 
import socket from '../socket';

function ExamenCRUD() {
    const [data, setData] = useState([]);
    const [titre, setTitre] = useState("");
    const [paragraphe, setParagraphe] = useState("");
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    // Charger les examens
    const loadData = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/examen");
            setData(response.data);
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        loadData();

        // Quand un service est modifié/ajouté/supprimé, on recharge
        socket.on('examen_updated', loadData);

        // Nettoyage quand le composant est démonté
        return () => {
            socket.off('examen_updated', loadData);}
    }, []);

    // Ajouter ou modifier un examen
    const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("titre", titre);
            formData.append("paragraphe", paragraphe);
            if (image) formData.append("image", image);
    
            try {
                if (editId) {
                    await axios.put(`https://cliniqueleseauxbackend.onrender.com/api/examen/${editId}`, formData);
                } else {
                    await axios.post("https://cliniqueleseauxbackend.onrender.com/api/examen/post", formData);
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

    // Supprimer un examen
    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet examen ?")) {
            try {
                await axios.delete(`https://cliniqueleseauxbackend.onrender.com/api/examen/${id}`);
                loadData();
            } catch (error) {
                console.error("Erreur lors de la suppression", error);
            }
        }
    };

    // Remplir les champs pour modification
    const handleEdit = (examen) => {
        setImage(examen.image);
        setTitre(examen.titre);
        setParagraphe(examen.paragraphe);
        setEditId(examen.id);
    };

    return (
        <div className="commentaire">
            <div className="container pt-5">
                <h2 className="text-center" style={{ textShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)' }}>Gestion des Examens</h2>
                    <div className="chat">
                        <div className="card p-4 shadow-sm c1 mb-4 chat1">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Titre</label>
                                    <input type="text" className="form-control" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Paragraphe</label>
                                    <textarea className="form-control" placeholder="Paragraphe" value={paragraphe} onChange={(e) => setParagraphe(e.target.value)} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">{editId ? "Modifier" : "Ajouter"}</button>
                            </form>
                        </div>

                        <div className="list-group chat2">
                            <h3 className="mt-5" style={{ color: '#13da66' }}>Liste des Examens</h3>
                            <ul className="list-group mt-3">
                                {data.map((examen) => (
                                    <li key={examen.id} className="d-flex justify-content-start m1">
                                        <div className="c2">
                                            <img src={`https://cliniqueleseauxbackend.onrender.com${examen.image}`} alt={examen.titre} width="100" className="mb-2" />
                                            <strong>Titre :</strong> {examen.titre} <br />
                                            <strong>Paragraphe :</strong> {examen.paragraphe} <br /><br />
                                            <button onClick={() => handleEdit(examen)} className="btn btn-sm btn-warning me-2">Modifier</button>
                                            <button onClick={() => handleDelete(examen.id)} className="btn btn-sm btn-danger">Supprimer</button>
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

export default ExamenCRUD;
