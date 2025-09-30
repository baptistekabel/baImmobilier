import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

const FAQContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const FAQTitle = styled.h2`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FAQList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  border: 1px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: white;
  border: none;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text.dark};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }

  &:focus {
    outline: none;
    background: ${props => props.theme.colors.lightGray};
  }
`;

const FAQIcon = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const FAQAnswer = styled(motion.div)`
  background: ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.text.dark};
  line-height: 1.6;
  overflow: hidden;
`;

const FAQAnswerContent = styled.div`
  padding: 1.5rem;
  font-size: 0.95rem;

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
`;

const PropertyFAQ = ({ propertyType, location }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // FAQ générale avec questions spécifiques selon le type de bien et la localisation
  const getFAQData = () => {
    const isAfrica = location?.region === 'Africa';
    const isAntilles = location?.region === 'Caribbean';
    const region = isAfrica ? 'Afrique' : isAntilles ? 'Antilles' : 'cette région';
    const country = location?.country || 'ce pays';

    return [
      {
        question: "Quels sont les frais supplémentaires à prévoir ?",
        answer: `
          <p>Lors de l'acquisition d'un bien immobilier ${isAfrica ? 'en Afrique' : 'aux Antilles'}, plusieurs frais sont à prévoir :</p>
          <ul>
            <li><strong>Frais de notaire :</strong> Entre 7% et 12% du prix d'achat selon le pays</li>
            <li><strong>Frais d'agence :</strong> Généralement entre 3% et 6% du prix de vente</li>
            <li><strong>Taxes et droits d'enregistrement :</strong> Variables selon la législation locale</li>
            <li><strong>Frais bancaires :</strong> Si financement, environ 1% à 2% du montant emprunté</li>
            <li><strong>Frais de dossier :</strong> Pour les démarches administratives</li>
          </ul>
          <p>Notre équipe vous accompagne pour estimer précisément ces coûts selon votre projet.</p>
        `
      },
      {
        question: "Puis-je obtenir un financement pour ce bien ?",
        answer: `
          <p>Plusieurs options de financement sont possibles :</p>
          <ul>
            <li><strong>Banques locales :</strong> Financement direct ${isAfrica ? 'en Afrique' : 'aux Antilles'} avec notre accompagnement</li>
            <li><strong>Banques françaises :</strong> Crédit immobilier international pour les résidents français</li>
            <li><strong>Organismes spécialisés :</strong> Partenaires financiers dédiés à l'investissement ${isAfrica ? 'africain' : 'caribéen'}</li>
            <li><strong>Auto-financement :</strong> Solutions d'étalement de paiement</li>
          </ul>
          <p>Notre réseau de partenaires financiers vous aide à trouver la solution la plus adaptée à votre situation.</p>
        `
      },
      {
        question: "Quelles sont les garanties offertes ?",
        answer: `
          <p>BA Immobilier vous offre plusieurs garanties pour sécuriser votre investissement :</p>
          <ul>
            <li><strong>Garantie légale :</strong> Vérification complète des titres de propriété</li>
            <li><strong>Assurance construction :</strong> Pour les biens neufs, garantie décennale</li>
            <li><strong>Garantie de livraison :</strong> Respect des délais et des spécifications</li>
            <li><strong>Service après-vente :</strong> Suivi et assistance post-acquisition</li>
            <li><strong>Réseau local :</strong> Partenaires de confiance pour la maintenance</li>
          </ul>
          <p>Votre tranquillité d'esprit est notre priorité.</p>
        `
      },
      {
        question: `Quels sont les avantages fiscaux en ${country} ?`,
        answer: `
          <p>L'investissement immobilier ${isAfrica ? 'en Afrique' : 'aux Antilles'} peut offrir des avantages fiscaux intéressants :</p>
          <ul>
            <li><strong>Défiscalisation :</strong> Dispositifs d'exonération selon les zones d'investissement</li>
            <li><strong>Amortissements :</strong> Déduction des charges et travaux</li>
            <li><strong>Plus-values :</strong> Régime favorable pour les résidents diaspora</li>
            <li><strong>Transmission :</strong> Avantages successoraux dans certains pays</li>
          </ul>
          <p>Nous vous mettons en relation avec des experts fiscaux spécialisés pour optimiser votre investissement.</p>
        `
      },
      {
        question: "Quel est le délai moyen pour finaliser l'achat ?",
        answer: `
          <p>Le processus d'acquisition varie selon plusieurs facteurs :</p>
          <ul>
            <li><strong>Bien existant :</strong> 2 à 4 mois en moyenne</li>
            <li><strong>Construction neuve :</strong> 6 à 18 mois selon le projet</li>
            <li><strong>Avec financement :</strong> Ajouter 1 à 2 mois pour l'obtention du crédit</li>
            <li><strong>Vérifications légales :</strong> 3 à 6 semaines pour les contrôles</li>
          </ul>
          <p>Notre équipe vous tient informé(e) à chaque étape et optimise les délais grâce à notre expertise locale.</p>
        `
      },
      {
        question: "Est-ce un bon moment pour investir ?",
        answer: `
          <p>Le marché immobilier ${isAfrica ? 'africain' : 'caribéen'} présente de nombreux atouts :</p>
          <ul>
            <li><strong>Croissance démographique :</strong> Population jeune et urbanisation croissante</li>
            <li><strong>Développement économique :</strong> Infrastructures en développement</li>
            <li><strong>Diaspora active :</strong> Demande soutenue de la part des expatriés</li>
            <li><strong>Prix attractifs :</strong> Opportunités d'investissement à fort potentiel</li>
            <li><strong>Stabilité politique :</strong> Amélioration du climat d'investissement</li>
          </ul>
          <p>Nos experts analysent les tendances du marché pour vous conseiller le meilleur timing.</p>
        `
      }
    ];
  };

  const faqData = getFAQData();

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
    <FAQContainer>
      <FAQTitle>
        <FaQuestionCircle />
        Questions fréquentes
      </FAQTitle>
      <FAQList>
        {faqData.map((item, index) => (
          <FAQItem key={index}>
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
    </FAQContainer>
  );
};

export default PropertyFAQ;