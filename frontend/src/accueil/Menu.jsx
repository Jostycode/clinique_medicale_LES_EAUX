import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent2.png"; // adapte le chemin si nécessaire

function Menu() {
    return (
        <>
            {/* En-tête supérieur */}
            <div className="container-fluid bg-light py-2 px-5 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                    {/* Logo à gauche */}
                    <a href="../assets/logo-transparent2.png">
                        <img src={logo} alt="Logo" className="logo" style={{ height: "40px" }} />
                    </a>
                    {/* Lien connexion à droite */}
                    <Link to="/connexion" className="text-primary fw-semibold text-decoration-none">
                        Connexion
                    </Link>
                </div>
            </div>

            {/* Menu principal */}
            <div className="container-fluid bg-white shadow-sm sticky-top">
                <nav className="navbar navbar-expand-lg navbar-light px-4">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
                        <ul className="navbar-nav text-center">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Accueil</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/services" className="nav-link">Examen</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">Discussions</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">À propos</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Bouton rendez-vous à droite */}
                    <div className="d-none d-lg-block ms-auto">
                        <Link to="/appointment" className="btn btn-primary rounded-pill text-white px-4">
                            Rendez-vous
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Menu;
