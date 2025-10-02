import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import PropertyCard from '../components/PropertyCard';
import AdvancedFilters from '../components/AdvancedFilters';
import { getSeoConfig } from '../utils/seoConfig';
import { propertiesService } from '../services/PropertiesService';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const PropertiesContainer = styled.section`
  padding: 6rem 0 4rem 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, ${props => props.theme.colors.lightGray} 100%);
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
`;

const PropertiesTitle = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 800;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PropertiesDescription = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 2rem auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2rem 0;
  padding: 0 2rem;
`;

const FiltersSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.active ? props.theme.colors.primary : 'transparent'};
  background: ${props => props.active ? props.theme.colors.primary : 'white'};
  color: ${props => props.active ? 'white' : props.theme.colors.primary};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const SearchContainer = styled.div`
  max-width: 500px;
  margin: 0 auto 3rem auto;
  padding: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid #e1e8ed;
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.light};
  }
`;

const PropertiesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text.light};
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.dark};
`;

const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto 3rem auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 150px;
`;

const StatValue = styled.div`
  font-size: 2rem;
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

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [advancedFilters, setAdvancedFilters] = useState({});
  const [stats, setStats] = useState(null);

  const seoConfig = getSeoConfig('properties');

  useEffect(() => {
    loadProperties();
    loadStats();
  }, []);

  useEffect(() => {
    filterProperties();
  }, [properties, searchTerm, activeFilter, advancedFilters]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertiesService.getAvailableProperties();
      setProperties(data);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés:', error);
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

  const filterProperties = () => {
    let filtered = [...properties];

    // Filtrage par recherche
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(lowerSearchTerm) ||
        property.description.toLowerCase().includes(lowerSearchTerm) ||
        property.location.city.toLowerCase().includes(lowerSearchTerm) ||
        property.location.country.toLowerCase().includes(lowerSearchTerm)
      );
    }

    // Filtrage par catégorie (filtres simples)
    if (activeFilter !== 'all') {
      if (activeFilter === 'africa') {
        filtered = filtered.filter(p => p.location.region === 'Africa');
      } else if (activeFilter === 'antilles') {
        filtered = filtered.filter(p => p.location.region === 'Antilles');
      } else {
        filtered = filtered.filter(p => p.type === activeFilter);
      }
    }

    // Filtrage avancé
    if (advancedFilters) {
      // Localisation
      if (advancedFilters.city && advancedFilters.city.trim()) {
        filtered = filtered.filter(p =>
          p.location.city.toLowerCase().includes(advancedFilters.city.toLowerCase())
        );
      }
      if (advancedFilters.country && advancedFilters.country.trim()) {
        filtered = filtered.filter(p =>
          p.location.country.toLowerCase().includes(advancedFilters.country.toLowerCase())
        );
      }
      if (advancedFilters.region && advancedFilters.region.trim()) {
        filtered = filtered.filter(p => p.location.region === advancedFilters.region);
      }

      // Prix
      if (advancedFilters.priceMin && advancedFilters.priceMin.trim()) {
        filtered = filtered.filter(p => p.price >= parseInt(advancedFilters.priceMin));
      }
      if (advancedFilters.priceMax && advancedFilters.priceMax.trim()) {
        filtered = filtered.filter(p => p.price <= parseInt(advancedFilters.priceMax));
      }

      // Type de propriété
      if (advancedFilters.propertyType && advancedFilters.propertyType.trim()) {
        filtered = filtered.filter(p => p.type === advancedFilters.propertyType);
      }

      // Caractéristiques
      if (advancedFilters.bedrooms && advancedFilters.bedrooms.trim()) {
        const bedrooms = advancedFilters.bedrooms === '5+' ? 5 : parseInt(advancedFilters.bedrooms);
        if (advancedFilters.bedrooms === '5+') {
          filtered = filtered.filter(p => p.bedrooms >= bedrooms);
        } else {
          filtered = filtered.filter(p => p.bedrooms === bedrooms);
        }
      }
      if (advancedFilters.bathrooms && advancedFilters.bathrooms.trim()) {
        const bathrooms = advancedFilters.bathrooms === '5+' ? 5 : parseInt(advancedFilters.bathrooms);
        if (advancedFilters.bathrooms === '5+') {
          filtered = filtered.filter(p => p.bathrooms >= bathrooms);
        } else {
          filtered = filtered.filter(p => p.bathrooms === bathrooms);
        }
      }

      // Surface
      if (advancedFilters.surfaceMin && advancedFilters.surfaceMin.trim()) {
        filtered = filtered.filter(p => p.surface >= parseInt(advancedFilters.surfaceMin));
      }
      if (advancedFilters.surfaceMax && advancedFilters.surfaceMax.trim()) {
        filtered = filtered.filter(p => p.surface <= parseInt(advancedFilters.surfaceMax));
      }

      // Année de construction
      if (advancedFilters.yearBuiltMin && advancedFilters.yearBuiltMin.trim()) {
        filtered = filtered.filter(p => p.yearBuilt >= parseInt(advancedFilters.yearBuiltMin));
      }
      if (advancedFilters.yearBuiltMax && advancedFilters.yearBuiltMax.trim()) {
        filtered = filtered.filter(p => p.yearBuilt <= parseInt(advancedFilters.yearBuiltMax));
      }

      // Équipements
      if (advancedFilters.amenities && advancedFilters.amenities.length > 0) {
        filtered = filtered.filter(property => {
          // Vérifier que la propriété a tous les équipements demandés
          return advancedFilters.amenities.every(amenity =>
            property.amenities && property.amenities.includes(amenity)
          );
        });
      }
    }

    setFilteredProperties(filtered);
  };


  const filters = [
    { key: 'all', label: 'Tous les biens' },
    { key: 'africa', label: 'Afrique' },
    { key: 'antilles', label: 'Antilles' },
    { key: 'Villa', label: 'Villas' },
    { key: 'Appartement', label: 'Appartements' },
    { key: 'Maison', label: 'Maisons' },
  ];

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />
      <PropertiesContainer>
        <HeaderSection>
          <PropertiesTitle>Nos Biens Immobiliers</PropertiesTitle>
          <PropertiesDescription>
            Découvrez notre sélection exclusive de biens immobiliers de prestige
            entre l'Afrique et les Antilles. Des opportunités d'investissement uniques
            vous attendent.
          </PropertiesDescription>

          {stats && (
            <StatsContainer>
              <StatCard>
                <StatValue>{stats.total}</StatValue>
                <StatLabel>Biens disponibles</StatLabel>
              </StatCard>
              {stats.parRegion.Afrique && (
                <StatCard>
                  <StatValue>{stats.parRegion.Afrique}</StatValue>
                  <StatLabel>En Afrique</StatLabel>
                </StatCard>
              )}
              {stats.parRegion.Antilles && (
                <StatCard>
                  <StatValue>{stats.parRegion.Antilles}</StatValue>
                  <StatLabel>Aux Antilles</StatLabel>
                </StatCard>
              )}
              {stats.prixMoyen > 0 && (
                <StatCard>
                  <StatValue>{propertiesService.formatPrice(stats.prixMoyen)}</StatValue>
                  <StatLabel>Prix moyen</StatLabel>
                </StatCard>
              )}
            </StatsContainer>
          )}

          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Rechercher par ville, pays, titre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FiltersContainer>
            {filters.map(filter => (
              <FilterButton
                key={filter.key}
                active={activeFilter === filter.key}
                onClick={() => setActiveFilter(filter.key)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FiltersContainer>
        </HeaderSection>

        <FiltersSection>
          <AdvancedFilters
            onFiltersChange={setAdvancedFilters}
            totalResults={filteredProperties.length}
          />
        </FiltersSection>

        {loading ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : filteredProperties.length > 0 ? (
          <PropertiesGrid>
            <AnimatePresence>
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </AnimatePresence>
          </PropertiesGrid>
        ) : (
          <EmptyState>
            <EmptyStateTitle>
              {searchTerm || activeFilter !== 'all'
                ? 'Aucun bien ne correspond à vos critères'
                : 'Aucun bien disponible pour le moment'
              }
            </EmptyStateTitle>
            <p>
              {searchTerm || activeFilter !== 'all'
                ? 'Essayez de modifier vos filtres ou votre recherche.'
                : 'Nos biens seront bientôt disponibles. Revenez nous voir prochainement !'
              }
            </p>
          </EmptyState>
        )}
      </PropertiesContainer>
    </>
  );
};

export default PropertiesPage;