import React, { useState } from "react";

function Contact() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !message) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const numeroWhatsApp = "237694786507";
        const texte = `Bonjour, je suis ${name}.\nNuméro : ${phone}\n\n${message}`;
        const lienWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texte)}`;

        window.location.href = lienWhatsApp;
    };

    const handleSendEmail = () => {
        if (!name || !phone || !message) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const subject = `Message de ${name}`;
        const body = `Nom : ${name}\nNuméro : ${phone}\n\n${message}`;
        const mailtoLink = `mailto:cliniqueleseaux@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };

    return (
        <div className="row g-4 align-items-center bgdc pb-4 pt-3">
            {/* Formulaire de contact */}
            <div className="col-lg-5 col-xl-5 contact-form wow fadeInLeft marge" data-wow-delay="0.1s">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-lg-12 col-xl-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control bg-transparent border border-white"
                                    id="name"
                                    placeholder="Votre Nom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="name">Nom</label>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xl-6">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control bg-transparent border border-white"
                                    id="phone"
                                    placeholder="Numéro"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <label htmlFor="phone">Numéro</label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating">
                                <textarea
                                    className="form-control bg-transparent border border-white"
                                    placeholder="Votre message"
                                    id="message"
                                    style={{ height: "160px" }}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                ></textarea>
                                <label htmlFor="message">Message</label>
                            </div>
                        </div>
                        <div className="col-12 d-flex gap-3">
                            <button type="submit" className="btn btn-success text-white w-50 py-3">
                                Envoyer sur WhatsApp
                            </button>
                            <button type="button" className="btn btn-primary text-white w-50 py-3" onClick={handleSendEmail}>
                                Envoyer par mail
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Coordonnées + carte */}
            <div className="col-lg-5 col-xl-5 wow fadeInRight w-50 frm" data-wow-delay="0.3s">
                <div className="rounded h-100 mt-4">
                    <iframe
                        className="rounded w-100"
                        style={{ height: "500px" }}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1987.9466490471227!2d11.86313291740572!3d-4.788344763239704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2scg!4v1746183108573!5m2!1sfr!2scg"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        title="Localisation"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Contact;
