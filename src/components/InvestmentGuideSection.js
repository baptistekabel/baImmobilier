import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDownload, FaFileAlt, FaChartLine, FaMapMarkedAlt, FaShieldAlt, FaStar, FaEnvelope, FaTimes, FaCheck } from 'react-icons/fa';
import downloadService from '../services/DownloadService';

const Section = styled.section`
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9ff 0%, ${props => props.theme.colors.lightGray} 100%);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(218, 165, 32, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(218, 165, 32, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-family: ${props => props.theme.fonts.accent};
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text.light};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const GuideContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const GuideContent = styled.div`
  order: 1;

  @media (max-width: 968px) {
    order: 2;
  }
`;

const GuideVisual = styled.div`
  order: 2;
  position: relative;

  @media (max-width: 968px) {
    order: 1;
  }
`;

const GuideTitle = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const GuideDescription = styled.p`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.dark};
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem 0;
`;

const FeatureIcon = styled.div`
  width: 24px;
  height: 24px;
  color: ${props => props.theme.colors.gold};
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  color: ${props => props.theme.colors.text.dark};
  font-size: 1rem;
  font-weight: 500;
`;

const DownloadButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  color: white;
  border: none;
  padding: 1.25rem 2.5rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${props => props.theme.fonts.title};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 30px rgba(218, 165, 32, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #FFD700, ${props => props.theme.colors.gold});
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 40px rgba(218, 165, 32, 0.5);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }
`;

const DownloadIcon = styled.div`
  font-size: 1.3rem;
`;

const VisualCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(218, 165, 32, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, #FFD700);
  }
`;

const PDFIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #1a2b5e);
  color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(12, 28, 69, 0.2);
`;

const VisualTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const VisualDescription = styled.p`
  color: ${props => props.theme.colors.text.light};
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const VisualStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.text.light};
  font-weight: 500;
`;

// Styles pour le modal
const ModalOverlay = styled(motion.div)`
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
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text.light};
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  text-align: center;
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.colors.text.light};
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const EmailForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(12, 28, 69, 0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.light};
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.colors.text.light};
  font-size: 1.1rem;
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #FFD700, ${props => props.theme.colors.gold});
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(218, 165, 32, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  color: #27ae60;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;

const InvestmentGuideSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleDownloadClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
    setError('');
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
    if (!email) {
      setError('Veuillez saisir votre adresse email');
      setIsSubmitting(false);
      return;
    }

    if (!downloadService.validateEmail(email)) {
      setError('Veuillez saisir une adresse email valide');
      setIsSubmitting(false);
      return;
    }

    try {
      // Enregistrer le téléchargement
      await downloadService.recordDownload(email, '', 'investment-guide');

      // Lancer le téléchargement
      const downloadSuccess = downloadService.downloadPDF();

      if (downloadSuccess) {
        setIsSuccess(true);
        setTimeout(() => {
          closeModal();
        }, 2000);
      } else {
        setError('Erreur lors du téléchargement. Veuillez réessayer.');
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: <FaMapMarkedAlt />, text: "Analyse des marchés Afrique & Antilles" },
    { icon: <FaChartLine />, text: "Stratégies d'investissement rentables" },
    { icon: <FaShieldAlt />, text: "Sécurisation juridique et fiscale" },
    { icon: <FaStar />, text: "Conseils d'experts pour la diaspora" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Guide de l'Investissement
          </SectionTitle>
          <SectionSubtitle
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Téléchargez notre guide complet pour réussir vos investissements immobiliers entre l'Afrique et les Antilles
          </SectionSubtitle>
        </SectionHeader>

        <GuideContainer
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <GuideContent>
            <motion.div variants={itemVariants}>
              <GuideTitle>
                Votre feuille de route pour un investissement réussi
              </GuideTitle>
              <GuideDescription>
                Découvrez les clés d'un investissement immobilier rentable et sécurisé.
                Notre guide exclusif vous révèle les stratégies éprouvées pour investir
                sereinement en Afrique et aux Antilles, même à distance.
              </GuideDescription>

              <FeaturesList>
                {features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <FeatureIcon>{feature.icon}</FeatureIcon>
                    <FeatureText>{feature.text}</FeatureText>
                  </FeatureItem>
                ))}
              </FeaturesList>

              <DownloadButton
                onClick={handleDownloadClick}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <DownloadIcon>
                  <FaDownload />
                </DownloadIcon>
                Télécharger le guide gratuit
              </DownloadButton>
            </motion.div>
          </GuideContent>

          <GuideVisual>
            <VisualCard
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <PDFIcon>
                <FaFileAlt />
              </PDFIcon>
              <VisualTitle>Guide Complet PDF</VisualTitle>
              <VisualDescription>
                Plus de 50 pages d'expertise pour maximiser vos investissements
                immobiliers en toute sécurité.
              </VisualDescription>
              <VisualStats>
                <StatItem>
                  <StatNumber>50+</StatNumber>
                  <StatLabel>Pages d'expertise</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>100%</StatNumber>
                  <StatLabel>Gratuit</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>2</StatNumber>
                  <StatLabel>Continents</StatLabel>
                </StatItem>
                <StatItem>
                  <StatNumber>10+</StatNumber>
                  <StatLabel>Stratégies</StatLabel>
                </StatItem>
              </VisualStats>
            </VisualCard>
          </GuideVisual>
        </GuideContainer>
      </Container>

      {/* Modal de téléchargement */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseButton onClick={closeModal}>
                <FaTimes />
              </ModalCloseButton>

              {!isSuccess ? (
                <>
                  <ModalTitle>Télécharger le Guide</ModalTitle>
                  <ModalDescription>
                    Saisissez votre adresse email pour télécharger notre guide d'investissement immobilier gratuit.
                  </ModalDescription>

                  <EmailForm onSubmit={handleSubmit}>
                    <InputGroup>
                      <InputIcon>
                        <FaEnvelope />
                      </InputIcon>
                      <EmailInput
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>


                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <SubmitButton
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        'Téléchargement...'
                      ) : (
                        <>
                          <FaDownload />
                          Télécharger maintenant
                        </>
                      )}
                    </SubmitButton>
                  </EmailForm>
                </>
              ) : (
                <SuccessMessage
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <FaCheck />
                  Téléchargement en cours ! Merci pour votre intérêt.
                </SuccessMessage>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Section>
  );
};

export default InvestmentGuideSection;