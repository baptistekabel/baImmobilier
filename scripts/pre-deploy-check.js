#!/usr/bin/env node

/**
 * Script de vérification avant déploiement sur Render
 * Vérifie que toutes les variables d'environnement requises sont configurées
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Vérification pré-déploiement pour Render...\n');

// Variables d'environnement requises
const requiredEnvVars = [
  'REACT_APP_EMAILJS_SERVICE_ID',
  'REACT_APP_EMAILJS_TEMPLATE_ID',
  'REACT_APP_EMAILJS_PUBLIC_KEY',
  'REACT_APP_CONTACT_EMAIL',
  'REACT_APP_CONTACT_PHONE'
];

// Variables d'environnement optionnelles
const optionalEnvVars = [
  'REACT_APP_GOOGLE_MAPS_API_KEY',
  'REACT_APP_SITE_URL'
];

let hasErrors = false;
let hasWarnings = false;

// Vérification des variables requises
console.log('📋 Vérification des variables d\'environnement requises:');
requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: configuré`);
  } else {
    console.log(`❌ ${envVar}: MANQUANT`);
    hasErrors = true;
  }
});

console.log('\n📋 Vérification des variables d\'environnement optionnelles:');
optionalEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: configuré`);
  } else {
    console.log(`⚠️  ${envVar}: non configuré (optionnel)`);
    hasWarnings = true;
  }
});

// Vérification des fichiers critiques
console.log('\n📁 Vérification des fichiers critiques:');
const criticalFiles = [
  'package.json',
  'render.yaml',
  'public/_redirects',
  'src/config/emailjs.js',
  '.env.example'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, '..', file))) {
    console.log(`✅ ${file}: présent`);
  } else {
    console.log(`❌ ${file}: MANQUANT`);
    hasErrors = true;
  }
});

// Vérification du package.json
console.log('\n📦 Vérification du package.json:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json')));

  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ Script de build: présent');
  } else {
    console.log('❌ Script de build: MANQUANT');
    hasErrors = true;
  }

  if (packageJson.scripts && packageJson.scripts['render-build']) {
    console.log('✅ Script render-build: présent');
  } else {
    console.log('⚠️  Script render-build: recommandé');
    hasWarnings = true;
  }
} catch (error) {
  console.log('❌ Erreur lors de la lecture du package.json');
  hasErrors = true;
}

// Résumé
console.log('\n📊 Résumé de la vérification:');
if (hasErrors) {
  console.log('❌ Des erreurs critiques ont été détectées. Corrigez-les avant le déploiement.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Des avertissements ont été détectés. Le déploiement est possible mais certaines fonctionnalités pourraient être limitées.');
  process.exit(0);
} else {
  console.log('✅ Toutes les vérifications sont passées. Prêt pour le déploiement sur Render !');
  process.exit(0);
}