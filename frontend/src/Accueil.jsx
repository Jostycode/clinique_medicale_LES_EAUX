import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Service from './services/Service.jsx';
import Examen from './examens/Examen.jsx';
import Apropos from './apropos/Apropos.jsx';
import App from './App.jsx';
import logo from "./assets/logo-transparent2.png";
import utilisateur from "./assets/utilisateur.png";
import Discussion from './discussions/Discussion.jsx';
import 'animate.css';
import './index1.css';
import Contact from './contact/Contact.jsx';

function Accueil() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'service':
        return <Service setActivePage={setActivePage}/>;
      case 'examen':
        return <Examen setActivePage={setActivePage}/>;
      case 'discussions':
        return <Discussion />;
      case 'apropos':
        return <Apropos />;
      case 'contact':
        return <Contact />;  
      default:
        return < App/>;
    }
  };

  return (
    <div className='a'>
      {/* En-tête supérieur */}
      <div className="container-fluid bg-light py-2 px-5 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo à gauche */}
          <Link to="/" className="text-decoration-none d-flex align-items-center">
            <img src={logo} alt="Logo" style={{ height: "120px" }} className="me-2" />
            <div>
              <strong className='title1'>CLINIQUE MEDICALE</strong><br />
              <strong className='title2'>"LES EAUX"</strong>
            </div>
          </Link>
          {/* Lien connexion à droite */}
          <Link to="/connexion" className="text-primary fw-semibold text-decoration-none">
            <img src={utilisateur} alt="Logo" style={{ height: "80px" }} className="me-2" />
          </Link>
        </div>
      </div>

      {/* Menu principal */}
      <div className="container-fluid shadow-sm n">
        <nav className="navbar navbar-expand-lg navbar-light px-4 w-100">
          <button
            className="navbar-toggler bg-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
             aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center " id="mainNavbar">
            <ul className="navbar-nav text-center ntaille">
                <li className="nav-item ntaille1">
                    <button
                        onClick={() => setActivePage('dashboard')}
                        className={` nav-link btn btn-link ${activePage === 'dashboard' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                    >
                        Accueil
                    </button>
                </li>

              <li className="nav-item ntaille1"> 
                <button
                    onClick={() => setActivePage('service')}
                    className={`nav-link btn btn-link ${activePage === 'service' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                >
                    Services
                </button>
                </li>

                <li className="nav-item ntaille1">
                <button
                    onClick={() => setActivePage('examen')}
                    className={`nav-link btn btn-link ${activePage === 'examen' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                >
                    Examens
                </button>
                </li>

                <li className="nav-item ntaille1">
                <button
                    onClick={() => setActivePage('discussions')}
                    className={`nav-link btn btn-link ${activePage === 'discussions' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                >
                    Discussions
                </button>
                </li>

                <li className="nav-item ntaille1">
                <button
                    onClick={() => setActivePage('apropos')}
                    className={`nav-link btn btn-link ${activePage === 'apropos' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                >
                    Apropos
                </button>
                </li>


                <li className="nav-item ntaille1">
                <button
                    onClick={() => setActivePage('contact')}
                    className={`nav-link btn btn-link ${activePage === 'contact' ? 'text-white fw-bold bg-danger' : 'text-white'}`}
                >
                    Contact
                </button>
                </li>

            </ul>
          </div>
        </nav>
      </div>

      {/* Contenu dynamique en dessous */}
      <main className="animate__animated animate__fadeIn background">
        {renderContent()}
      </main>
    </div>
  );
}

export default Accueil;
