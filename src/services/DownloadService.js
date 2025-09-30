class DownloadService {
  constructor() {
    this.storageKey = 'ba_immobilier_downloads';
  }

  // Enregistrer un nouveau téléchargement
  async recordDownload(email, name = '', source = 'website') {
    try {
      const download = {
        id: this.generateId(),
        email: email.toLowerCase().trim(),
        name: name.trim(),
        source,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString('fr-FR'),
        time: new Date().toLocaleTimeString('fr-FR'),
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct'
      };

      // Récupérer les téléchargements existants
      const downloads = this.getAllDownloads();

      // Vérifier si l'email existe déjà
      const existingDownload = downloads.find(d => d.email === download.email);

      if (existingDownload) {
        // Mettre à jour le téléchargement existant
        existingDownload.timestamp = download.timestamp;
        existingDownload.date = download.date;
        existingDownload.time = download.time;
        existingDownload.downloadCount = (existingDownload.downloadCount || 1) + 1;
        existingDownload.lastDownload = download.timestamp;
        if (name && !existingDownload.name) {
          existingDownload.name = name;
        }
      } else {
        // Ajouter le nouveau téléchargement
        download.downloadCount = 1;
        download.firstDownload = download.timestamp;
        download.lastDownload = download.timestamp;
        downloads.push(download);
      }

      // Sauvegarder dans le localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(downloads));

      // Envoyer les données au serveur (si disponible)
      this.sendToServer(download);

      return download;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du téléchargement:', error);
      throw error;
    }
  }

  // Récupérer tous les téléchargements
  getAllDownloads() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération des téléchargements:', error);
      return [];
    }
  }

  // Récupérer les statistiques
  getDownloadStats() {
    const downloads = this.getAllDownloads();
    const totalDownloads = downloads.reduce((sum, d) => sum + (d.downloadCount || 1), 0);
    const uniqueUsers = downloads.length;

    // Téléchargements par jour (derniers 30 jours)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentDownloads = downloads.filter(d =>
      new Date(d.timestamp) >= last30Days
    );

    // Téléchargements par mois
    const downloadsByMonth = downloads.reduce((acc, d) => {
      const month = new Date(d.timestamp).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long'
      });
      acc[month] = (acc[month] || 0) + (d.downloadCount || 1);
      return acc;
    }, {});

    return {
      totalDownloads,
      uniqueUsers,
      recentDownloads: recentDownloads.length,
      downloadsByMonth,
      lastDownload: downloads.length > 0 ? downloads[downloads.length - 1] : null
    };
  }

  // Rechercher des téléchargements
  searchDownloads(query) {
    const downloads = this.getAllDownloads();
    const searchTerm = query.toLowerCase();

    return downloads.filter(d =>
      d.email.toLowerCase().includes(searchTerm) ||
      (d.name && d.name.toLowerCase().includes(searchTerm)) ||
      d.date.includes(searchTerm)
    );
  }

  // Exporter les données en CSV
  exportToCSV() {
    const downloads = this.getAllDownloads();
    const headers = [
      'Email',
      'Nom',
      'Date',
      'Heure',
      'Nombre de téléchargements',
      'Premier téléchargement',
      'Dernier téléchargement',
      'Source',
      'Référent'
    ];

    const csvContent = [
      headers.join(';'),
      ...downloads.map(d => [
        d.email,
        d.name || '',
        d.date,
        d.time,
        d.downloadCount || 1,
        new Date(d.firstDownload || d.timestamp).toLocaleDateString('fr-FR'),
        new Date(d.lastDownload || d.timestamp).toLocaleDateString('fr-FR'),
        d.source || 'website',
        d.referrer || 'Direct'
      ].join(';'))
    ].join('\n');

    // Créer et télécharger le fichier CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `telechargements_guide_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Supprimer un téléchargement
  deleteDownload(id) {
    try {
      const downloads = this.getAllDownloads();
      const filteredDownloads = downloads.filter(d => d.id !== id);
      localStorage.setItem(this.storageKey, JSON.stringify(filteredDownloads));
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  }

  // Vider tous les téléchargements
  clearAllDownloads() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      return false;
    }
  }

  // Valider l'email
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Générer un ID unique
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Envoyer au serveur (pour une implémentation future)
  async sendToServer(download) {
    try {
      // Ici vous pourrez ajouter l'appel à votre API backend
      // fetch('/api/downloads', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(download)
      // });
      console.log('Téléchargement enregistré:', download);
    } catch (error) {
      console.error('Erreur envoi serveur:', error);
    }
  }

  // Démarrer le téléchargement du PDF
  downloadPDF() {
    try {
      const link = document.createElement('a');
      link.href = '/test.pdf';
      link.download = 'Guide-Investissement-BA-Immobilier.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      return false;
    }
  }
}

// Instance singleton
export const downloadService = new DownloadService();
export default downloadService;