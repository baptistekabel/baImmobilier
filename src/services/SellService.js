class SellService {
  constructor() {
    this.storageKey = 'ba_immobilier_sell_submissions';
  }

  // Enregistrer une nouvelle soumission de vente
  async submitProperty(formData) {
    try {
      const submission = {
        id: this.generateId(),
        ...formData,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('fr-FR'),
        time: new Date().toLocaleTimeString('fr-FR'),
        status: 'nouveau', // nouveau, en_cours, traite, refuse
        notes: '',
        estimatedValue: null,
        contactedDate: null,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
      };

      // Récupérer les soumissions existantes
      const submissions = this.getAllSubmissions();

      // Ajouter la nouvelle soumission
      submissions.push(submission);

      // Sauvegarder dans le localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(submissions));

      // Envoyer les données au serveur (si disponible)
      this.sendToServer(submission);

      return { success: true, submission };
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la soumission:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer toutes les soumissions
  getAllSubmissions() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des soumissions:', error);
      return [];
    }
  }

  // Récupérer une soumission par ID
  getSubmissionById(id) {
    try {
      const submissions = this.getAllSubmissions();
      return submissions.find(submission => submission.id === id);
    } catch (error) {
      console.error('Erreur lors de la récupération de la soumission:', error);
      return null;
    }
  }

  // Mettre à jour le statut d'une soumission
  updateSubmissionStatus(id, status, notes = '') {
    try {
      const submissions = this.getAllSubmissions();
      const submissionIndex = submissions.findIndex(s => s.id === id);

      if (submissionIndex !== -1) {
        submissions[submissionIndex] = {
          ...submissions[submissionIndex],
          status,
          notes,
          lastUpdate: new Date().toISOString()
        };

        localStorage.setItem(this.storageKey, JSON.stringify(submissions));
        return { success: true };
      }

      return { success: false, error: 'Soumission non trouvée' };
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      return { success: false, error: error.message };
    }
  }

  // Ajouter une estimation de valeur
  addEstimation(id, estimatedValue, notes = '') {
    try {
      const submissions = this.getAllSubmissions();
      const submissionIndex = submissions.findIndex(s => s.id === id);

      if (submissionIndex !== -1) {
        submissions[submissionIndex] = {
          ...submissions[submissionIndex],
          estimatedValue,
          estimationNotes: notes,
          estimationDate: new Date().toISOString(),
          status: 'traite'
        };

        localStorage.setItem(this.storageKey, JSON.stringify(submissions));
        return { success: true };
      }

      return { success: false, error: 'Soumission non trouvée' };
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'estimation:', error);
      return { success: false, error: error.message };
    }
  }

  // Récupérer les statistiques
  getSubmissionStats() {
    const submissions = this.getAllSubmissions();

    // Statistiques générales
    const totalSubmissions = submissions.length;

    // Par statut
    const byStatus = submissions.reduce((acc, submission) => {
      acc[submission.status] = (acc[submission.status] || 0) + 1;
      return acc;
    }, {});

    // Par type de bien
    const byPropertyType = submissions.reduce((acc, submission) => {
      acc[submission.propertyType] = (acc[submission.propertyType] || 0) + 1;
      return acc;
    }, {});

    // Soumissions récentes (derniers 30 jours)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentSubmissions = submissions.filter(s =>
      new Date(s.timestamp) >= last30Days
    );

    // Soumissions par mois
    const submissionsByMonth = submissions.reduce((acc, s) => {
      const month = new Date(s.timestamp).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
      });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Valeur estimée moyenne
    const estimatedValues = submissions
      .filter(s => s.estimatedValue)
      .map(s => parseFloat(s.estimatedValue));

    const averageEstimatedValue = estimatedValues.length > 0
      ? estimatedValues.reduce((sum, val) => sum + val, 0) / estimatedValues.length
      : 0;

    return {
      totalSubmissions,
      byStatus: {
        nouveau: byStatus.nouveau || 0,
        en_cours: byStatus.en_cours || 0,
        traite: byStatus.traite || 0,
        refuse: byStatus.refuse || 0
      },
      byPropertyType,
      recentSubmissions: recentSubmissions.length,
      submissionsByMonth,
      averageEstimatedValue,
      lastSubmission: submissions.length > 0 ? submissions[submissions.length - 1] : null
    };
  }

  // Rechercher des soumissions
  searchSubmissions(query) {
    const submissions = this.getAllSubmissions();
    const searchTerm = query.toLowerCase();

    return submissions.filter(s =>
      s.firstName.toLowerCase().includes(searchTerm) ||
      s.lastName.toLowerCase().includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm) ||
      s.phone.includes(searchTerm) ||
      s.address.toLowerCase().includes(searchTerm) ||
      s.neighborhood.toLowerCase().includes(searchTerm) ||
      s.propertyType.toLowerCase().includes(searchTerm) ||
      s.date.includes(searchTerm)
    );
  }

  // Filtrer par statut
  getSubmissionsByStatus(status) {
    const submissions = this.getAllSubmissions();
    return submissions.filter(s => s.status === status);
  }

  // Exporter les données en CSV
  exportToCSV() {
    const submissions = this.getAllSubmissions();
    const headers = [
      'Nom',
      'Prénom',
      'Email',
      'Téléphone',
      'Type de bien',
      'Chambres',
      'Salles de bain',
      'Surface (Sq.Ft)',
      'Année construction',
      'Quartier',
      'Adresse',
      'Commodités',
      'Date soumission',
      'Statut',
      'Valeur estimée',
      'Notes'
    ];

    const csvContent = [
      headers.join(';'),
      ...submissions.map(s => [
        s.lastName,
        s.firstName,
        s.email,
        s.phone,
        s.propertyType,
        s.bedrooms,
        s.bathrooms,
        s.surface,
        s.yearBuilt,
        s.neighborhood,
        s.address,
        Object.entries(s.amenities || {})
          .filter(([key, value]) => value)
          .map(([key]) => key)
          .join(', '),
        s.date,
        s.status,
        s.estimatedValue || '',
        s.notes || ''
      ].join(';'))
    ].join('\n');

    // Créer et télécharger le fichier CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `soumissions_vente_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Supprimer une soumission
  deleteSubmission(id) {
    try {
      const submissions = this.getAllSubmissions();
      const filteredSubmissions = submissions.filter(s => s.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredSubmissions));
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, error: error.message };
    }
  }

  // Vider toutes les soumissions
  clearAllSubmissions() {
    try {
      localStorage.removeItem(this.storageKey);
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return { success: false, error: error.message };
    }
  }

  // Valider les données du formulaire
  validateSubmissionData(data) {
    const errors = [];

    // Validation des champs obligatoires
    if (!data.propertyType) errors.push('Le type de bien est obligatoire');
    if (!data.bedrooms) errors.push('Le nombre de chambres est obligatoire');
    if (!data.bathrooms) errors.push('Le nombre de salles de bain est obligatoire');
    if (!data.surface) errors.push('La surface est obligatoire');
    if (!data.yearBuilt) errors.push('L\'année de construction est obligatoire');
    if (!data.neighborhood) errors.push('Le quartier est obligatoire');
    if (!data.address) errors.push('L\'adresse est obligatoire');
    if (!data.lastName) errors.push('Le nom est obligatoire');
    if (!data.firstName) errors.push('Le prénom est obligatoire');
    if (!data.email) errors.push('L\'email est obligatoire');
    if (!data.phone) errors.push('Le téléphone est obligatoire');

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      errors.push('Format d\'email invalide');
    }

    // Validation surface
    if (data.surface && (isNaN(data.surface) || parseFloat(data.surface) <= 0)) {
      errors.push('La surface doit être un nombre positif');
    }

    // Validation année
    const currentYear = new Date().getFullYear();
    if (data.yearBuilt && (isNaN(data.yearBuilt) || parseInt(data.yearBuilt) < 1800 || parseInt(data.yearBuilt) > currentYear)) {
      errors.push('L\'année de construction doit être entre 1800 et ' + currentYear);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Formater le prix
  formatPrice(price) {
    if (!price) return 'Non estimé';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  }

  // Générer un ID unique
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Envoyer au serveur (pour une implémentation future)
  async sendToServer(submission) {
    try {
      // Ici vous pourrez ajouter l'appel à votre API backend
      // fetch('/api/sell-submissions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submission)
      // });
      console.log('Soumission de vente enregistrée:', submission);
    } catch (error) {
      console.error('Erreur envoi serveur:', error);
    }
  }

  // Obtenir le libellé du statut
  getStatusLabel(status) {
    const statusLabels = {
      'nouveau': 'Nouveau',
      'en_cours': 'En cours',
      'traite': 'Traité',
      'refuse': 'Refusé'
    };
    return statusLabels[status] || status;
  }

  // Obtenir la couleur du statut
  getStatusColor(status) {
    const statusColors = {
      'nouveau': '#007bff',
      'en_cours': '#ffc107',
      'traite': '#28a745',
      'refuse': '#dc3545'
    };
    return statusColors[status] || '#6c757d';
  }
}

// Instance singleton
export const sellService = new SellService();
export default sellService;