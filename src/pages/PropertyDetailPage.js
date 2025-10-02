import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHome, FaDoorOpen, FaBed, FaBath, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChevronLeft, FaChevronRight, FaPlay, FaSwimmingPool, FaSeedling, FaCar, FaBuilding, FaSnowflake, FaFire, FaShieldAlt, FaArrowUp, FaWater, FaCheck } from 'react-icons/fa';
import SEO from '../components/SEO';
import ApproximateLocationMap from '../components/ApproximateLocationMap';
import { propertiesService } from '../services/PropertiesService';
import { formatAddressForCard } from '../utils/addressUtils';

const Container = styled.section`
  padding: 6rem 0 4rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, ${props => props.theme.colors.lightGray} 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
`;

const PropertyHeader = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const PropertyTitle = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PropertyMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const StatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status'
})`
  background: ${props => {
    switch (props.status) {
      case 'Disponible': return '#27ae60';
      case 'Vendu': return '#e74c3c';
      case 'Loué': return '#f39c12';
      case 'En négociation': return '#3498db';
      default: return '#95a5a6';
    }
  }};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const TypeBadge = styled.span`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const RegionBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const MainPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
`;

const RentPrice = styled.div`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
`;

const Location = styled.div`
  color: ${props => props.theme.colors.text.light};
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MediaSection = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const MainMediaContainer = styled.div`
  position: relative;
  height: 400px;
  overflow: hidden;
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MediaPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MediaControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediaCounter = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const MediaNavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const MediaNavButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  scrollbar-width: thin;
`;

const Thumbnail = styled.div`
  position: relative;
  min-width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbnailVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2rem;
`;

const DetailsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text.dark};
  line-height: 1.8;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: ${props => props.theme.colors.lightGray};
  border-radius: 8px;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const FeatureText = styled.div`
  flex: 1;
`;

const FeatureLabel = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeatureValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.dark};
`;

const ContactSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const ContactButton = styled.button`
  width: 100%;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: ${props => props.theme.colors.secondary};
  }
`;

const ContactInfo = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.text.light};
  font-size: 0.9rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text.light};
`;

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      setLoading(true);
      const data = await propertiesService.getPropertyById(id);
      setProperty(data);
    } catch (err) {
      setError('Propriété non trouvée');
      console.error('Erreur lors du chargement de la propriété:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getAllMedia = () => {
    if (!property) return [];
    const images = (property.images || []).map(url => ({ type: 'image', url }));
    const videos = (property.videos || []).map(url => ({ type: 'video', url }));
    return [...images, ...videos];
  };

  const handlePrevMedia = () => {
    const media = getAllMedia();
    setCurrentMediaIndex(prev => prev > 0 ? prev - 1 : media.length - 1);
  };

  const handleNextMedia = () => {
    const media = getAllMedia();
    setCurrentMediaIndex(prev => prev < media.length - 1 ? prev + 1 : 0);
  };

  const handleContactClick = () => {
    const propertyInfo = encodeURIComponent(
      `Bonjour,\n\nJe suis intéressé(e) par le bien suivant :\n\n` +
      `🏠 ${property.title}\n` +
      `📍 ${formatAddressForCard(property.location)}\n` +
      `💰 Prix: ${formatPrice(property.price)}\n` +
      `📐 Surface: ${property.surface}m²\n` +
      `🏡 Type: ${property.type}\n` +
      `🛏️ ${property.bedrooms} chambres, ${property.bathrooms} salles de bain\n\n` +
      `Pourriez-vous me fournir plus d'informations sur ce bien ?\n\n` +
      `Cordialement.`
    );

    navigate(`/contact?property=${property.id}&message=${propertyInfo}`);
  };

  if (loading) {
    return (
      <Container>
        <ContentWrapper>
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </ContentWrapper>
      </Container>
    );
  }

  if (error || !property) {
    return (
      <Container>
        <ContentWrapper>
          <ErrorContainer>
            <h2>Bien non trouvé</h2>
            <p>Le bien que vous recherchez n'existe pas ou n'est plus disponible.</p>
            <BackButton onClick={() => navigate('/properties')}>
              <FaArrowLeft /> Retour aux biens
            </BackButton>
          </ErrorContainer>
        </ContentWrapper>
      </Container>
    );
  }

  const allMedia = getAllMedia();
  const currentMedia = allMedia[currentMediaIndex];

  const features = [
    { icon: <FaHome />, label: 'Surface', value: `${property.surface} m²` },
    { icon: <FaDoorOpen />, label: 'Pièces', value: property.rooms },
    { icon: <FaBed />, label: 'Chambres', value: property.bedrooms },
    { icon: <FaBath />, label: 'Salles de bain', value: property.bathrooms },
  ];

  return (
    <>
      <SEO
        title={`${property.title} - ${property.location.city}`}
        description={property.description}
        keywords={`immobilier, ${property.type}, ${property.location.city}, ${property.location.country}`}
        url={`/properties/${property.id}`}
      />
      <Container>
        <ContentWrapper>
          <BackButton onClick={() => navigate('/properties')}>
            <FaArrowLeft /> Retour aux biens
          </BackButton>

          <PropertyHeader>
            <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyMeta>
              <StatusBadge status={property.status}>{property.status}</StatusBadge>
              <TypeBadge>{property.type}</TypeBadge>
              <RegionBadge>
                {property.location.region === 'Africa' ? 'Afrique' : 'Antilles'}
              </RegionBadge>
            </PropertyMeta>
            <PriceSection>
              <MainPrice>{formatPrice(property.price)}</MainPrice>
              {property.isForRent && property.rentPrice && (
                <RentPrice>Location: {formatPrice(property.rentPrice)}/mois</RentPrice>
              )}
            </PriceSection>
            <Location>
              <FaMapMarkerAlt /> {formatAddressForCard(property.location)}
            </Location>
          </PropertyHeader>

          <MainContent>
            <LeftColumn>
              <MediaSection>
                <MainMediaContainer>
                  {currentMedia ? (
                    currentMedia.type === 'video' ? (
                      <MediaVideo
                        src={currentMedia.url}
                        controls
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : (
                      <MediaImage
                        src={currentMedia.url}
                        alt={property.title}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    )
                  ) : (
                    <MediaPlaceholder>
                      {property.type}
                    </MediaPlaceholder>
                  )}
                  <MediaPlaceholder style={{ display: 'none' }}>
                    {property.type}
                  </MediaPlaceholder>

                  {allMedia.length > 0 && (
                    <MediaControls>
                      <MediaCounter>
                        {currentMediaIndex + 1} / {allMedia.length}
                      </MediaCounter>
                      <MediaNavButtons>
                        <MediaNavButton
                          onClick={handlePrevMedia}
                          disabled={allMedia.length <= 1}
                        >
                          <FaChevronLeft />
                        </MediaNavButton>
                        <MediaNavButton
                          onClick={handleNextMedia}
                          disabled={allMedia.length <= 1}
                        >
                          <FaChevronRight />
                        </MediaNavButton>
                      </MediaNavButtons>
                    </MediaControls>
                  )}
                </MainMediaContainer>

                {allMedia.length > 1 && (
                  <ThumbnailsContainer>
                    {allMedia.map((media, index) => (
                      <Thumbnail
                        key={index}
                        active={index === currentMediaIndex}
                        onClick={() => setCurrentMediaIndex(index)}
                      >
                        {media.type === 'video' ? (
                          <>
                            <ThumbnailVideo src={media.url} />
                            <ThumbnailOverlay><FaPlay /></ThumbnailOverlay>
                          </>
                        ) : (
                          <ThumbnailImage src={media.url} alt={`Vue ${index + 1}`} />
                        )}
                      </Thumbnail>
                    ))}
                  </ThumbnailsContainer>
                )}
              </MediaSection>

              <DetailsSection>
                <SectionTitle>Description</SectionTitle>
                <Description>{property.description}</Description>

                <SectionTitle>Caractéristiques</SectionTitle>
                <FeaturesList>
                  {features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureText>
                        <FeatureLabel>{feature.label}</FeatureLabel>
                        <FeatureValue>{feature.value}</FeatureValue>
                      </FeatureText>
                    </FeatureItem>
                  ))}
                </FeaturesList>

                {property.features && Object.entries(property.features).some(([key, value]) => value) && (
                  <>
                    <SectionTitle style={{ marginTop: '2rem' }}>Équipements</SectionTitle>
                    <FeaturesList>
                      {Object.entries(property.features).filter(([key, value]) => value).map(([key, value]) => {
                        const featureConfig = {
                          piscine: { icon: <FaSwimmingPool />, label: 'Piscine' },
                          jardin: { icon: <FaSeedling />, label: 'Jardin' },
                          garage: { icon: <FaCar />, label: 'Garage' },
                          terrasse: { icon: <FaBuilding />, label: 'Terrasse' },
                          balcon: { icon: <FaBuilding />, label: 'Balcon' },
                          climatisation: { icon: <FaSnowflake />, label: 'Climatisation' },
                          chauffage: { icon: <FaFire />, label: 'Chauffage' },
                          cheminee: { icon: <FaFire />, label: 'Cheminée' },
                          securite: { icon: <FaShieldAlt />, label: 'Sécurité' },
                          ascenseur: { icon: <FaArrowUp />, label: 'Ascenseur' },
                          vueMer: { icon: <FaWater />, label: 'Vue mer' }
                        };

                        const config = featureConfig[key];
                        if (!config) return null;

                        return (
                          <FeatureItem key={key}>
                            <FeatureIcon>{config.icon}</FeatureIcon>
                            <FeatureText>
                              <FeatureLabel>Équipement</FeatureLabel>
                              <FeatureValue>{config.label}</FeatureValue>
                            </FeatureText>
                          </FeatureItem>
                        );
                      })}
                    </FeaturesList>
                  </>
                )}
              </DetailsSection>

            </LeftColumn>

            <RightColumn>
              <ContactSection>
                <SectionTitle>Intéressé par ce bien ?</SectionTitle>
                <ContactButton onClick={handleContactClick}>
                  Contacter l'agence
                </ContactButton>
                <ContactInfo>
                  Notre équipe vous répondra dans les plus brefs délais
                </ContactInfo>
              </ContactSection>

              <DetailsSection>
                <SectionTitle>Localisation</SectionTitle>
                <ApproximateLocationMap
                  location={property.location}
                  style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}
                />
              </DetailsSection>
            </RightColumn>
          </MainContent>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default PropertyDetailPage;