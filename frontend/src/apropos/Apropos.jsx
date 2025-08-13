import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './apropos.css';
import photo from '../assets/les eaux.png'; // Assure-toi que le chemin est correct
import orga from '../assets/organigramme.png';

function Apropos() {
    return (
        <Container className="apropos-container">
            <h1 className="apropos-title">À Propos de Notre Clinique</h1>
            
            {/* Présentation */}
            <Row className="apropos-section d-flex align-items-start">
                <Col md={6}>
                    <img src={photo} alt="Notre Clinique" className="img-presentation" />
                </Col>
                <Col md={6}>
                    <h2 className="apropos-subtitle">Présentation</h2>
                    <p className="apropos-text">
                        Bienvenue à notre clinique, un centre médical moderne dédié à votre santé et à votre bien-être.
                        Nous mettons à votre disposition une équipe de professionnels qualifiés et des équipements de pointe
                        pour offrir des soins de qualité à tous nos patients.
                    </p>
                </Col>
            </Row>

            {/* Histoire */}
            <Row className="history-section">
                <Col>
                    <h2 className="apropos-subtitle">Notre Histoire</h2>
                    <p className="apropos-text">
                        Fondée en 2005, notre clinique a commencé avec une petite équipe de médecins passionnés par la santé.
                        Aujourd’hui, nous sommes devenus un établissement de référence offrant des soins spécialisés dans 
                        plusieurs domaines médicaux.
                    </p>
                </Col>
            </Row>

            {/* Organigramme */}
            <Row className="team-section">
                <Col>
                    <h2 className="apropos-subtitle">Notre Équipe Médicale</h2>
                    <Row className="justify-content-center">
                        <img src={orga} alt="" />
                    </Row>
                </Col>
            </Row>

            {/* Appel à l'action */}
            <Row className="cta-section">
                <Col>
                    <h2 className="apropos-subtitle">Prenez soin de votre santé</h2>
                    <p className="apropos-text">
                        Prenez rendez-vous dès aujourd’hui et bénéficiez des meilleurs soins médicaux dans notre clinique.
                    </p>
                    <Button variant="primary" href="/rendezvous" size="lg" className="cta-button">
                        Prendre Rendez-vous
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Apropos;
