import axios from 'axios';
import { useEffect, useState } from "react";
import socket from '../socket'
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

function Carrousel() {
    const [data, setData] = useState([]);

    const loaddata = async () => {
        try {
            const response = await axios.get("https://cliniqueleseauxbackend.onrender.com/api/carrousel");
            // console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des données :", error);
        }
    };

    useEffect(() => {
        loaddata();
         // Quand un service est modifié/ajouté/supprimé, on recharge
         socket.on('carrousel_updated', loaddata);

         // Nettoyage quand le composant est démonté
         return () => {
             socket.off('carrousel_updated', loaddata);}
    }, []);

    return (
        <>
            <Carousel fade className='carrousel'>
                {data.map((item, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100"
                            src={`https://cliniqueleseauxbackend.onrender.com${item.image}`} // ou item.image directement si image complète
                            alt={`Slide ${index}`}
                            style={{ height: '60vh', objectFit: 'cover' }}
                        />
                        <Carousel.Caption>
                            <p className='carrouseltitle'><strong>Bienvenue à <br />
                            la clinique "LES EAUX"</strong>
                            </p>              
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default Carrousel;
