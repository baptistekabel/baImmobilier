import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.services": "Nos Services",
      "nav.about": "Qui sommes-nous ?",
      "nav.properties": "Propriétés",
      "nav.contact": "Contact",

      // Hero Section
      "hero.title": "Unir nos histoires, construire notre avenir.",
      "hero.subtitle": "Votre partenaire immobilier de confiance entre l'Afrique et les Antilles",
      "hero.cta.discover": "Découvrir nos biens",
      "hero.cta.contact": "Nous contacter",

      // Services
      "services.title": "Nos Services",
      "services.location.title": "Location",
      "services.location.desc": "Trouvez votre lieu de vie idéal",
      "services.buy.title": "Achat",
      "services.buy.desc": "Investissez dans l'immobilier avec confiance",
      "services.sell.title": "Vente",
      "services.sell.desc": "Vendez votre bien au meilleur prix",
      "services.renovation.title": "Rénovation",
      "services.renovation.desc": "Modernisez et valorisez votre patrimoine",
      "services.construction.title": "Construction",
      "services.construction.desc": "Concrétisez vos projets de A à Z",
      "services.consulting.title": "Conseil",
      "services.consulting.desc": "Accompagnement personnalisé dans vos projets immobiliers",

      // Why Choose Us
      "why.title": "Pourquoi nous choisir ?",
      "why.transparency.title": "Transparence totale",
      "why.transparency.desc": "Tous nos process sont clairs et transparents",
      "why.diaspora.title": "Diaspora & Afrique connectées",
      "why.diaspora.desc": "Nous unissons deux mondes, deux cultures",
      "why.expertise.title": "Formation ESG, expérience Cogedim et Foncia",
      "why.expertise.desc": "Une expertise immobilière reconnue et certifiée",

      // About
      "about.title": "À propos d'Idriss Ba",
      "about.content": "Diplômé d'un Master en Immobilier de l'ESG, Idriss Ba a forgé son expertise chez les leaders du secteur : Cogedim, l'un des plus grands promoteurs de France, puis chez Foncia. Originaire de Guadeloupe, il unit sa passion pour l'immobilier à sa connaissance des marchés antillais et africains.",

      // Newsletter
      "newsletter.title": "Restez informé",
      "newsletter.subtitle": "Recevez nos opportunités en Afrique et aux Antilles",
      "newsletter.placeholder": "Votre adresse email",
      "newsletter.button": "S'abonner",

      // Footer
      "footer.slogan": "Unir nos histoires, construire notre avenir.",
      "footer.links": "Liens utiles",
      "footer.legal": "Mentions légales",
      "footer.privacy": "Politique de confidentialité",
      "footer.contact.title": "Contact",
      "footer.contact.phone": "Téléphone",
      "footer.contact.email": "Email",
      "footer.social": "Suivez-nous",

      // Contact Form
      "contact.title": "Contactez-nous",
      "contact.name": "Nom complet",
      "contact.email": "Email",
      "contact.phone": "Téléphone",
      "contact.subject": "Sujet",
      "contact.message": "Message",
      "contact.send": "Envoyer",

      // Properties
      "properties.title": "Nos Biens",
      "properties.filter.location": "Localisation",
      "properties.filter.type": "Type",
      "properties.filter.price": "Prix",
      "properties.filter.surface": "Surface",
      "properties.details": "Voir détails"
    }
  },
  wo: {
    translation: {
      // Navigation
      "nav.home": "Kër",
      "nav.services": "Sunuy liggéey",
      "nav.about": "Kan la nu?",
      "nav.properties": "Kër yi",
      "nav.contact": "Jokkul ak nu",

      // Hero Section
      "hero.title": "Bokk sunuy taariix, jëfandikoo sunuy àdduna",
      "hero.subtitle": "Samay mbëkk-kër bu nekk ci Afrig ak Antiy yi",
      "hero.cta.discover": "Gis sunuy kër yi",
      "hero.cta.contact": "Jokkul ak nu",

      // Services
      "services.title": "Sunuy liggéey",
      "services.location.title": "Këru jaar",
      "services.location.desc": "Jaar kër bu baax",
      "services.buy.title": "Jënd",
      "services.buy.desc": "Jënd kër ak sonn",
      "services.sell.title": "Jaay",
      "services.sell.desc": "Jaay sa kër ak njariñ",
      "services.renovation.title": "Soppi",
      "services.renovation.desc": "Soppiku sa kër",
      "services.construction.title": "Jëf",
      "services.construction.desc": "Jëf kër bu bees",
      "services.consulting.title": "Ngënëm",
      "services.consulting.desc": "Jàppale ci kër ngir bokk ak yow",

      // Why Choose Us
      "why.title": "Lu tax nga tànn nu?",
      "why.transparency.title": "Tëruwul bu mat",
      "why.transparency.desc": "Sunuy liggéey dafay tëruwul",
      "why.diaspora.title": "Diaspora ak Afrig yu bokk",
      "why.diaspora.desc": "Danu bokk ñaari àdduna, ñaari laaj",
      "why.expertise.title": "Jàng ESG, baax Cogedim ak Foncia",
      "why.expertise.desc": "Xam-xam bu mat ci kër bu gëstu",

      // About
      "about.title": "Ci lu jëm ci Idriss Ba",
      "about.content": "Idriss Ba jàngal Master ci kër ci ESG, jëfal ci bopp-bopp yu mat: Cogedim, Foncia. Juddu la ci Gwadalup, bokk na sa mbëgeel ci kër ak sa xam-xam ci Antiy ak Afrig.",

      // Newsletter
      "newsletter.title": "Am-am xibaar",
      "newsletter.subtitle": "Am xibaar yu bees ci Afrig ak Antiy",
      "newsletter.placeholder": "Sa email",
      "newsletter.button": "Bind",

      // Footer
      "footer.slogan": "Bokk sunuy taariix, jëfandikoo sunuy àdduna.",
      "footer.links": "Lëkk yu bees",
      "footer.legal": "Jub yi",
      "footer.privacy": "Sutura mbëgg",
      "footer.contact.title": "Jokkul",
      "footer.contact.phone": "Telefon",
      "footer.contact.email": "Email",
      "footer.social": "Topp nu",

      // Contact Form
      "contact.title": "Jokkul ak nu",
      "contact.name": "Tur bu mat",
      "contact.email": "Email",
      "contact.phone": "Telefon",
      "contact.subject": "Lu jëm",
      "contact.message": "Bataaxal",
      "contact.send": "Yóbbu",

      // Properties
      "properties.title": "Sunuy kër yi",
      "properties.filter.location": "Fan",
      "properties.filter.type": "Jëf",
      "properties.filter.price": "Njariñ",
      "properties.filter.surface": "Mbedd",
      "properties.details": "Gis lu ëpp"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;