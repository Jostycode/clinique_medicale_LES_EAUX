import React, { useState } from "react";
import axios from "axios";
import Gestion from "./Gestion"; // importe directement la page gestion
import Gestion1 from "./Gestion1"; // importe directement la page gestion
import '../index1.css';

function Connexion() {
    const [poste, setPoste] = useState("");
    const [mdp, setMdp] = useState("");
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://cliniqueleseauxbackend.onrender.com/api/connexion", { poste, mdp });
            if (response.data.success) {
                setIsConnected(true);
            } else {
                setError("Nom ou mot de passe incorrect");
            }
        } catch (error) {
            setError("Erreur de connexion au serveur");
        }
    };

    // 🎯 Affichage conditionnel après connexion :
    if (isConnected) {
        if (poste.toLowerCase() === "receptionniste") {
            return <Gestion1 />;
        } else {
            return <Gestion />;
        }
    }

    return (
        <div className="container-fluid bgd">
            <div className="p-5 forms">
                <h2 className="text-center">Connexion</h2>
                <div className="card p-4 shadow-sm">
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-danger">{error}</p>}
                        <div className="mb-3">
                            <label htmlFor="poste" className="form-label">Poste</label>
                            <input
                                type="text"
                                className="form-control"
                                id="poste"
                                value={poste}
                                onChange={(e) => setPoste(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mdp" className="form-label">Mot de passe</label>
                            <input
                                type="password"
                                className="form-control"
                                id="mdp"
                                value={mdp}
                                onChange={(e) => setMdp(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary w-25 connecter" type="submit">Se connecter</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Connexion;
