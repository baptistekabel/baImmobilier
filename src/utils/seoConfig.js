// Configuration SEO pour toutes les pages
export const seoConfig = {
  home: {
    title: "Accueil",
    description: "BA Immobilier - Votre partenaire immobilier de confiance entre l'Afrique et les Antilles. Unir nos histoires, construire notre avenir avec des services de location, achat, vente et construction.",
    keywords: "BA Immobilier, immobilier Afrique, immobilier Antilles, location immobilier, achat maison, vente appartement, construction, partenaire immobilier, investissement immobilier",
    url: "/"
  },

  services: {
    title: "Nos Services",
    description: "Découvrez nos services immobiliers complets : location, achat, vente, rénovation et construction. BA Immobilier vous accompagne dans tous vos projets immobiliers entre l'Afrique et les Antilles.",
    keywords: "services immobiliers, location, achat, vente, rénovation, construction, expertise immobilière, conseil immobilier, gestion locative",
    url: "/services"
  },

  about: {
    title: "À Propos",
    description: "Découvrez BA Immobilier, votre partenaire de confiance dans l'immobilier. Notre mission : unir l'Afrique et les Antilles à travers des projets immobiliers d'exception.",
    keywords: "à propos BA Immobilier, histoire entreprise, mission, vision, équipe immobilier, expérience Afrique Antilles",
    url: "/about"
  },

  properties: {
    title: "Nos Biens",
    description: "Explorez notre sélection de biens immobiliers premium entre l'Afrique et les Antilles. Maisons, appartements, terrains et projets d'investissement de qualité.",
    keywords: "biens immobiliers, maisons à vendre, appartements location, terrains, investissement immobilier, propriétés Afrique, propriétés Antilles, catalogue immobilier",
    url: "/properties"
  },

  contact: {
    title: "Contact",
    description: "Contactez BA Immobilier pour tous vos projets immobiliers. Notre équipe d'experts vous accompagne dans vos démarches d'achat, vente, location ou construction.",
    keywords: "contact BA Immobilier, demande information, conseil immobilier, rendez-vous, expertise gratuite, accompagnement projet",
    url: "/contact"
  }
};

// Fonction helper pour obtenir la config SEO d'une page
export const getSeoConfig = (page) => {
  return seoConfig[page] || seoConfig.home;
};