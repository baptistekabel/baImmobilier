import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaSearch,
  FaBed,
  FaBath,
  FaCar,
  FaHome,
  FaMapMarkerAlt,
  FaEuroSign,
  FaRulerCombined,
  FaCalendarAlt,
  FaLeaf,
  FaSwimmingPool,
  FaParking,
  FaShieldAlt
} from 'react-icons/fa';

const FiltersContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 40px rgba(12, 28, 69, 0.1);
  margin-bottom: 3rem;
  overflow: hidden;
  border: 1px solid rgba(12, 28, 69, 0.08);
`;

const FiltersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, rgba(12, 28, 69, 0.95));
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, rgba(12, 28, 69, 0.95), ${props => props.theme.colors.primary});
  }
`;

const FiltersTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;

  svg {
    color: ${props => props.theme.colors.gold};
  }
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
  transition: transform 0.3s ease;

  svg {
    font-size: 1.1rem;
    transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.3s ease;
  }
`;

const FiltersContent = styled(motion.div)`
  padding: 2rem;
  background: #fafbfc;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FilterGroup = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(12, 28, 69, 0.05);
  border: 1px solid rgba(12, 28, 69, 0.08);

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.2rem;
    border-radius: 12px;
  }
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;

  svg {
    color: ${props => props.theme.colors.gold};
    font-size: 1.1rem;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #fafbfc;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: white;
    box-shadow: 0 0 0 3px rgba(12, 28, 69, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #fafbfc;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: white;
    box-shadow: 0 0 0 3px rgba(12, 28, 69, 0.1);
  }
`;

const RangeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const RangeInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #fafbfc;
  transition: all 0.3s ease;
  min-width: 0;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: white;
    box-shadow: 0 0 0 3px rgba(12, 28, 69, 0.1);
  }

  &::placeholder {
    color: #94a3b8;
    font-size: 0.9rem;
  }
`;

const RangeSeparator = styled.span`
  color: ${props => props.theme.colors.text.light};
  font-weight: 500;
  font-size: 0.9rem;
  flex-shrink: 0;
  padding: 0 0.2rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    order: 0;
    padding: 0.5rem 0;
  }
`;

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
  margin-top: 0.5rem;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.6rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(12, 28, 69, 0.05);
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: ${props => props.theme.colors.primary};
    cursor: pointer;
  }

  span {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text.dark};
  }
`;

const FiltersActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #e1e8ed;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  ${props => props.primary ? `
    background: linear-gradient(135deg, ${props.theme.colors.primary}, rgba(12, 28, 69, 0.95));
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(12, 28, 69, 0.3);
    }
  ` : `
    background: white;
    color: ${props.theme.colors.text.dark};
    border: 2px solid #e1e8ed;

    &:hover {
      border-color: ${props.theme.colors.primary};
      color: ${props.theme.colors.primary};
    }
  `}

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const ActiveFilterTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;

  svg {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const ResultsCount = styled.div`
  color: ${props => props.theme.colors.text.light};
  font-size: 0.9rem;
  font-weight: 500;
`;

const AdvancedFilters = ({ onFiltersChange, totalResults = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    // Localisation
    city: '',
    country: '',
    region: '',

    // Prix
    priceMin: '',
    priceMax: '',

    // Caractéristiques
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    surfaceMin: '',
    surfaceMax: '',

    // Équipements
    amenities: [],

    // Autres
    yearBuiltMin: '',
    yearBuiltMax: '',
    furnished: '',
    availability: ''
  });

  const propertyTypes = [
    { value: '', label: 'Tous types' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Appartement', label: 'Appartement' },
    { value: 'Maison', label: 'Maison' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Duplex', label: 'Duplex' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Terrain', label: 'Terrain' }
  ];

  const regions = [
    { value: '', label: 'Toutes régions' },
    { value: 'Africa', label: 'Afrique' },
    { value: 'Antilles', label: 'Antilles' },
    { value: 'Europe', label: 'Europe' }
  ];

  const amenitiesList = [
    { id: 'pool', label: 'Piscine', icon: <FaSwimmingPool /> },
    { id: 'parking', label: 'Parking', icon: <FaParking /> },
    { id: 'garden', label: 'Jardin', icon: <FaLeaf /> },
    { id: 'terrace', label: 'Terrasse', icon: <FaHome /> },
    { id: 'security', label: 'Sécurité', icon: <FaShieldAlt /> },
    { id: 'garage', label: 'Garage', icon: <FaCar /> }
  ];

  const roomOptions = [
    { value: '', label: 'Indifférent' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5+', label: '5+' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleAmenityChange = (amenityId) => {
    const newAmenities = filters.amenities.includes(amenityId)
      ? filters.amenities.filter(id => id !== amenityId)
      : [...filters.amenities, amenityId];

    handleFilterChange('amenities', newAmenities);
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      city: '',
      country: '',
      region: '',
      priceMin: '',
      priceMax: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      surfaceMin: '',
      surfaceMax: '',
      amenities: [],
      yearBuiltMin: '',
      yearBuiltMax: '',
      furnished: '',
      availability: ''
    };
    setFilters(emptyFilters);
    if (onFiltersChange) {
      onFiltersChange(emptyFilters);
    }
  };

  const getActiveFilters = () => {
    const active = [];
    if (filters.city && filters.city.trim()) active.push({ key: 'city', label: `Ville: ${filters.city}` });
    if (filters.country && filters.country.trim()) active.push({ key: 'country', label: `Pays: ${filters.country}` });
    if (filters.region && filters.region.trim()) {
      const regionLabel = regions.find(r => r.value === filters.region)?.label;
      if (regionLabel) active.push({ key: 'region', label: `Région: ${regionLabel}` });
    }
    if (filters.propertyType && filters.propertyType.trim()) {
      const typeLabel = propertyTypes.find(t => t.value === filters.propertyType)?.label;
      if (typeLabel) active.push({ key: 'propertyType', label: `Type: ${typeLabel}` });
    }
    if ((filters.priceMin && filters.priceMin.trim()) || (filters.priceMax && filters.priceMax.trim())) {
      const priceRange = `Prix: ${filters.priceMin || '0'}€ - ${filters.priceMax || '∞'}€`;
      active.push({ key: 'price', label: priceRange });
    }
    if (filters.bedrooms && filters.bedrooms.trim()) {
      active.push({ key: 'bedrooms', label: `${filters.bedrooms} chambre(s)` });
    }
    if (filters.bathrooms && filters.bathrooms.trim()) {
      active.push({ key: 'bathrooms', label: `${filters.bathrooms} salle(s) de bain` });
    }
    if (filters.surfaceMin || filters.surfaceMax) {
      const surfaceRange = `Surface: ${filters.surfaceMin || '0'}m² - ${filters.surfaceMax || '∞'}m²`;
      active.push({ key: 'surface', label: surfaceRange });
    }
    if (filters.yearBuiltMin || filters.yearBuiltMax) {
      const yearRange = `Année: ${filters.yearBuiltMin || '1900'} - ${filters.yearBuiltMax || new Date().getFullYear()}`;
      active.push({ key: 'year', label: yearRange });
    }
    if (filters.amenities && filters.amenities.length > 0) {
      filters.amenities.forEach(amenityId => {
        const amenity = amenitiesList.find(a => a.id === amenityId);
        if (amenity) active.push({ key: `amenity_${amenityId}`, label: amenity.label });
      });
    }

    return active;
  };

  const removeFilter = (filterKey) => {
    if (filterKey === 'price') {
      handleFilterChange('priceMin', '');
      handleFilterChange('priceMax', '');
    } else if (filterKey === 'surface') {
      handleFilterChange('surfaceMin', '');
      handleFilterChange('surfaceMax', '');
    } else if (filterKey === 'year') {
      handleFilterChange('yearBuiltMin', '');
      handleFilterChange('yearBuiltMax', '');
    } else if (filterKey.startsWith('amenity_')) {
      const amenityId = filterKey.replace('amenity_', '');
      handleAmenityChange(amenityId);
    } else {
      handleFilterChange(filterKey, '');
    }
  };

  const activeFilters = getActiveFilters();

  return (
    <FiltersContainer
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FiltersHeader onClick={() => setIsExpanded(!isExpanded)}>
        <FiltersTitle>
          <FaFilter />
          Filtres avancés
        </FiltersTitle>
        <ToggleButton isExpanded={isExpanded}>
          <span>{isExpanded ? 'Masquer' : 'Afficher'} les filtres</span>
          <FaChevronDown />
        </ToggleButton>
      </FiltersHeader>

      <AnimatePresence>
        {isExpanded && (
          <FiltersContent
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeFilters.length > 0 && (
              <ActiveFiltersContainer>
                {activeFilters.map((filter) => (
                  <ActiveFilterTag key={filter.key}>
                    {filter.label}
                    <FaTimes onClick={() => removeFilter(filter.key)} />
                  </ActiveFilterTag>
                ))}
              </ActiveFiltersContainer>
            )}

            <FiltersGrid>
              {/* Localisation */}
              <FilterGroup>
                <FilterLabel>
                  <FaMapMarkerAlt />
                  Localisation
                </FilterLabel>
                <FilterSelect
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                >
                  {regions.map(region => (
                    <option key={region.value} value={region.value}>
                      {region.label}
                    </option>
                  ))}
                </FilterSelect>
                <FilterInput
                  type="text"
                  placeholder="Ville"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />
                <FilterInput
                  type="text"
                  placeholder="Pays"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                />
              </FilterGroup>

              {/* Prix */}
              <FilterGroup>
                <FilterLabel>
                  <FaEuroSign />
                  Budget
                </FilterLabel>
                <RangeInputContainer>
                  <RangeInput
                    type="number"
                    placeholder="Prix min"
                    value={filters.priceMin}
                    onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  />
                  <RangeSeparator>à</RangeSeparator>
                  <RangeInput
                    type="number"
                    placeholder="Prix max"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  />
                </RangeInputContainer>
              </FilterGroup>

              {/* Type de bien */}
              <FilterGroup>
                <FilterLabel>
                  <FaHome />
                  Type de bien
                </FilterLabel>
                <FilterSelect
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                  {propertyTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>

              {/* Chambres et salles de bain */}
              <FilterGroup>
                <FilterLabel>
                  <FaBed />
                  Pièces
                </FilterLabel>
                <FilterSelect
                  value={filters.bedrooms}
                  onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                  style={{ marginBottom: '1rem' }}
                >
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} chambre{option.value !== '1' && option.value !== '' ? 's' : ''}
                    </option>
                  ))}
                </FilterSelect>
                <FilterSelect
                  value={filters.bathrooms}
                  onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                >
                  {roomOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label} salle{option.value !== '1' && option.value !== '' ? 's' : ''} de bain
                    </option>
                  ))}
                </FilterSelect>
              </FilterGroup>

              {/* Surface */}
              <FilterGroup>
                <FilterLabel>
                  <FaRulerCombined />
                  Surface (m²)
                </FilterLabel>
                <RangeInputContainer>
                  <RangeInput
                    type="number"
                    placeholder="Surface min"
                    value={filters.surfaceMin}
                    onChange={(e) => handleFilterChange('surfaceMin', e.target.value)}
                  />
                  <RangeSeparator>à</RangeSeparator>
                  <RangeInput
                    type="number"
                    placeholder="Surface max"
                    value={filters.surfaceMax}
                    onChange={(e) => handleFilterChange('surfaceMax', e.target.value)}
                  />
                </RangeInputContainer>
              </FilterGroup>

              {/* Année de construction */}
              <FilterGroup>
                <FilterLabel>
                  <FaCalendarAlt />
                  Année de construction
                </FilterLabel>
                <RangeInputContainer>
                  <RangeInput
                    type="number"
                    placeholder="Année min"
                    value={filters.yearBuiltMin}
                    onChange={(e) => handleFilterChange('yearBuiltMin', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                  <RangeSeparator>à</RangeSeparator>
                  <RangeInput
                    type="number"
                    placeholder="Année max"
                    value={filters.yearBuiltMax}
                    onChange={(e) => handleFilterChange('yearBuiltMax', e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </RangeInputContainer>
              </FilterGroup>
            </FiltersGrid>

            {/* Équipements */}
            <FilterGroup>
              <FilterLabel>
                <FaSwimmingPool />
                Équipements et services
              </FilterLabel>
              <CheckboxGrid>
                {amenitiesList.map(amenity => (
                  <CheckboxItem key={amenity.id}>
                    <input
                      type="checkbox"
                      checked={filters.amenities.includes(amenity.id)}
                      onChange={() => handleAmenityChange(amenity.id)}
                    />
                    <span>{amenity.label}</span>
                  </CheckboxItem>
                ))}
              </CheckboxGrid>
            </FilterGroup>

            <FiltersActions>
              <ResultsCount>
                {totalResults} bien{totalResults !== 1 ? 's' : ''} trouvé{totalResults !== 1 ? 's' : ''}
              </ResultsCount>
              <ActionButton onClick={clearAllFilters}>
                <FaTimes />
                Effacer tout
              </ActionButton>
            </FiltersActions>
          </FiltersContent>
        )}
      </AnimatePresence>
    </FiltersContainer>
  );
};

export default AdvancedFilters;