import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaEye, FaSave, FaTimes, FaHome, FaChartBar } from 'react-icons/fa';
import ImageUploader from '../components/ImageUploader';
import { adminService } from '../services/AdminService';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const AdminHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, #1a2b5e 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2.5rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.color || props.theme.colors.gold};
  animation: ${fadeIn} 0.6s ease-out ${props => props.delay || '0s'};

  .stat-icon {
    font-size: 2rem;
    color: ${props => props.color || props.theme.colors.gold};
    margin-bottom: 1rem;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(218, 165, 32, 0.4);
  }
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PropertyCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const PropertyImage = styled.div`
  height: 200px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #999;
    font-size: 3rem;
  }
`;

const PropertyInfo = styled.div`
  padding: 1.5rem;

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  .price {
    font-size: 1.4rem;
    font-weight: 700;
    color: ${props => props.theme.colors.gold};
    margin-bottom: 0.5rem;
  }

  .location {
    color: #666;
    margin-bottom: 1rem;
  }

  .status {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;

    &.disponible {
      background: #e8f5e8;
      color: #2e7d2e;
    }

    &.vendue {
      background: #ffe8e8;
      color: #d32f2f;
    }

    &.louee {
      background: #e8f0ff;
      color: #1976d2;
    }
  }
`;

const PropertyActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0 1.5rem 1.5rem;

  button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &.edit {
      background: #e3f2fd;
      color: #1976d2;

      &:hover {
        background: #bbdefb;
      }
    }

    &.delete {
      background: #ffebee;
      color: #d32f2f;

      &:hover {
        background: #ffcdd2;
      }
    }

    &.view {
      background: #f3e5f5;
      color: #7b1fa2;

      &:hover {
        background: #e1bee7;
      }
    }
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;

  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  label {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  input, textarea, select {
    padding: 0.8rem;
    border: 2px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.gold};
    }
  }

  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;

  button {
    padding: 1rem 2rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &.save {
      background: ${props => props.theme.colors.gold};
      color: white;

      &:hover {
        background: #e6a000;
      }
    }

    &.cancel {
      background: #f5f5f5;
      color: #666;

      &:hover {
        background: #eeeeee;
      }
    }
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 2rem;
  color: ${props => props.theme.colors.gold};

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AdminPage = () => {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    surface: '',
    type: 'Appartement',
    status: 'Disponible',
    location: {
      address: '',
      city: '',
      country: 'Sénégal',
      region: 'Africa'
    },
    bedrooms: '',
    bathrooms: '',
    features: {
      piscine: false,
      jardin: false,
      garage: false,
      terrasse: false,
      balcon: false,
      climatisation: false,
      chauffage: false,
      cheminee: false,
      securite: false,
      ascenseur: false,
      vueMer: false
    },
    images: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [propertiesData, statsData] = await Promise.all([
        adminService.getAllPropertiesAdmin(),
        adminService.getAdminStatistics()
      ]);

      // Debug pour voir la structure des données
      console.log('Properties loaded:', propertiesData);
      propertiesData.forEach((property, index) => {
        console.log(`Property ${index + 1} (${property.title}):`, {
          id: property.id,
          images: property.images,
          imageCount: property.images ? property.images.length : 0
        });
      });

      setProperties(propertiesData);
      setStats(statsData);
    } catch (error) {
      console.error('Erreur chargement données admin:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (property = null) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        ...property,
        price: property.price.toString(),
        surface: property.surface.toString(),
        bedrooms: property.bedrooms?.toString() || '',
        bathrooms: property.bathrooms?.toString() || '',
        features: property.features || {
          piscine: false,
          jardin: false,
          garage: false,
          terrasse: false,
          balcon: false,
          climatisation: false,
          chauffage: false,
          cheminee: false,
          securite: false,
          ascenseur: false,
          vueMer: false
        },
        images: property.images || []
      });
    } else {
      setEditingProperty(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        surface: '',
        type: 'Appartement',
        status: 'Disponible',
        location: {
          address: '',
          city: '',
          country: 'Sénégal',
          region: 'Africa'
        },
        bedrooms: '',
        bathrooms: '',
        features: {
          piscine: false,
          jardin: false,
          garage: false,
          terrasse: false,
          balcon: false,
          climatisation: false,
          chauffage: false,
          cheminee: false,
          securite: false,
          ascenseur: false,
          vueMer: false
        },
        images: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProperty(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImagesChange = (images) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  const handleFeatureChange = (featureName) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: !prev.features[featureName]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const validation = adminService.validatePropertyData({
      ...formData,
      price: parseFloat(formData.price),
      surface: parseFloat(formData.surface)
    });

    if (!validation.isValid) {
      alert('Erreurs de validation:\n' + validation.errors.join('\n'));
      return;
    }

    try {
      // Préparer les images dans le bon format
      const validImages = formData.images.filter(img => img.uploaded && img.url);
      const imageUrls = validImages.map(img => img.url); // Format simple URL pour compatibilité

      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        surface: parseFloat(formData.surface),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
        images: imageUrls, // Sauvegarder en tant qu'array d'URLs
        imageDetails: validImages.map(img => ({ // Garder les détails séparément si nécessaire
          url: img.url,
          path: img.path,
          name: img.name
        }))
      };

      console.log('Saving property with images:', {
        title: propertyData.title,
        imageCount: imageUrls.length,
        images: imageUrls
      });

      let result;
      if (editingProperty) {
        result = await adminService.updateProperty(editingProperty.id, propertyData);
      } else {
        result = await adminService.createProperty(propertyData);
      }

      if (result.success) {
        alert(editingProperty ? 'Propriété modifiée avec succès!' : 'Propriété créée avec succès!');
        closeModal();
        loadData();
      } else {
        alert('Erreur: ' + result.error);
      }
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur lors de la sauvegarde: ' + error.message);
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété?')) {
      try {
        const result = await adminService.deleteProperty(propertyId);

        if (result.success) {
          alert('Propriété supprimée avec succès!');
          loadData();
        } else {
          alert('Erreur lors de la suppression: ' + result.error);
        }
      } catch (error) {
        console.error('Erreur suppression:', error);
        alert('Erreur lors de la suppression: ' + error.message);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const createTestProperty = async () => {
    try {
      const testProperty = {
        title: 'Villa Test avec Images',
        description: 'Magnifique villa de test avec toutes les commodités modernes. Idéale pour tester l\'affichage des images dans l\'interface d\'administration.',
        price: 250000,
        surface: 120,
        type: 'Villa',
        status: 'Disponible',
        location: {
          address: '123 Rue Test',
          city: 'Dakar',
          country: 'Sénégal',
          region: 'Africa'
        },
        bedrooms: 3,
        bathrooms: 2,
        images: [
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=500&h=300&fit=crop',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=500&h=300&fit=crop'
        ]
      };

      console.log('Creating test property:', testProperty);

      const result = await adminService.createProperty(testProperty);

      if (result.success) {
        alert('Propriété test créée avec succès!');
        loadData();
      } else {
        alert('Erreur lors de la création de la propriété test: ' + result.error);
      }
    } catch (error) {
      console.error('Erreur création propriété test:', error);
      alert('Erreur: ' + error.message);
    }
  };

  if (loading) {
    return (
      <AdminContainer>
        <LoadingSpinner>
          <div className="spinner">⭐</div>
        </LoadingSpinner>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <h1>🏠 Administration BA Immobilier</h1>
        <p>Gérez vos biens immobiliers en toute simplicité</p>
      </AdminHeader>

      <StatsGrid>
        <StatCard color="#2196F3" delay="0.1s">
          <FaHome className="stat-icon" />
          <div className="stat-number">{stats.total || 0}</div>
          <div className="stat-label">Total Propriétés</div>
        </StatCard>

        <StatCard color="#4CAF50" delay="0.2s">
          <FaChartBar className="stat-icon" />
          <div className="stat-number">{stats.disponibles || 0}</div>
          <div className="stat-label">Disponibles</div>
        </StatCard>

        <StatCard color="#FF9800" delay="0.3s">
          <FaChartBar className="stat-icon" />
          <div className="stat-number">{stats.vendues || 0}</div>
          <div className="stat-label">Vendues</div>
        </StatCard>

      </StatsGrid>

      <ActionBar>
        <h2>Gestion des Propriétés</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <AddButton onClick={() => openModal()}>
            <FaPlus />
            Ajouter une propriété
          </AddButton>
          <AddButton
            onClick={createTestProperty}
            style={{ background: 'linear-gradient(135deg, #2196F3, #21CBF3)' }}
          >
            🧪 Créer propriété test
          </AddButton>
        </div>
      </ActionBar>

      <PropertiesGrid>
        {properties.map((property) => (
          <PropertyCard key={property.id}>
            <PropertyImage>
              {(() => {
                // Debug de l'image
                console.log(`Rendering image for ${property.title}:`, property.images);

                if (property.images && property.images.length > 0) {
                  const firstImage = property.images[0];
                  const imageSrc = typeof firstImage === 'string' ? firstImage : (firstImage.url || firstImage);

                  console.log(`Image source for ${property.title}:`, imageSrc);

                  return (
                    <img
                      src={imageSrc}
                      alt={property.title}
                      onLoad={() => console.log(`Image loaded successfully for ${property.title}`)}
                      onError={(e) => {
                        console.error(`Image failed to load for ${property.title}:`, e.target.src);
                        e.target.style.display = 'none';
                        const noImageDiv = e.target.parentNode.querySelector('.no-image-fallback');
                        if (noImageDiv) noImageDiv.style.display = 'flex';
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  );
                } else {
                  console.log(`No images found for ${property.title}`);
                  return null;
                }
              })()}

              <div className="no-image-fallback" style={{
                display: (!property.images || property.images.length === 0) ? 'flex' : 'none',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: '#999',
                fontSize: '3rem',
                background: '#f0f0f0'
              }}>
                <FaHome />
              </div>
            </PropertyImage>

            <PropertyInfo>
              <div className="title">{property.title}</div>
              <div className="price">{formatPrice(property.price)}</div>
              <div className="location">
                📍 {property.location.city}, {property.location.country}
              </div>
              <div className={`status ${property.status.toLowerCase()}`}>
                {property.status}
              </div>
              {/* Debug info */}
              <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.5rem' }}>
                Images: {property.images ? property.images.length : 0}
                {property.images && property.images.length > 0 && (
                  <div style={{ fontSize: '0.6rem', wordBreak: 'break-all' }}>
                    URL: {typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url}
                  </div>
                )}
              </div>
            </PropertyInfo>

            <PropertyActions>
              <button className="view" onClick={() => window.open(`/properties/${property.id}`, '_blank')}>
                <FaEye /> Voir
              </button>
              <button className="edit" onClick={() => openModal(property)}>
                <FaEdit /> Modifier
              </button>
              <button className="delete" onClick={() => handleDelete(property.id)}>
                <FaTrash /> Supprimer
              </button>
            </PropertyActions>
          </PropertyCard>
        ))}
      </PropertiesGrid>

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="modal-content">
            <h2>{editingProperty ? 'Modifier la propriété' : 'Ajouter une propriété'}</h2>

            <Form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Titre *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prix (€) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Surface (m²) *</label>
                  <input
                    type="number"
                    name="surface"
                    value={formData.surface}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Type *</label>
                  <select name="type" value={formData.type} onChange={handleInputChange}>
                    <option value="Appartement">Appartement</option>
                    <option value="Maison">Maison</option>
                    <option value="Villa">Villa</option>
                    <option value="Bureau">Bureau</option>
                    <option value="Terrain">Terrain</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Statut</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="Disponible">Disponible</option>
                    <option value="Vendue">Vendue</option>
                    <option value="Louée">Louée</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Chambres</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Salles de bain</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Caractéristiques</label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  marginTop: '0.5rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  {[
                    { key: 'piscine', label: 'Piscine' },
                    { key: 'jardin', label: 'Jardin' },
                    { key: 'garage', label: 'Garage' },
                    { key: 'terrasse', label: 'Terrasse' },
                    { key: 'balcon', label: 'Balcon' },
                    { key: 'climatisation', label: 'Climatisation' },
                    { key: 'chauffage', label: 'Chauffage' },
                    { key: 'cheminee', label: 'Cheminée' },
                    { key: 'securite', label: 'Sécurité' },
                    { key: 'ascenseur', label: 'Ascenseur' },
                    { key: 'vueMer', label: 'Vue mer' }
                  ].map(feature => (
                    <label key={feature.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={formData.features[feature.key]}
                        onChange={() => handleFeatureChange(feature.key)}
                        style={{ marginRight: '0.5rem' }}
                      />
                      {feature.label}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Adresse *</label>
                <input
                  type="text"
                  name="location.address"
                  value={formData.location.address}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ville *</label>
                  <input
                    type="text"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pays *</label>
                  <select name="location.country" value={formData.location.country} onChange={handleInputChange}>
                    <option value="Sénégal">Sénégal</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mali">Mali</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                onImagesChange={handleImagesChange}
                existingImages={formData.images}
                maxImages={10}
              />

              <FormActions>
                <button type="button" className="cancel" onClick={closeModal}>
                  <FaTimes /> Annuler
                </button>
                <button type="submit" className="save">
                  <FaSave /> {editingProperty ? 'Modifier' : 'Créer'}
                </button>
              </FormActions>
            </Form>
          </div>
        </Modal>
      )}
    </AdminContainer>
  );
};

export default AdminPage;