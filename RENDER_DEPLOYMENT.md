# Déploiement sur Render - BA Immobilier

Ce guide vous explique comment déployer votre site BA Immobilier sur Render.

## 📋 Prérequis

1. **Compte Render** : Créez un compte gratuit sur [render.com](https://render.com)
2. **Repository Git** : Votre code doit être sur GitHub, GitLab ou Bitbucket
3. **Variables d'environnement** : Préparez vos clés API

## 🚀 Étapes de déploiement

### 1. Connexion du repository

1. Connectez-vous à votre tableau de bord Render
2. Cliquez sur "New" → "Static Site"
3. Connectez votre repository Git
4. Sélectionnez votre repository `ba-immobilier`

### 2. Configuration du build

Render détectera automatiquement les paramètres grâce au fichier `render.yaml`, mais vous pouvez aussi configurer manuellement :

- **Build Command** : `npm install && npm run build`
- **Publish Directory** : `build`
- **Auto-Deploy** : Activé (recommandé)

### 3. Variables d'environnement

Dans les paramètres de votre service Render, ajoutez ces variables d'environnement :

#### EmailJS (obligatoire pour le formulaire de contact)
```
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxx
```

#### Google Maps (optionnel)
```
REACT_APP_GOOGLE_MAPS_API_KEY=votre_cle_google_maps
```

#### Configuration générale
```
REACT_APP_SITE_URL=https://votre-site.onrender.com
REACT_APP_CONTACT_EMAIL=contact@baimmobilier.com
REACT_APP_CONTACT_PHONE=+33662368225
```

### 4. Configuration EmailJS pour Render

1. **Domaine autorisé** : Dans votre dashboard EmailJS, ajoutez votre domaine Render :
   - Exemple : `https://ba-immobilier.onrender.com`
   - Ou votre domaine personnalisé

2. **Template de réception** : Vérifiez que les emails arrivent bien sur `contact@baimmobilier.com`

## 🔧 Configuration des fichiers

### render.yaml
```yaml
services:
  - type: web
    name: ba-immobilier
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### _redirects (dans public/)
```
/*    /index.html   200
```

## 🌐 Domaine personnalisé (optionnel)

1. Dans les paramètres Render → "Custom Domains"
2. Ajoutez votre domaine (ex: `baimmobilier.com`)
3. Configurez les DNS selon les instructions Render
4. SSL automatique activé

## ⚡ Optimisations Render

### Performance
- ✅ Build cache automatique
- ✅ CDN global inclus
- ✅ Compression Gzip/Brotli
- ✅ SSL/TLS automatique

### Monitoring
- ✅ Logs de build en temps réel
- ✅ Monitoring uptime inclus
- ✅ Métriques de performance

## 🐛 Résolution de problèmes

### Build échoue
1. Vérifiez les logs de build dans Render
2. Testez en local : `npm install && npm run build`
3. Vérifiez que toutes les dépendances sont dans `package.json`

### Formulaire de contact ne fonctionne pas
1. Vérifiez les variables d'environnement EmailJS
2. Testez dans la console navigateur (onglet Network)
3. Vérifiez que le domaine est autorisé dans EmailJS

### Erreur 404 sur les routes
1. Vérifiez que le fichier `_redirects` est dans `public/`
2. Ou utilisez la configuration `render.yaml`

### Google Maps ne s'affiche pas
1. Ajoutez la variable `REACT_APP_GOOGLE_MAPS_API_KEY`
2. Autorisez le domaine Render dans Google Cloud Console

## 📱 Post-déploiement

1. **Test complet** : Testez toutes les fonctionnalités
2. **SEO** : Vérifiez les meta tags et le sitemap
3. **Performance** : Testez avec Lighthouse
4. **Mobile** : Vérifiez la responsivité

## 💰 Coûts Render

- **Plan gratuit** : 750h/mois (suffisant pour un site vitrine)
- **Domaine inclus** : `.onrender.com` gratuit
- **SSL** : Inclus automatiquement
- **Bande passante** : 100GB/mois inclus

## 🔄 Mises à jour automatiques

Render redéploie automatiquement à chaque push sur la branche principale. Pour désactiver :
1. Paramètres → "Auto-Deploy" → Désactiver
2. Déploiement manuel via "Manual Deploy"

## 📞 Support

En cas de problème :
1. Documentation Render : [docs.render.com](https://docs.render.com)
2. Support Render (plan payant)
3. Communauté Discord/Forum

---

✅ **Votre site BA Immobilier est maintenant prêt pour Render !**