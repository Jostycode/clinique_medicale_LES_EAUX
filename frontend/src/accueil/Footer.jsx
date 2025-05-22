import '../index1.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* Contenu du menu et adresse */}
                <div className="footer-container">
                    <ul className="footer-menu">
                        <li><a href="#">Accueil</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Examens</a></li>
                        <li><a href="#">Discussions</a></li>
                        <li><a href="#">À Propos</a></li>
                        <li><a href="#">rendez vous</a></li>
                    </ul>

                    <div className="footer-address">
                        <p>123 Rue Exemple</p>
                        <p>Ville, Pays</p>
                        <p>Email: contact@example.com</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer-copyright">
                    &copy; 2025 - Tous droits réservés à la clinique les eaux
                </div>
            </div>
        </footer>
    )
}

export default Footer;
