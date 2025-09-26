import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

class AdminService {
  constructor() {
    this.collectionName = 'properties';
  }

  // Upload d'une seule image
  async uploadImage(file, propertyId = null) {
    try {
      // Créer un nom unique pour le fichier
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const folder = propertyId ? `properties/${propertyId}` : 'temp';
      const storageRef = ref(storage, `${folder}/${fileName}`);

      // Upload du fichier
      const snapshot = await uploadBytes(storageRef, file);

      // Récupérer l'URL de téléchargement
      const downloadURL = await getDownloadURL(snapshot.ref);

      return {
        success: true,
        url: downloadURL,
        path: snapshot.ref.fullPath,
        fileName: fileName
      };
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Upload de plusieurs images
  async uploadMultipleImages(files, propertyId = null) {
    try {
      const uploadPromises = files.map(file => this.uploadImage(file, propertyId));
      const results = await Promise.all(uploadPromises);

      const successful = results.filter(result => result.success);
      const failed = results.filter(result => !result.success);

      return {
        success: failed.length === 0,
        successful,
        failed,
        totalUploaded: successful.length,
        totalFailed: failed.length
      };
    } catch (error) {
      console.error('Erreur lors de l\'upload multiple:', error);
      return {
        success: false,
        error: error.message,
        successful: [],
        failed: files.map(file => ({ fileName: file.name, error: error.message }))
      };
    }
  }

  // Supprimer une image
  async deleteImage(imagePath) {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, error: error.message };
    }
  }

  // Créer une nouvelle propriété
  async createProperty(propertyData) {
    try {
      const docData = {
        ...propertyData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: propertyData.status || 'Disponible'
      };

      const docRef = await addDoc(collection(db, this.collectionName), docData);

      return {
        success: true,
        id: docRef.id,
        data: docData
      };
    } catch (error) {
      console.error('Erreur lors de la création:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Mettre à jour une propriété
  async updateProperty(propertyId, propertyData) {
    try {
      const propertyRef = doc(db, this.collectionName, propertyId);
      const updateData = {
        ...propertyData,
        updatedAt: serverTimestamp()
      };

      await updateDoc(propertyRef, updateData);

      return {
        success: true,
        id: propertyId,
        data: updateData
      };
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Supprimer une propriété et ses images
  async deleteProperty(propertyId) {
    try {
      // Supprimer les images associées
      const imagesRef = ref(storage, `properties/${propertyId}`);
      try {
        const imagesList = await listAll(imagesRef);
        const deletePromises = imagesList.items.map(imageRef => deleteObject(imageRef));
        await Promise.all(deletePromises);
      } catch (storageError) {
        console.warn('Aucune image à supprimer ou erreur storage:', storageError);
      }

      // Supprimer le document
      const propertyRef = doc(db, this.collectionName, propertyId);
      await deleteDoc(propertyRef);

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer toutes les propriétés pour l'admin
  async getAllPropertiesAdmin() {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    } catch (error) {
      console.error('Erreur lors du chargement admin:', error);
      return [];
    }
  }

  // Déplacer les images temporaires vers le dossier de la propriété
  async moveTemporaryImages(tempImagePaths, propertyId) {
    try {
      const movePromises = tempImagePaths.map(async (tempPath) => {
        // Télécharger l'image temporaire
        const tempRef = ref(storage, tempPath);
        const url = await getDownloadURL(tempRef);

        // Créer une nouvelle référence dans le dossier de la propriété
        const fileName = tempPath.split('/').pop();
        const newRef = ref(storage, `properties/${propertyId}/${fileName}`);

        // Re-upload dans le nouveau dossier (Firebase ne permet pas de déplacer directement)
        const response = await fetch(url);
        const blob = await response.blob();
        await uploadBytes(newRef, blob);

        // Supprimer l'image temporaire
        await deleteObject(tempRef);

        // Retourner la nouvelle URL
        return await getDownloadURL(newRef);
      });

      const newUrls = await Promise.all(movePromises);
      return { success: true, urls: newUrls };
    } catch (error) {
      console.error('Erreur lors du déplacement des images:', error);
      return { success: false, error: error.message };
    }
  }

  // Valider les données d'une propriété
  validatePropertyData(data) {
    const errors = [];

    if (!data.title || data.title.trim().length < 3) {
      errors.push('Le titre doit contenir au moins 3 caractères');
    }

    if (!data.description || data.description.trim().length < 10) {
      errors.push('La description doit contenir au moins 10 caractères');
    }

    if (!data.price || data.price <= 0) {
      errors.push('Le prix doit être supérieur à 0');
    }

    if (!data.surface || data.surface <= 0) {
      errors.push('La surface doit être supérieure à 0');
    }

    if (!data.type) {
      errors.push('Le type de propriété est requis');
    }

    if (!data.location || !data.location.city || !data.location.country) {
      errors.push('La localisation (ville et pays) est requise');
    }

    if (!data.images || data.images.length === 0) {
      errors.push('Au moins une image est requise');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Obtenir des statistiques pour l'admin
  async getAdminStatistics() {
    try {
      const properties = await this.getAllPropertiesAdmin();

      const stats = {
        total: properties.length,
        disponibles: properties.filter(p => p.status === 'Disponible').length,
        vendues: properties.filter(p => p.status === 'Vendue').length,
        louees: properties.filter(p => p.status === 'Louée').length,
        parType: {},
        parRegion: {},
        recentesAjouts: properties.slice(0, 5),
        chiffreAffaires: 0
      };

      // Statistiques par type
      properties.forEach(property => {
        stats.parType[property.type] = (stats.parType[property.type] || 0) + 1;
      });

      // Statistiques par région
      properties.forEach(property => {
        const region = property.location?.region || 'Non spécifié';
        stats.parRegion[region] = (stats.parRegion[region] || 0) + 1;
      });

      // Calcul du chiffre d'affaires (propriétés vendues)
      stats.chiffreAffaires = properties
        .filter(p => p.status === 'Vendue')
        .reduce((sum, p) => sum + (p.price || 0), 0);

      return stats;
    } catch (error) {
      console.error('Erreur lors du calcul des statistiques admin:', error);
      return {
        total: 0,
        disponibles: 0,
        vendues: 0,
        louees: 0,
        parType: {},
        parRegion: {},
        recentesAjouts: [],
        chiffreAffaires: 0
      };
    }
  }
}

export const adminService = new AdminService();