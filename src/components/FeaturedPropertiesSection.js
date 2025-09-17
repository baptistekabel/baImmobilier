import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { propertiesService } from '../services/PropertiesService';

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const PropertiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ViewAllButton = styled(motion.div)`
  text-align: center;
  margin-top: 2rem;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: ${props => props.theme.colors.text.light};
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.light};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FeaturedPropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
    loadStats();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      setLoading(true);
      const data = await propertiesService.getFeaturedProperties(6);
      setProperties(data);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés en vedette:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statistics = await propertiesService.getPublicStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };


  if (loading) {
    return (
      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Nos Biens en Vedette</SectionTitle>
            <SectionSubtitle>
              Découvrez une sélection de nos plus beaux biens immobiliers
            </SectionSubtitle>
          </SectionHeader>
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </Container>
      </Section>
    );
  }

  if (properties.length === 0) {
    return (
      <Section>
        <Container>
          <SectionHeader>
            <SectionTitle>Nos Biens en Vedette</SectionTitle>
            <SectionSubtitle>
              Nos biens exceptionnels seront bientôt disponibles
            </SectionSubtitle>
          </SectionHeader>
          <EmptyState>
            <p>Revenez nous voir prochainement pour découvrir notre sélection exclusive !</p>
          </EmptyState>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Nos Biens en Vedette</SectionTitle>
          <SectionSubtitle>
            Découvrez une sélection de nos plus beaux biens immobiliers entre l'Afrique et les Antilles
          </SectionSubtitle>
        </SectionHeader>

        {stats && (
          <StatsContainer>
            <StatItem>
              <StatValue>{stats.total}</StatValue>
              <StatLabel>Biens disponibles</StatLabel>
            </StatItem>
            {stats.parRegion.Afrique && (
              <StatItem>
                <StatValue>{stats.parRegion.Afrique}</StatValue>
                <StatLabel>En Afrique</StatLabel>
              </StatItem>
            )}
            {stats.parRegion.Antilles && (
              <StatItem>
                <StatValue>{stats.parRegion.Antilles}</StatValue>
                <StatLabel>Aux Antilles</StatLabel>
              </StatItem>
            )}
          </StatsContainer>
        )}

        <PropertiesGrid>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PropertyCard
                property={property}
              />
            </motion.div>
          ))}
        </PropertiesGrid>

        <ViewAllButton
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <StyledLink to="/properties">
            Voir tous nos biens
            <span>→</span>
          </StyledLink>
        </ViewAllButton>
      </Container>
    </Section>
  );
};

export default FeaturedPropertiesSection;