import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';

class PropertiesService {
  constructor() {
    this.collectionName = 'properties';
  }

  // Convertir les données Firestore
  convertFromFirestore(doc) {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  }

  // Récupérer toutes les propriétés disponibles
  async getAvailableProperties() {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', 'Disponible'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés:', error);
      return [];
    }
  }

  // Récupérer toutes les propriétés (y compris vendues/louées)
  async getAllProperties() {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
    } catch (error) {
      console.error('Erreur lors du chargement de toutes les propriétés:', error);
      return [];
    }
  }

  // Récupérer les propriétés par région
  async getPropertiesByRegion(region) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('location.region', '==', region),
        where('status', '==', 'Disponible'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés par région:', error);
      return [];
    }
  }

  // Récupérer les propriétés par type
  async getPropertiesByType(type) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('type', '==', type),
        where('status', '==', 'Disponible'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés par type:', error);
      return [];
    }
  }

  // Récupérer les propriétés en vedette (les plus récentes, y compris vendues)
  async getFeaturedProperties(limit = 6) {
    try {
      const properties = await this.getAllProperties();
      return properties.slice(0, limit);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés en vedette:', error);
      return [];
    }
  }

  // Rechercher des propriétés
  async searchProperties(searchTerm) {
    try {
      // Charger toutes les propriétés disponibles et filtrer côté client
      const properties = await this.getAvailableProperties();
      const lowerSearchTerm = searchTerm.toLowerCase();

      return properties.filter(property =>
        property.title.toLowerCase().includes(lowerSearchTerm) ||
        property.description.toLowerCase().includes(lowerSearchTerm) ||
        property.location.city.toLowerCase().includes(lowerSearchTerm) ||
        property.location.country.toLowerCase().includes(lowerSearchTerm) ||
        property.location.address.toLowerCase().includes(lowerSearchTerm)
      );
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      return [];
    }
  }

  // Filtrer les propriétés
  async filterProperties(filters) {
    try {
      let properties = await this.getAvailableProperties();

      // Appliquer les filtres côté client
      if (filters.type) {
        properties = properties.filter(p => p.type === filters.type);
      }
      if (filters.region) {
        properties = properties.filter(p => p.location.region === filters.region);
      }
      if (filters.minPrice) {
        properties = properties.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= filters.maxPrice);
      }
      if (filters.minSurface) {
        properties = properties.filter(p => p.surface >= filters.minSurface);
      }
      if (filters.maxSurface) {
        properties = properties.filter(p => p.surface <= filters.maxSurface);
      }

      return properties;
    } catch (error) {
      console.error('Erreur lors du filtrage:', error);
      return [];
    }
  }

  // Écouter les changements en temps réel pour les propriétés disponibles
  onAvailablePropertiesChange(callback) {
    const q = query(
      collection(db, this.collectionName),
      where('status', '==', 'Disponible'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const properties = querySnapshot.docs.map(doc => this.convertFromFirestore(doc));
      callback(properties);
    }, (error) => {
      console.error('Erreur lors de l\'écoute des changements:', error);
      callback([]);
    });
  }

  // Récupérer une propriété par ID (pour page de détail)
  async getPropertyById(id) {
    try {
      const properties = await this.getAllProperties();
      return properties.find(property => property.id === id) || null;
    } catch (error) {
      console.error('Erreur lors du chargement de la propriété:', error);
      return null;
    }
  }

  // Formater le prix
  formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  }

  // Obtenir des statistiques publiques
  async getPublicStatistics() {
    try {
      const properties = await this.getAvailableProperties();

      const stats = {
        total: properties.length,
        parType: {},
        parRegion: {},
        prixMoyen: 0,
        surfaceMoyenne: 0,
      };

      // Statistiques par type
      properties.forEach(property => {
        stats.parType[property.type] = (stats.parType[property.type] || 0) + 1;
      });

      // Statistiques par région
      properties.forEach(property => {
        const region = property.location.region === 'Africa' ? 'Afrique' : 'Antilles';
        stats.parRegion[region] = (stats.parRegion[region] || 0) + 1;
      });

      // Prix et surface moyenne
      if (properties.length > 0) {
        stats.prixMoyen = properties.reduce((sum, p) => sum + p.price, 0) / properties.length;
        stats.surfaceMoyenne = properties.reduce((sum, p) => sum + p.surface, 0) / properties.length;
      }

      return stats;
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques:', error);
      return {
        total: 0,
        parType: {},
        parRegion: {},
        prixMoyen: 0,
        surfaceMoyenne: 0,
      };
    }
  }
}

export const propertiesService = new PropertiesService();