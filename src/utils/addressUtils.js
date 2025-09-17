// Utilitaires pour le formatage des adresses

export const getSectorFromAddress = (address) => {
  if (!address) return '';

  // Extraire le secteur de l'adresse (généralement le quartier ou arrondissement)
  const parts = address.split(',');
  if (parts.length > 1) {
    // Prendre la deuxième partie qui contient souvent le quartier
    return parts[1].trim();
  }

  // Si pas de virgule, prendre les premiers mots (éviter numéro de rue)
  const words = address.trim().split(' ');
  if (words.length > 2) {
    // Ignorer le numéro de rue et prendre le nom de la rue/quartier
    return words.slice(1, 3).join(' ');
  }

  return address;
};

// Formater l'adresse pour l'affichage dans les cartes et listes
export const formatAddressForCard = (location) => {
  if (!location) return '';

  const sector = getSectorFromAddress(location.address) || location.city || 'Secteur';
  return `${sector}, ${location.country}`;
};

// Formater l'adresse complète pour les pages de détail
export const formatFullAddress = (location) => {
  if (!location) return '';

  const sector = getSectorFromAddress(location.address) || location.city || 'Secteur';
  return `${sector}, ${location.city}, ${location.country}`;
};