import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import socket from '../socket';
// import Menu from '../Menu.jsx';

function Examen({ setActivePage }) {
    const [data, setData] = useState([]);

    // Charger les examens depuis l'API
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
            socket.off('examen_updated', loadData);
        };
    }, []);

    return (
        <>
            <div className="container-fluid feature py-5">
                <div className="container py-5">
                    <div className="section-title mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="sub-style">
                            <h4 className="sub-title px-3 mb-0">Nos examens</h4>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {/* Map sur les données des examens */}
                        {data.map((examen) => (
                            <div className="col-md-6 col-lg-4 col-xl-3 wow fadeInUp" key={examen.id} data-wow-delay="0.1s">
                                <div className="row-cols-1 feature-item p-4">
                                    <div className="col-12">
                                        <div className="feature-icon mb-4">
                                            <div className="">
                                                <a href={`https://cliniqueleseauxbackend.onrender.com${examen.image}`} target="_blank" rel="noopener noreferrer">
                                                    <img src={`https://cliniqueleseauxbackend.onrender.com${examen.image}`} className="p-1 d-inline-flex bg-white rounded taille" alt={examen.titre} />
                                                </a>
                                            </div>
                                        </div><br />
                                        <div className="feature-content d-flex flex-column">
                                            <h5 className="mb-4">{examen.titre}</h5>
                                            <p className="mb-0">{examen.paragraphe}</p><br /><br />
                                            <Link to="#" className="btn btn-primary rounded-pill text-white py-2 px-2 mb-2 btnc" onClick={() => setActivePage('contact')}>contactez-nous</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Examen;
