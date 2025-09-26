# Configuration Google Maps sur Vercel

## Problème
La clé Google Maps fonctionne en local mais pas sur Vercel.

## Solutions à appliquer

### 1. Variables d'environnement Vercel ⚠️ CRITIQUE

1. Va sur https://vercel.com/dashboard
2. Sélectionne ton projet BA Immobilier
3. Va dans **Settings** → **Environment Variables**
4. Clique sur **Add New**
5. Ajoute :
   - **Name**: `REACT_APP_GOOGLE_MAPS_API_KEY`
   - **Value**: `AIzaSyAnxIy3zIlnFkcuL9m2bu8AysPkFfXt71s`
   - **Environments**: Coche **Production**, **Preview**, et **Development**
6. Clique sur **Save**
7. **IMPORTANT**: Redéploie ton application après avoir ajouté la variable

### 2. Configuration Google Cloud Console

1. Va sur https://console.cloud.google.com/
2. Sélectionne ton projet Google
3. Va dans **APIs & Services** → **Credentials**
4. Clique sur ta clé API Google Maps
5. Dans **Application restrictions**:
   - Sélectionne **HTTP referrers (web sites)**
   - Ajoute ces domaines :
     - `http://localhost:3000/*`
     - `https://localhost:3000/*`
     - `https://*.vercel.app/*`
     - `https://ton-domaine-custom.com/*` (si applicable)

### 3. APIs à activer dans Google Cloud

Assure-toi que ces APIs sont activées :
- Maps JavaScript API
- Geocoding API (optionnel)
- Places API (optionnel)

### 4. Vérification après déploiement

1. Ouvre la console du navigateur sur ton site Vercel
2. Regarde les messages de debug :
   - `Google Maps API Key présente: true/false`
   - `Environnement: production`
3. Si tu vois des erreurs Google Maps, elles t'indiqueront le problème exact

### 5. Debug en cas de problème

Si ça ne marche toujours pas :
1. Vérifie que la variable apparaît dans Settings → Environment Variables
2. Force un nouveau déploiement
3. Regarde les logs de build Vercel
4. Teste avec une URL de ton site : `https://ton-site.vercel.app/`

## Causes communes du problème

- ❌ Variable d'environnement pas configurée sur Vercel
- ❌ Restrictions de domaine trop strictes
- ❌ API Google Maps pas activée
- ❌ Quota dépassé
- ❌ Pas de redéploiement après ajout de la variable

## Test rapide

Ajoute temporairement ceci dans ton composant pour debug :
```javascript
console.log('API Key:', process.env.REACT_APP_GOOGLE_MAPS_API_KEY?.substring(0, 10) + '...');
```

## Commande de redéploiement

Après avoir configuré les variables :
```bash
vercel --prod
```

---

**Note**: Ce fichier peut être supprimé une fois le problème résolu.