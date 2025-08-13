// import Menu from '../Menu.jsx';
import Contact from '../contact/Contact';
import axios from 'axios';
import { useEffect, useState } from "react";
import socket from '../socket';
import { Link } from 'react-router-dom';

function Service({ setActivePage }) {
    const [data, setData] = useState([]);

    const loaddata = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/service");
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    };

    useEffect(() => {
        loaddata();

        // Quand un service est modifié/ajouté/supprimé, on recharge
        socket.on('service_updated', loaddata);

        // Nettoyage quand le composant est démonté
        return () => {
            socket.off('service_updated', loaddata);
        };
    }, []);

    return (
        <>
            <div className="container-fluid service py-5">
                <div className="container py-5">
                    <div className="section-title mb-5">
                        <div className="sub-style">
                            <h4 className="sub-title px-3 mb-0">Nos spécialités</h4>
                        </div>
                    </div>

                    <div className="row g-4 justify-content-center srv">
                        {data.map(da => (
                            <div key={da.id} className="col-md-6 col-lg-4 col-xl-3">
                                <div className="service-item rounded">
                                    <div className="service-img rounded-top">
                                        
                                        <img src={`https://cliniqueleseauxbackend.onrender.com${da.image}`} className="img-fluid rounded-top w-100" alt={da.titre} />
                                    </div>
                                    <div className="service-content rounded-bottom bg-light p-4">
                                        <h5 className="mb-4">{da.titre}</h5>
                                        <p className="mb-4">{da.paragraphe}</p>
                                        <button to="" className="btn btn-primary rounded-pill text-white py-2 px-4 mb-2 btnd" onClick={() => setActivePage('contact')}>contactez-nous</button>
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

export default Service;
