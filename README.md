# 🏡 BA Immobilier - Site Web

Site web officiel de BA Immobilier, votre partenaire immobilier de confiance entre l'Afrique et les Antilles.

## 🚀 Déploiement rapide sur Render

[![Déployer sur Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

1. **Connectez votre repository** à Render
2. **Configurez les variables d'environnement** (voir section ci-dessous)
3. **Déployez** automatiquement !

## 📋 Configuration requise

### Variables d'environnement obligatoires

```bash
# EmailJS (formulaire de contact)
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx

# Informations de contact
REACT_APP_CONTACT_EMAIL=contact@baimmobilier.com
REACT_APP_CONTACT_PHONE=+33662368225
```

### Variables optionnelles

```bash
# Google Maps (cartes)
REACT_APP_GOOGLE_MAPS_API_KEY=votre_cle_maps

# URL du site (auto-détectée si non définie)
REACT_APP_SITE_URL=https://votre-site.onrender.com
```

## 🛠️ Développement local

### Installation

```bash
npm install
```

### Démarrage

```bash
npm start
```

Ouvre [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Construction

```bash
npm run build
```

### Vérification avant déploiement

```bash
npm run pre-deploy-check
```

## 📚 Documentation

- **[Guide de déploiement Render](./RENDER_DEPLOYMENT.md)** - Guide complet pour le déploiement
- **[Configuration EmailJS](./EMAILJS_SETUP.md)** - Configuration du formulaire de contact
- **[Configuration Google Maps](./VERCEL_GOOGLE_MAPS_CONFIG.md)** - Configuration des cartes (compatible Render)

## 🎯 Structure du projet

```
ba-immobilier/
├── public/
│   ├── _redirects          # Redirections pour SPA
│   └── index.html
├── src/
│   ├── components/         # Composants React
│   ├── pages/             # Pages du site
│   ├── config/            # Configuration (EmailJS, etc.)
│   └── utils/             # Utilitaires
├── scripts/
│   └── pre-deploy-check.js # Script de vérification
├── render.yaml            # Configuration Render
├── .env.example          # Variables d'environnement exemple
└── README.md
```

## 🚀 Fonctionnalités

- ✅ Site responsive (mobile, tablet, desktop)
- ✅ Formulaire de contact avec EmailJS
- ✅ SEO optimisé avec meta tags dynamiques
- ✅ Support multilingue (FR/EN)
- ✅ Animations fluides avec Framer Motion
- ✅ Cartes interactives Google Maps
- ✅ Optimisé pour les performances web
- ✅ PWA ready

## 🔧 Technologies utilisées

- **React** 18 + **React Router** 7
- **Styled Components** pour le styling
- **Framer Motion** pour les animations
- **EmailJS** pour les formulaires
- **React i18next** pour l'internationalisation
- **Google Maps API** pour la géolocalisation

## 📞 Support

Pour toute question technique :
- Email: contact@baimmobilier.com
- Téléphone: +33 6 62 36 82 25

---

**Développé avec ❤️ pour BA Immobilier**
