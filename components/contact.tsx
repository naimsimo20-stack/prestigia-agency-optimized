"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const subject = formData.get("subject")
    const messageText = formData.get("message")

    try {
      const encodedData = JSON.stringify({
        name,
        email,
        phone,
        subject,
        message: messageText,
      })

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: encodedData,
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("✓ Message reçu ! Nous vous répondrons bientôt.")
        if (formRef.current) {
          formRef.current.reset()
        }
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(`✗ Erreur: ${data.error}`)
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error)
      setMessage("✗ Erreur serveur. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  const handleEmailClick = () => {
    window.location.href =
      "mailto:contact@prestigia-agency.com?subject=Demande%20d'information%20-%20Prestigia%20Agency"
  }

  const handlePhoneClick = () => {
    window.location.href = "https://wa.me/212652768993?text=Bonjour%20Je%20veux%20plus%20d'informations"
  }

  const handleLocationClick = () => {
    window.location.href = "https://maps.google.com/?q=Bld+Qods+The+Gold+Center+Casablanca+Ain+Chock"
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Parlons de Votre <span className="text-accent">Projet</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons transformer votre vision.
          </p>
        </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12" aria-label="Moyens de contact principaux">
          <button
            type="button"
            onClick={handleEmailClick}
            className="bg-background border border-accent/10 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 hover:shadow-accent/20 transition-all duration-300 hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Envoyer un email à Prestigia Agency"
          >
            <Mail className="w-10 h-10 text-accent mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-foreground font-bold mb-2">Email</h3>
            <p className="text-muted-foreground hover:text-accent transition-colors">contact@prestigia-agency.com</p>
            <p className="text-xs text-accent/60 mt-2">Envoyer un email</p>
          </button>

          <button
            type="button"
            onClick={handlePhoneClick}
            className="bg-background border border-accent/10 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 hover:shadow-accent/20 transition-all duration-300 hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Appeler Prestigia Agency sur WhatsApp"
          >
            <Phone className="w-10 h-10 text-accent mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-foreground font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground hover:text-accent transition-colors">+212 652 768 993</p>
            <p className="text-xs text-accent/60 mt-2">Appeler</p>
          </button>

          <button
            type="button"
            onClick={handleLocationClick}
            className="bg-background border border-accent/10 rounded-2xl p-6 text-center shadow-lg shadow-accent/5 hover:shadow-accent/20 transition-all duration-300 hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Voir la localisation de Prestigia Agency sur Google Maps"
          >
            <MapPin className="w-10 h-10 text-accent mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-foreground font-bold mb-2">Adresse</h3>
            <p className="text-muted-foreground">
              Bld Qods - The Gold Center, Étage 1, Bureau 2, Casablanca Ain Chock
            </p>
            <p className="text-xs text-accent/60 mt-2">Ouvrir dans Google Maps</p>
          </button>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Formulaire de contact principal"
        >

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="phone"
                placeholder="Votre téléphone"
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
              <input
                type="text"
                name="subject"
                placeholder="Sujet"
                required
                className="bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <textarea
              name="message"
              placeholder="Votre message"
              rows={5}
              required
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
            ></textarea>

            {message && (
              <div
                className={`p-3 rounded-lg text-center font-semibold ${message.includes("✓") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-background py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 font-semibold text-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi..." : "Envoyer le Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
