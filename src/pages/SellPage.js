import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaBuilding,
  FaCar,
  FaSwimmingPool,
  FaSeedling,
  FaSnowflake,
  FaShieldAlt
} from 'react-icons/fa';
import SEO from '../components/SEO';
import sellService from '../services/SellService';

const PageContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, ${props => props.theme.colors.lightGray} 100%);
  padding: 6rem 0 4rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(218, 165, 32, 0.03) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(218, 165, 32, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const FormCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow:
    0 25px 70px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(218, 165, 32, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, #FFD700);
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 0 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.accent};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.colors.lightGray};
    z-index: 0;
  }
`;

const ProgressStep = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;

  background: ${props => {
    if (props.active) return `linear-gradient(135deg, ${props.theme.colors.gold}, #FFD700)`;
    if (props.completed) return `linear-gradient(135deg, #28a745, #20c997)`;
    return 'white';
  }};

  color: ${props => props.active || props.completed ? 'white' : props.theme.colors.text.light};
  border: 3px solid ${props => {
    if (props.active) return props.theme.colors.gold;
    if (props.completed) return '#28a745';
    return props.theme.colors.lightGray;
  }};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

const ProgressLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, ${props => props.theme.colors.gold}, #FFD700);
  transition: width 0.5s ease;
  z-index: 0;
  width: ${props => props.progress}%;
`;

const StepContent = styled(motion.div)`
  min-height: 400px;
`;

const StepTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;

  &.two-columns {
    grid-template-columns: 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &.three-columns {
    grid-template-columns: 1fr 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .required {
    color: #e74c3c;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.light};
  }
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.light};
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const AmenityItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 2px solid ${props => props.checked ? props.theme.colors.gold : props.theme.colors.lightGray};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.checked ? 'rgba(218, 165, 32, 0.05)' : 'white'};

  &:hover {
    border-color: ${props => props.theme.colors.gold};
    background: rgba(218, 165, 32, 0.05);
  }

  input {
    display: none;
  }

  .icon {
    font-size: 1.2rem;
    color: ${props => props.checked ? props.theme.colors.gold : props.theme.colors.text.light};
  }

  .label {
    font-weight: 500;
    color: ${props => props.checked ? props.theme.colors.primary : props.theme.colors.text.dark};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1.5rem;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 150px;
  justify-content: center;

  &.primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
    color: white;
    box-shadow: 0 8px 25px rgba(218, 165, 32, 0.3);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(218, 165, 32, 0.4);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.colors.text.light};
    border: 2px solid ${props => props.theme.colors.lightGray};

    &:hover {
      background: ${props => props.theme.colors.lightGray};
      color: ${props => props.theme.colors.primary};
    }
  }

  &.success {
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(40, 167, 69, 0.4);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;

  .icon {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: ${props => props.theme.colors.text.light};
    line-height: 1.6;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const SellPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    // Étape 1: Informations sur le bien
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    surface: '',
    yearBuilt: '',

    // Étape 2: Localisation
    neighborhood: '',
    address: '',
    amenities: {
      garage: false,
      pool: false,
      garden: false,
      airConditioning: false,
      security: false,
      terrace: false
    },

    // Étape 3: Informations contact
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });

  const amenitiesList = [
    { key: 'garage', label: 'Garage', icon: <FaCar /> },
    { key: 'pool', label: 'Piscine', icon: <FaSwimmingPool /> },
    { key: 'garden', label: 'Jardin', icon: <FaSeedling /> },
    { key: 'airConditioning', label: 'Climatisation', icon: <FaSnowflake /> },
    { key: 'security', label: 'Sécurité', icon: <FaShieldAlt /> },
    { key: 'terrace', label: 'Terrasse', icon: <FaBuilding /> }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenityKey) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenityKey]: !prev.amenities[amenityKey]
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.propertyType && formData.bedrooms && formData.bathrooms &&
               formData.surface && formData.yearBuilt;
      case 2:
        return formData.neighborhood && formData.address;
      case 3:
        return formData.lastName && formData.firstName && formData.email && formData.phone;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // Valider les données
      const validation = sellService.validateSubmissionData(formData);

      if (!validation.isValid) {
        alert('Erreurs de validation:\n' + validation.errors.join('\n'));
        setIsSubmitting(false);
        return;
      }

      // Soumettre la propriété
      const result = await sellService.submitProperty(formData);

      if (result.success) {
        console.log('Form submitted:', result.submission);
        setIsSubmitted(true);
      } else {
        alert('Erreur lors de la soumission: ' + result.error);
      }
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProgressPercentage = () => {
    return ((currentStep - 1) / 2) * 100;
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  if (isSubmitted) {
    return (
      <>
        <SEO
          title="Demande de vente soumise - BA Immobilier"
          description="Votre demande de vente a été soumise avec succès. Notre équipe vous contactera bientôt."
        />
        <PageContainer>
          <Container>
            <FormCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <SuccessMessage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="icon">
                  <FaCheckCircle />
                </div>
                <h2>Demande envoyée avec succès !</h2>
                <p>
                  Merci pour votre confiance. Notre équipe d'experts va analyser votre bien
                  et vous contacter dans les plus brefs délais pour discuter de votre projet de vente.
                </p>
              </SuccessMessage>
            </FormCard>
          </Container>
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Vendre votre bien - BA Immobilier"
        description="Vendez votre bien immobilier avec BA Immobilier. Estimation gratuite et accompagnement personnalisé entre l'Afrique et les Antilles."
        keywords="vendre, bien immobilier, estimation, vente, Afrique, Antilles"
        url="/vendre"
      />
      <PageContainer>
        <Container>
          <FormCard
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Header>
              <Title>Vendez votre bien immobilier</Title>
              <Subtitle>
                Obtenez une estimation gratuite et vendez votre bien avec l'accompagnement
                d'experts entre l'Afrique et les Antilles
              </Subtitle>
            </Header>

            <ProgressBar>
              <ProgressLine progress={getProgressPercentage()} />
              <ProgressStep active={currentStep === 1} completed={currentStep > 1}>
                1
              </ProgressStep>
              <ProgressStep active={currentStep === 2} completed={currentStep > 2}>
                2
              </ProgressStep>
              <ProgressStep active={currentStep === 3}>
                3
              </ProgressStep>
            </ProgressBar>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StepContent
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <StepTitle>
                    <FaHome />
                    Informations sur votre bien
                  </StepTitle>

                  <FormGrid>
                    <FormGroup>
                      <Label>
                        Type de bien <span className="required">*</span>
                      </Label>
                      <Select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Sélectionnez un type</option>
                        <option value="Maison">Maison</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Villa">Villa</option>
                        <option value="Bureau">Bureau</option>
                        <option value="Terrain">Terrain</option>
                      </Select>
                    </FormGroup>
                  </FormGrid>

                  <FormGrid className="two-columns">
                    <FormGroup>
                      <Label>
                        <FaBed />
                        Chambre(s) <span className="required">*</span>
                      </Label>
                      <Select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Nombre de chambres</option>
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num} chambre{num > 1 ? 's' : ''}</option>
                        ))}
                      </Select>
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <FaBath />
                        Salle(s) de bain(s) <span className="required">*</span>
                      </Label>
                      <Select
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Nombre de salles de bain</option>
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} salle{num > 1 ? 's' : ''} de bain</option>
                        ))}
                      </Select>
                    </FormGroup>
                  </FormGrid>

                  <FormGrid className="two-columns">
                    <FormGroup>
                      <Label>
                        <FaRulerCombined />
                        Surface Sq.Ft <span className="required">*</span>
                      </Label>
                      <Input
                        type="number"
                        name="surface"
                        placeholder="Surface en pieds carrés"
                        value={formData.surface}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <FaCalendarAlt />
                        Année de construction <span className="required">*</span>
                      </Label>
                      <Input
                        type="number"
                        name="yearBuilt"
                        placeholder="Année de construction"
                        min="1900"
                        max={new Date().getFullYear()}
                        value={formData.yearBuilt}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormGrid>
                </StepContent>
              )}

              {currentStep === 2 && (
                <StepContent
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <StepTitle>
                    <FaMapMarkerAlt />
                    Localisation et commodités
                  </StepTitle>

                  <FormGrid className="two-columns">
                    <FormGroup>
                      <Label>
                        Quartier <span className="required">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="neighborhood"
                        placeholder="Quartier"
                        value={formData.neighborhood}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        Adresse <span className="required">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="address"
                        placeholder="Adresse complète"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormGrid>

                  <FormGroup>
                    <Label>Commodités</Label>
                    <AmenitiesGrid>
                      {amenitiesList.map(amenity => (
                        <AmenityItem
                          key={amenity.key}
                          checked={formData.amenities[amenity.key]}
                          onClick={() => handleAmenityChange(amenity.key)}
                        >
                          <input
                            type="checkbox"
                            checked={formData.amenities[amenity.key]}
                            onChange={() => handleAmenityChange(amenity.key)}
                          />
                          <span className="icon">{amenity.icon}</span>
                          <span className="label">{amenity.label}</span>
                        </AmenityItem>
                      ))}
                    </AmenitiesGrid>
                  </FormGroup>
                </StepContent>
              )}

              {currentStep === 3 && (
                <StepContent
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                >
                  <StepTitle>
                    <FaUser />
                    Vos informations de contact
                  </StepTitle>

                  <FormGrid className="two-columns">
                    <FormGroup>
                      <Label>
                        Nom <span className="required">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        Prénom <span className="required">*</span>
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormGrid>

                  <FormGrid className="two-columns">
                    <FormGroup>
                      <Label>
                        <FaEnvelope />
                        E-mail <span className="required">*</span>
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>
                        <FaPhone />
                        Téléphone <span className="required">*</span>
                      </Label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Numéro de téléphone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormGrid>

                  <FormGroup className="full-width">
                    <Label>Autres informations</Label>
                    <TextArea
                      name="additionalInfo"
                      placeholder="Partagez-nous toute information supplémentaire sur votre bien..."
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </StepContent>
              )}
            </AnimatePresence>

            <ButtonGroup>
              <Button
                type="button"
                className="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                style={{ opacity: currentStep === 1 ? 0 : 1 }}
                whileHover={{ scale: currentStep !== 1 ? 1.02 : 1 }}
                whileTap={{ scale: currentStep !== 1 ? 0.98 : 1 }}
              >
                <FaArrowLeft />
                Précédent
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  className="primary"
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  whileHover={{ scale: validateStep(currentStep) ? 1.02 : 1 }}
                  whileTap={{ scale: validateStep(currentStep) ? 0.98 : 1 }}
                >
                  Suivant
                  <FaArrowRight />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="success"
                  onClick={handleSubmit}
                  disabled={!validateStep(3) || isSubmitting}
                  whileHover={{ scale: validateStep(3) && !isSubmitting ? 1.02 : 1 }}
                  whileTap={{ scale: validateStep(3) && !isSubmitting ? 0.98 : 1 }}
                >
                  {isSubmitting ? 'Envoi en cours...' : (
                    <>
                      <FaCheckCircle />
                      Envoyer ma demande
                    </>
                  )}
                </Button>
              )}
            </ButtonGroup>
          </FormCard>
        </Container>
      </PageContainer>
    </>
  );
};

export default SellPage;