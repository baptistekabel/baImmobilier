# Configuration EmailJS pour BA Immobilier

## Étapes pour configurer EmailJS

### 1. Créer un compte EmailJS
1. Allez sur [https://www.emailjs.com](https://www.emailjs.com)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Créer un service email
1. Dans le dashboard EmailJS, allez dans "Services"
2. Cliquez sur "Add Service"
3. Choisissez "Outlook" (puisque vous utilisez idrissba@outlook.com)
4. Suivez les instructions pour connecter votre compte Outlook
5. Notez le **Service ID** généré (ex: service_xxxxxxx)

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

**Subject:** Nouvelle demande de contact - {{subject}}

**Content:**
```
Nouvelle demande de contact reçue le {{date}}

Nom: {{from_name}}
Email: {{from_email}}
Téléphone: {{phone}}
Service recherché: {{service}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis le site BA Immobilier
```

4. Sauvegardez et notez le **Template ID** (ex: template_xxxxxxx)

### 4. Obtenir la clé publique
1. Allez dans "Account" > "General"
2. Copiez votre **Public Key**

### 5. Mettre à jour la configuration
Modifiez le fichier `src/config/emailjs.js` avec vos vraies valeurs :

```javascript
export const emailJSConfig = {
  serviceId: 'service_xxxxxxx', // Remplacez par votre Service ID
  templateId: 'template_xxxxxxx', // Remplacez par votre Template ID
  publicKey: 'xxxxxxxxxxxxxxxxxx' // Remplacez par votre Public Key
};
```

### 6. Tester
1. Redémarrez votre application (`npm start`)
2. Allez sur la page de contact
3. Remplissez et envoyez le formulaire
4. Vérifiez que vous recevez l'email sur idrissba@outlook.com

## Limites du plan gratuit
- 200 emails/mois
- Suffisant pour débuter

## Troubleshooting
Si les emails ne fonctionnent pas :
1. Vérifiez que tous les IDs sont corrects
2. Vérifiez la console du navigateur pour les erreurs
3. Assurez-vous que votre compte Outlook est bien connecté dans EmailJS