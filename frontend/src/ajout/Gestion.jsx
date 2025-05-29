// App.js
import React, { useState } from 'react';
import ServiceCRUD from './ajoutService.jsx';
import ExamenCRUD from './ajoutExamen.jsx';
import CarrouselCRUD from './ajoutCaroussel.jsx';
import Inscription from './Inscription.jsx';
import Discussion from './ajoutDiscussion.jsx';
import 'animate.css';
import '../index1.css';

function Gestion() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case 'service':
        return <ServiceCRUD />;
      case 'examen':
        return <ExamenCRUD />;
      case 'carrousel':
        return <CarrouselCRUD />;
      case 'inscription':
        return <Inscription />;
      case 'discussions':
        return <Discussion />;
      default:
        return <h2>Bienvenue sur le Tableau de bord</h2>;
    }
  };

  return (
    <div className="d-flex">
      {/* Toggle button for mobile */}
      <button className="btn btn-primary d-md-none m-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`bg-dark text-white p-3 vh-100 sidebar ${isSidebarOpen ? 'd-block' : 'd-none'} d-md-block`} style={{ width: "250px" }}>
        <h4 className="text-center mb-4">
          <strong className='title1'>CLINIQUE MEDICALE</strong><br />
          <strong className='title2'>"LES EAUX"</strong>
        </h4>
        <ul className="nav flex-column">
          <li className={`nav-item mb-2 ${activePage === 'dashboard' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('dashboard')} className="nav-link text-white btn btn-link w-100 text-start">Dashboard</button>
          </li>
          <li className={`nav-item mb-2 ${activePage === 'service' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('service')} className="nav-link text-white btn btn-link w-100 text-start">Gestion de Service</button>
          </li>
          <li className={`nav-item mb-2 ${activePage === 'examen' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('examen')} className="nav-link text-white btn btn-link w-100 text-start">Gestion de Examen</button>
          </li>
          <li className={`nav-item mb-2 ${activePage === 'carrousel' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('carrousel')} className="nav-link text-white btn btn-link w-100 text-start">Gestion de carrousel</button>
          </li>
          <li className={`nav-item mb-2 ${activePage === 'inscription' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('inscription')} className="nav-link text-white btn btn-link w-100 text-start">Gestion d'inscription</button>
          </li>
          <li className={`nav-item mb-2 ${activePage === 'discussions' ? 'bg-secondary rounded' : ''}`}>
            <button onClick={() => setActivePage('discussions')} className="nav-link text-white btn btn-link w-100 text-start">Gestion de commentaire</button>
          </li>
        </ul>
      </div>

      {/* Content dynamique */}
      <div className="p-2 flex-grow-1 animate__animated animate__fadeIn background">
        {renderContent()}
      </div>
    </div>
  );
}

export default Gestion;
