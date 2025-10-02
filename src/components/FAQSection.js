import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FAQContainer = styled(motion.section)`
  padding: 8rem 0;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.3;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 5rem 0;
  }
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.gold});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${props => props.theme.colors.gold}, transparent);
    border-radius: 2px;
  }
`;

const FAQList = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 4rem;
`;

const FAQItem = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(12, 28, 69, 0.08);
  border: 1px solid rgba(12, 28, 69, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(12, 28, 69, 0.12);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 2rem 2.5rem;
  background: white;
  border: none;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(12, 28, 69, 0.02);
  }

  &:focus {
    outline: none;
    background: rgba(12, 28, 69, 0.02);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 1.8rem;
    font-size: 1rem;
  }
`;

const FAQIcon = styled.div`
  color: ${props => props.theme.colors.gold};
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  flex-shrink: 0;
  margin-left: 1rem;
`;

const FAQAnswer = styled(motion.div)`
  background: rgba(12, 28, 69, 0.02);
  color: #64748b;
  line-height: 1.7;
  overflow: hidden;
`;

const FAQAnswerContent = styled.div`
  padding: 2rem 2.5rem;
  font-size: 1rem;

  p {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem 1.8rem;
    font-size: 0.95rem;
  }
`;

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set());
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "Quels sont les avantages d'investir avec BA Immobilier ?",
      answer: `
        <p>BA Immobilier vous offre une expertise unique pour investir sereinement entre l'Afrique et les Antilles :</p>
        <ul>
          <li><strong>Double expertise :</strong> Connaissance approfondie des marchés africains et antillais</li>
          <li><strong>Réseau privilégié :</strong> Partenaires locaux de confiance et biens exclusifs</li>
          <li><strong>Accompagnement complet :</strong> De la recherche à la gestion locative</li>
          <li><strong>Transparence totale :</strong> Process clairs et reporting régulier</li>
          <li><strong>Sécurisation :</strong> Vérifications juridiques et garanties constructeur</li>
        </ul>
        <p>Votre réussite immobilière est notre priorité.</p>
      `
    },
    {
      question: "Comment puis-je financer mon investissement immobilier ?",
      answer: `
        <p>Plusieurs solutions de financement s'offrent à vous :</p>
        <ul>
          <li><strong>Banques françaises :</strong> Crédit immobilier international pour les résidents français</li>
          <li><strong>Banques locales :</strong> Financement direct en Afrique et aux Antilles</li>
          <li><strong>Organismes spécialisés :</strong> Partenaires financiers dédiés à l'investissement diaspora</li>
          <li><strong>Solutions hybrides :</strong> Combinaison de financements pour optimiser votre projet</li>
          <li><strong>Auto-financement :</strong> Plans de paiement étalés et flexibles</li>
        </ul>
        <p>Notre réseau de partenaires financiers vous aide à trouver la solution optimale.</p>
      `
    },
    {
      question: "Quelles garanties offrez-vous sur vos projets ?",
      answer: `
        <p>BA Immobilier vous propose des garanties complètes pour sécuriser votre investissement :</p>
        <ul>
          <li><strong>Garantie légale :</strong> Vérification complète des titres de propriété</li>
          <li><strong>Assurance construction :</strong> Garantie décennale sur les biens neufs</li>
          <li><strong>Garantie de livraison :</strong> Respect des délais et des spécifications</li>
          <li><strong>Service après-vente :</strong> Suivi personnalisé post-acquisition</li>
          <li><strong>Réseau de maintenance :</strong> Partenaires locaux pour l'entretien</li>
        </ul>
        <p>Votre tranquillité d'esprit est notre engagement.</p>
      `
    },
    {
      question: "Puis-je investir à distance depuis l'étranger ?",
      answer: `
        <p>Absolument ! BA Immobilier a été conçu pour accompagner la diaspora dans ses investissements :</p>
        <ul>
          <li><strong>Gestion complète à distance :</strong> Toutes les démarches sont gérées pour vous</li>
          <li><strong>Outils digitaux :</strong> Visites virtuelles, signatures électroniques, suivi en ligne</li>
          <li><strong>Communication multicanal :</strong> WhatsApp, visioconférence, rapports réguliers</li>
          <li><strong>Mandataire sur place :</strong> Représentation légale pour toutes les formalités</li>
          <li><strong>Transparence totale :</strong> Accès 24h/7j aux documents et avancement de votre projet</li>
        </ul>
        <p>Distance ne rime plus avec difficulté grâce à notre accompagnement expert.</p>
      `
    },
    {
      question: "Quels sont les délais moyens pour concrétiser un investissement ?",
      answer: `
        <p>Les délais varient selon le type de projet choisi :</p>
        <ul>
          <li><strong>Bien existant :</strong> 2 à 4 mois de la réservation à la signature</li>
          <li><strong>Construction neuve :</strong> 6 à 18 mois selon l'ampleur du projet</li>
          <li><strong>Avec financement :</strong> Ajouter 1 à 2 mois pour l'obtention du crédit</li>
          <li><strong>Vérifications légales :</strong> 3 à 6 semaines pour les contrôles</li>
          <li><strong>Chasseur de biens :</strong> 1 à 3 mois selon les critères de recherche</li>
        </ul>
        <p>Notre expertise locale optimise les délais et vous tient informé à chaque étape.</p>
      `
    },
    {
      question: "Proposez-vous un service de gestion locative ?",
      answer: `
        <p>Oui, BA Immobilier propose une gestion locative complète pour optimiser votre rentabilité :</p>
        <ul>
          <li><strong>Recherche de locataires :</strong> Sélection rigoureuse et vérifications approfondies</li>
          <li><strong>Gestion administrative :</strong> Baux, états des lieux, quittances</li>
          <li><strong>Maintenance et entretien :</strong> Réseau d'artisans qualifiés</li>
          <li><strong>Suivi financier :</strong> Recouvrement, comptabilité, reporting mensuel</li>
          <li><strong>Relation locataire :</strong> Interface permanente pour les demandes</li>
        </ul>
        <p>Investissez l'esprit tranquille, nous nous occupons de tout.</p>
      `
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const answerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <FAQContainer ref={sectionRef} id="faq">
      <Container>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <FaQuestionCircle />
          Questions fréquentes
        </SectionTitle>

        <FAQList
          variants={listVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              variants={itemVariants}
            >
              <FAQQuestion onClick={() => toggleItem(index)}>
                {item.question}
                <FAQIcon isOpen={openItems.has(index)}>
                  {openItems.has(index) ? <FaMinus /> : <FaPlus />}
                </FAQIcon>
              </FAQQuestion>
              <AnimatePresence>
                {openItems.has(index) && (
                  <FAQAnswer
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <FAQAnswerContent
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </FAQContainer>
  );
};

export default FAQSection;