import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaImage, FaVideo, FaChevronLeft, FaChevronRight, FaSwimmingPool, FaCar, FaWater } from 'react-icons/fa';
import ApproximateLocationMap from './ApproximateLocationMap';
import { formatAddressForCard } from '../utils/addressUtils';

const Card = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const MediaContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const PropertyVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const MediaIndicator = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 10;
`;

const PhotoNavigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 10px;
  pointer-events: none;
  z-index: 20;
`;

const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.2s ease;
  opacity: ${props => props.visible ? 1 : 0};
  transform: scale(${props => props.visible ? 1 : 0.8});

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PhotoCounter = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  z-index: 10;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
`;

const StatusBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status'
})`
  position: absolute;
  top: 15px;
  right: 15px;
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
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const PriceBadge = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
`;

const Location = styled.p`
  color: ${props => props.theme.colors.text.light};
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.p`
  color: ${props => props.theme.colors.text.dark};
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Features = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.8rem;
  color: ${props => props.theme.colors.text.light};
`;

const FeatureValue = styled.span`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  margin-bottom: 0.25rem;
`;

const FeatureLabel = styled.span`
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TypeBadge = styled.span`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
`;

const RegionBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

const EquipmentBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EquipmentBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.primary};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
`;

const PropertyCard = ({ property, onClick }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };


  const getAllImages = () => {
    return property.images || [];
  };

  const getMainMedia = () => {
    const images = getAllImages();
    // Utiliser l'image à l'index actuel ou la première image/vidéo
    if (images.length > 0) {
      const currentImage = images[currentImageIndex] || images[0];
      return { type: 'image', url: currentImage };
    }
    if (property.videos && property.videos.length > 0) {
      return { type: 'video', url: property.videos[0] };
    }
    return null;
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const images = getAllImages();
    if (images.length > 1) {
      setCurrentImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
    }
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const images = getAllImages();
    if (images.length > 1) {
      setCurrentImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
    }
  };

  const getTotalMediaCount = () => {
    const imageCount = property.images ? property.images.length : 0;
    const videoCount = property.videos ? property.videos.length : 0;
    return imageCount + videoCount;
  };

  const handleClick = () => {
    if (onClick) {
      onClick(property);
    } else {
      navigate(`/properties/${property.id}`);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Card
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      onClick={handleClick}
    >
      <MediaContainer
        onMouseEnter={() => setShowNavigation(true)}
        onMouseLeave={() => setShowNavigation(false)}
      >
        {(() => {
          const mainMedia = getMainMedia();
          if (mainMedia) {
            if (mainMedia.type === 'video') {
              return (
                <PropertyVideo
                  src={mainMedia.url}
                  alt={property.title}
                  muted
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              );
            } else {
              return (
                <PropertyImage
                  src={mainMedia.url}
                  alt={property.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              );
            }
          } else {
            return (
              <ImagePlaceholder>
                {property.type}
              </ImagePlaceholder>
            );
          }
        })()}
        <ImagePlaceholder style={{ display: 'none' }}>
          {property.type}
        </ImagePlaceholder>

        {/* Navigation des photos */}
        {getAllImages().length > 1 && (
          <PhotoNavigation>
            <NavButton
              visible={showNavigation}
              onClick={handlePrevImage}
            >
              <FaChevronLeft />
            </NavButton>
            <NavButton
              visible={showNavigation}
              onClick={handleNextImage}
            >
              <FaChevronRight />
            </NavButton>
          </PhotoNavigation>
        )}

        {getTotalMediaCount() > 0 && (
          <MediaIndicator>
            {getMainMedia()?.type === 'video' ? <FaVideo /> : <FaImage />} {getTotalMediaCount()}
          </MediaIndicator>
        )}

        {/* Compteur de photos */}
        {getAllImages().length > 1 && (
          <PhotoCounter>
            {currentImageIndex + 1} / {getAllImages().length}
          </PhotoCounter>
        )}

        <StatusBadge status={property.status}>
          {property.status}
        </StatusBadge>

        <PriceBadge>
          {formatPrice(property.price)}
        </PriceBadge>
      </MediaContainer>

      <Content>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <Title>{property.title}</Title>
        </div>

        <Location>
          <FaMapMarkerAlt /> {formatAddressForCard(property.location)}
          <RegionBadge>
            {property.location.region === 'Africa' ? 'Afrique' : 'Antilles'}
          </RegionBadge>
        </Location>

        <Description>{property.description}</Description>

        <ApproximateLocationMap
          location={property.location}
          style={{ marginBottom: '1rem' }}
        />

        <Features>
          <Feature>
            <FeatureValue>{property.surface}</FeatureValue>
            <FeatureLabel>m²</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{property.rooms}</FeatureValue>
            <FeatureLabel>Pièces</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{property.bedrooms}</FeatureValue>
            <FeatureLabel>Chambres</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{property.bathrooms}</FeatureValue>
            <FeatureLabel>SDB</FeatureLabel>
          </Feature>
        </Features>

        {property.features && Object.entries(property.features).some(([key, value]) => value) && (
          <EquipmentBadges>
            {Object.entries(property.features).filter(([key, value]) => value).slice(0, 3).map(([key, value]) => {
              const equipmentConfig = {
                piscine: { icon: <FaSwimmingPool />, label: 'Piscine' },
                garage: { icon: <FaCar />, label: 'Garage' },
                vueMer: { icon: <FaWater />, label: 'Vue mer' }
              };

              const config = equipmentConfig[key];
              if (!config) return null;

              return (
                <EquipmentBadge key={key}>
                  {config.icon}
                  {config.label}
                </EquipmentBadge>
              );
            })}
          </EquipmentBadges>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TypeBadge>{property.type}</TypeBadge>
          {property.isForRent && property.rentPrice && (
            <span style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
              Location: {formatPrice(property.rentPrice)}/mois
            </span>
          )}
        </div>
      </Content>
    </Card>
  );
};

export default PropertyCard;