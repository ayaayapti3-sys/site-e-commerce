"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  LockKeyhole,
  Mail,
  MapPin,
  X,
} from "lucide-react";

import styles from "./contact-modal.module.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Impossible d’envoyer votre message."
        );
      }

      setStatus("success");
      setFormData(initialForm);
    } catch (error) {
      console.error("Erreur formulaire contact :", error);

      setStatus("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue. Veuillez réessayer."
      );
    }
  };

  const handleClose = () => {
    setStatus("idle");
    setErrorMessage("");
    setFormData(initialForm);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fermer le formulaire"
        >
          <X size={22} strokeWidth={1.4} />
        </button>

        <div className={styles.modalGrid}>
          <aside className={styles.brandPanel}>
            <div className={styles.brandTop}>
              <div className={styles.monogram}>MÉ</div>
              <span>Maison Élyra</span>
            </div>

            <div className={styles.brandContent}>
              <span className={styles.brandLine} />

              <h2 id="contact-modal-title">
                Nous
                <br />
                contacter
              </h2>

              <p>
                Une question, un avis ou une demande particulière ? Notre
                équipe vous répondra avec plaisir.
              </p>
            </div>

            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <Mail size={17} strokeWidth={1.4} />

                <div>
                  <span>E-mail</span>
                  <p>contact@maisonelyra.com</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <MapPin size={18} strokeWidth={1.4} />

                <div>
                  <span>Adresse</span>
                  <p>Casablanca, Maroc</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Clock3 size={18} strokeWidth={1.4} />

                <div>
                  <span>Horaires</span>
                  <p>Lun – Ven · 9h00 – 18h00</p>
                </div>
              </div>
            </div>
          </aside>

          <div className={styles.formPanel}>
            {status === "success" ? (
              <div className={styles.successPanel}>
                <div className={styles.successIcon}>
                  <Check size={23} strokeWidth={1.5} />
                </div>

                <span className={styles.eyebrow}>
                  Merci pour votre message
                </span>

                <h2>
                  Message
                  <br />
                  envoyé
                </h2>

                <span className={styles.successLine} />

                <p>
                  Votre demande a bien été transmise à notre équipe. Nous vous
                  répondrons dans les meilleurs délais.
                </p>

                <button
                  type="button"
                  className={styles.successButton}
                  onClick={handleClose}
                >
                  <span>Fermer</span>
                  <ArrowRight size={17} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <>
                <header className={styles.mobileHeader}>
                  <span className={styles.eyebrow}>Maison Élyra</span>

                  <h2>Nous contacter</h2>

                  <p>
                    Une question, un avis ou une demande particulière ?
                    Écrivez-nous.
                  </p>
                </header>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.fieldsRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-first-name">Prénom</label>

                      <input
                        id="contact-first-name"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        maxLength={60}
                        required
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-last-name">Nom</label>

                      <input
                        id="contact-last-name"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        maxLength={60}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-email">Adresse e-mail</label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="exemple@email.com"
                      maxLength={120}
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-subject">Type de demande</label>

                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Sélectionnez un sujet
                      </option>

                      <option value="Message">Message</option>
                      <option value="Avis">Donner un avis</option>
                      <option value="Question produit">
                        Question sur un produit
                      </option>
                      <option value="Commande">
                        Question sur une commande
                      </option>
                      <option value="Livraison et retours">
                        Livraison et retours
                      </option>
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="contact-message">Votre message</label>

                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Écrivez votre message ici..."
                      rows={5}
                      maxLength={3000}
                      required
                    />
                  </div>

                  {status === "error" && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === "sending"}
                  >
                    <span>
                      {status === "sending"
                        ? "Envoi en cours..."
                        : "Envoyer le message"}
                    </span>

                    <ArrowRight size={18} strokeWidth={1.5} />
                  </button>

                  <p className={styles.privacy}>
                    <LockKeyhole size={13} strokeWidth={1.4} />
                    Vos informations restent confidentielles.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}