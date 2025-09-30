import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaPhone, FaEnvelope } from 'react-icons/fa';
import SEO from '../components/SEO';
import immobilier1 from '../assets/images/immobilier1.jpeg';
import immobilier2 from '../assets/images/immobilier2.jpg';
import immobilier3 from '../assets/images/immobilier3.jpg';
import immobilier4 from '../assets/images/immobilier4.jpg';
import conseilImage from '../assets/images/conseil.jpeg';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafb 100%);
`;

const HeroSection = styled(motion.section)`
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, rgba(12, 28, 69, 0.9) 100%);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 30%, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(-3px);
  }
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;

const HeroText = styled.div``;

const ServiceTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const ServiceSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  opacity: 0.9;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const HeroImage = styled(motion.div)`
  width: 100%;
  height: 300px;
  background: ${props => props.image ? `url(${props.image}) center/cover` : props.color || props.theme.colors.gold};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.image ? 'rgba(12, 28, 69, 0.3)' : 'transparent'};
    border-radius: 20px;
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const ContentSection = styled.section`
  padding: 4rem 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const Section = styled(motion.div)`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: ${props => props.theme.colors.gold};
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: #64748b;
  line-height: 1.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(12, 28, 69, 0.04);
  border: 1px solid rgba(12, 28, 69, 0.05);

  .icon {
    width: 20px;
    height: 20px;
    background: ${props => props.theme.colors.gold};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .text {
    color: #374151;
    line-height: 1.6;
  }
`;

const ContactCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(12, 28, 69, 0.08);
  border: 1px solid rgba(12, 28, 69, 0.05);
  text-align: center;
`;

const ContactTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ContactText = styled.p`
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ContactButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.theme.colors.gold};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;

  &:hover {
    background: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ProcessSection = styled.div`
  background: #f8fafb;
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const ProcessStep = styled(motion.div)`
  text-align: center;
  padding: 1.5rem 1rem;
  background: white;
  border-radius: 12px;
  position: relative;

  .number {
    width: 40px;
    height: 40px;
    background: ${props => props.theme.colors.primary};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin: 0 auto 1rem;
  }

  .title {
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .description {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const serviceData = {
  location: {
    title: "Location Immobilière de Prestige",
    subtitle: "Découvrez des logements d'exception sélectionnés spécialement pour vous entre l'Afrique et les Antilles",
    icon: "🏠",
    image: immobilier1,
    color: "#3B82F6",
    description: "Votre recherche de logement mérite une approche sur-mesure. Chez BA Immobilier, nous transformons cette étape cruciale en une expérience fluide et personnalisée. Notre expertise bicontinentale nous permet de vous proposer des biens d'exception, rigoureusement sélectionnés selon vos critères et votre style de vie. De l'appartement contemporain au cœur de Dakar à la villa créole face à l'océan en Guadeloupe, chaque bien reflète nos standards d'excellence.",
    features: [
      "Portfolio exclusif de biens premium vérifiés personnellement par nos équipes",
      "Accompagnement VIP avec conseiller dédié tout au long de votre parcours",
      "Gestion administrative complète : de la visite à la remise des clés",
      "Service multilingue français/créole/wolof pour une communication optimale",
      "Visites virtuelles 4K et tours immersifs disponibles 24h/7j",
      "Négociation experte pour obtenir les meilleures conditions tarifaires",
      "Assistance post-installation et suivi de satisfaction personnalisé",
      "Réseau privilégié de partenaires (assurances, utilities, services de déménagement)"
    ],
    process: [
      { title: "Analyse Approfondie", description: "Étude personnalisée de vos besoins, style de vie et contraintes budgétaires" },
      { title: "Sourcing Premium", description: "Sélection ciblée dans notre portfolio exclusif de biens d'exception" },
      { title: "Visites Orchestrées", description: "Organisation de visites guidées avec expertise locale et culturelle" },
      { title: "Finalisation VIP", description: "Négociation, signature et accompagnement jusqu'à votre installation" }
    ]
  },
  achat: {
    title: "Achat & Vente Immobilière Premium",
    subtitle: "Votre partenaire de confiance pour tous vos projets d'acquisition et de cession immobilière",
    icon: "🔑",
    image: immobilier2,
    color: "#10B981",
    description: "Que vous souhaitiez acquérir votre première résidence, investir dans l'immobilier locatif, ou vendre votre bien dans les meilleures conditions, BA Immobilier vous accompagne à chaque étape. Notre expertise bicontinentale nous permet de vous proposer les meilleures opportunités entre l'Afrique et les Antilles, tout en sécurisant vos transactions. De l'évaluation à la signature, nous maximisons la valeur de vos projets immobiliers avec une approche personnalisée et des outils digitaux de pointe.",
    features: [
      "ACHAT : Sourcing exclusif de biens premium et analyse de rentabilité personnalisée",
      "ACHAT : Négociation experte et accompagnement financement avec banques partenaires",
      "ACHAT : Due diligence complète et inspection technique par nos experts",
      "VENTE : Évaluation professionnelle et stratégie de valorisation sur-mesure",
      "VENTE : Marketing digital 360° avec photographie professionnelle et visites virtuelles",
      "VENTE : Base d'acquéreurs qualifiés et négociation jusqu'à la signature",
      "Assistance juridique et fiscale complète pour acheteurs et vendeurs",
      "Suivi post-transaction : gestion locative, conseils patrimoniaux et fiscaux"
    ],
    process: [
      { title: "Analyse de Projet", description: "Évaluation de vos besoins d'achat ou objectifs de vente avec étude de marché" },
      { title: "Recherche & Valorisation", description: "Sourcing de biens premium (achat) ou stratégie de mise en marché (vente)" },
      { title: "Négociation Expert", description: "Optimisation des conditions d'achat ou maximisation du prix de vente" },
      { title: "Finalisation Sécurisée", description: "Accompagnement juridique et administratif jusqu'à la signature" }
    ]
  },
  vente: {
    title: "Valorisation et Vente Premium",
    subtitle: "Maximisez la valeur de votre patrimoine avec notre stratégie de vente sur-mesure",
    icon: "🏢",
    image: immobilier3,
    color: "#F59E0B",
    description: "Vendre un bien immobilier ne se résume pas à trouver un acheteur : c'est orchestrer une stratégie complète pour révéler et maximiser la valeur de votre patrimoine. Notre approche premium combine expertise d'évaluation, marketing digital de pointe, et réseau d'acquéreurs qualifiés à l'international. Que votre bien soit situé dans les quartiers prisés de Dakar, les hauteurs de Fort-de-France, ou les zones en développement d'Abidjan, nous déployons une stratégie sur-mesure pour attirer les meilleurs acquéreurs et négocier dans les conditions optimales.",
    features: [
      "Évaluation multi-critères par expert certifié avec benchmark marché international",
      "Home staging professionnel et mise en scène valorisante de votre bien",
      "Campagne marketing 360° : digital, print, réseau international d'agents",
      "Photographie et vidéographie professionnelle avec visites virtuelles immersives",
      "Base de données exclusive d'acquéreurs pré-qualifiés Diaspora et investisseurs",
      "Négociation experte avec accompagnement psychologique et stratégique",
      "Suivi juridique complet jusqu'à la signature authentique chez le notaire",
      "Optimisation fiscale de la vente selon votre situation patrimoniale"
    ],
    process: [
      { title: "Audit de Valorisation", description: "Évaluation experte et stratégie de positionnement marché optimal" },
      { title: "Mise en Marché Premium", description: "Campagne marketing ciblée avec outils digitaux de dernière génération" },
      { title: "Orchestration des Visites", description: "Sélection d'acquéreurs qualifiés et présentation professionnelle" },
      { title: "Closing Excellence", description: "Négociation finale, sécurisation juridique et transfert de propriété" }
    ]
  },
  renovation: {
    title: "Rénovation & Construction Haut de Gamme",
    subtitle: "De la rénovation complète à la construction neuve, concrétisons ensemble vos projets immobiliers",
    icon: "🔨",
    image: immobilier4,
    color: "#EF4444",
    description: "Transformer un bien existant ou créer votre résidence de rêve nécessite une expertise technique et une vision créative. BA Immobilier vous accompagne dans tous vos projets de rénovation et de construction, en alliant savoir-faire artisanal local et standards internationaux. Que vous souhaitiez rénover une villa coloniale, construire une résidence moderne, ou transformer un bien en investissement locatif premium, nous orchestrons chaque étape avec l'exigence du sur-mesure et le respect des traditions architecturales locales.",
    features: [
      "RÉNOVATION : Étude technique complète et conception architecturale respectueuse du patrimoine",
      "RÉNOVATION : Réaménagement intérieur, modernisation et mise aux normes",
      "RÉNOVATION : Sélection d'artisans locaux qualifiés et matériaux nobles durables",
      "CONSTRUCTION : Recherche foncière, conception sur-mesure et maîtrise d'œuvre complète",
      "CONSTRUCTION : Intégration domotique et solutions énergétiques innovantes",
      "CONSTRUCTION : Suivi de chantier quotidien avec reporting temps réel",
      "Coordination administrative complète : permis, assurances, réceptions",
      "Garanties constructeur et service après-vente personnalisé"
    ],
    process: [
      { title: "Étude de Faisabilité", description: "Diagnostic technique (rénovation) ou recherche foncière (construction)" },
      { title: "Conception Sur-Mesure", description: "Plans architecturaux, design et sélection matériaux premium" },
      { title: "Réalisation Maîtrisée", description: "Coordination chantier, contrôle qualité et respect planning" },
      { title: "Livraison Clé en Main", description: "Réception définitive, formation équipements et garanties" }
    ]
  },
  construction: {
    title: "Construction Haut de Gamme et Maîtrise d'Œuvre",
    subtitle: "Édifiez votre rêve architectural avec notre expertise en construction premium sur-mesure",
    icon: "👷",
    image: immobilier1,
    color: "#8B5CF6",
    description: "Faire construire sa maison représente l'aboutissement de vos aspirations résidentielles. Notre service de construction haut de gamme transforme votre vision en édifice d'exception, en alliant innovation architecturale, techniques de construction avancées et respect des traditions locales. Que vous envisagiez une villa contemporaine face à l'océan en Martinique, une résidence familiale moderne dans la banlieue chic de Dakar, ou un projet mixte résidentiel-commercial en Côte d'Ivoire, nous orchestrons chaque étape avec l'exigence du sur-mesure et l'expertise technique d'un maître d'œuvre expérimenté.",
    features: [
      "Recherche et négociation foncière exclusive avec analyse géologique approfondie",
      "Conception architecturale personnalisée intégrant normes climatiques et culturelles",
      "Maîtrise d'œuvre complète avec planning optimisé et gestion budgétaire rigoureuse",
      "Sélection premium d'entreprises locales certifiées et matériaux nobles durables",
      "Intégration domotique et solutions énergétiques innovantes (solaire, géothermie)",
      "Suivi de chantier quotidien avec reporting photo/vidéo et application mobile dédiée",
      "Coordination administrative complète : permis, assurances, réceptions conformité",
      "Garanties constructeur décennale et service après-vente personnalisé 24 mois"
    ],
    process: [
      { title: "Conception Exclusive", description: "Étude de faisabilité, recherche foncière et avant-projet architectural personnalisé" },
      { title: "Autorisation Premium", description: "Obtention permis de construire, études techniques et validation administrative" },
      { title: "Réalisation Maîtrisée", description: "Coordination chantier, contrôle qualité permanent et respect planning/budget" },
      { title: "Livraison Excellence", description: "Réception définitive, formation équipements et garantie satisfaction totale" }
    ]
  },
  conseil: {
    title: "Conseil Immobilier Stratégique et Gestion Patrimoniale",
    subtitle: "Optimisez votre patrimoine immobilier avec notre expertise conseil high-level personnalisée",
    icon: "📋",
    image: conseilImage,
    color: "#06B6D4",
    description: "Dans un environnement immobilier complexe où chaque décision peut impacter significativement votre patrimoine, disposer d'un conseil expert devient indispensable. Notre service de conseil immobilier stratégique combine analyse financière poussée, connaissance approfondie des marchés africains et antillais, et vision patrimoniale à long terme. Que vous soyez investisseur aguerri cherchant à diversifier votre portefeuille, expatrié planifiant votre retour au pays, ou particulier souhaitant optimiser vos placements immobiliers, nous élaborons des stratégies sur-mesure qui maximisent rendement, sécurité et potentiel de plus-value.",
    features: [
      "Audit patrimonial 360° avec analyse comparative marchés internationaux",
      "Stratégies d'investissement personnalisées selon profil de risque et objectifs",
      "Optimisation fiscale internationale : LMNP, SCI, défiscalisation outre-mer",
      "Conseil en gestion locative premium : sélection locataires, négociation baux",
      "Accompagnement juridique spécialisé : succession, donation, SCI familiale",
      "Veille marché proactive avec alertes opportunités d'investissement exclusives",
      "Simulation et projections financières détaillées sur 10-20 ans",
      "Réseau partenaires experts : notaires, avocats fiscalistes, gestionnaires patrimoine"
    ],
    process: [
      { title: "Diagnostic Patrimonial Complet", description: "Audit approfondi situation financière, objectifs et contraintes personnelles" },
      { title: "Stratégie Personnalisée", description: "Élaboration plan d'action sur-mesure avec simulations et scénarios optimisés" },
      { title: "Mise en Œuvre Accompagnée", description: "Déploiement opérationnel avec suivi rapproché et ajustements en temps réel" },
      { title: "Optimisation Continue", description: "Monitoring performance, rééquilibrage et saisie nouvelles opportunités marché" }
    ]
  }
};

const ServiceDetailPage = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const service = serviceData[serviceType];

  if (!service) {
    return (
      <PageContainer>
        <Container>
          <h1>Service non trouvé</h1>
          <button onClick={() => navigate('/services')}>Retour aux services</button>
        </Container>
      </PageContainer>
    );
  }

  const handleCall = () => {
    window.location.href = 'tel:0662368225';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contact@ba-immobilier.com';
  };

  return (
    <PageContainer>
      <SEO
        title={`${service.title} | BA Immobilier`}
        description={service.description}
        keywords={`${service.title}, immobilier, Afrique, Antilles, BA Immobilier`}
      />

      <HeroSection
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Container>
          <BackButton
            onClick={() => navigate('/services')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft />
            Retour aux services
          </BackButton>

          <HeroContent>
            <HeroText>
              <ServiceTitle
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {service.title}
              </ServiceTitle>
              <ServiceSubtitle
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {service.subtitle}
              </ServiceSubtitle>
            </HeroText>

            <HeroImage
              image={service.image}
              color={service.color}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </HeroContent>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container>
          <ContentGrid>
            <MainContent>
              <Section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <SectionTitle>Description du service</SectionTitle>
                <Description>{service.description}</Description>
              </Section>

              <Section
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <SectionTitle>Ce que nous proposons</SectionTitle>
                <FeaturesList>
                  {service.features.map((feature, index) => (
                    <FeatureItem
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="icon">
                        <FaCheck />
                      </div>
                      <div className="text">{feature}</div>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </Section>

              <ProcessSection>
                <SectionTitle>Notre processus</SectionTitle>
                <ProcessGrid>
                  {service.process.map((step, index) => (
                    <ProcessStep
                      key={index}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                    >
                      <div className="number">{index + 1}</div>
                      <div className="title">{step.title}</div>
                      <div className="description">{step.description}</div>
                    </ProcessStep>
                  ))}
                </ProcessGrid>
              </ProcessSection>
            </MainContent>

            <Sidebar>
              <ContactCard
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <ContactTitle>Intéressé par ce service ?</ContactTitle>
                <ContactText>
                  Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
                </ContactText>
                <ContactButton onClick={handleCall}>
                  <FaPhone />
                  Appeler
                </ContactButton>
                <ContactButton onClick={handleEmail}>
                  <FaEnvelope />
                  Email
                </ContactButton>
              </ContactCard>
            </Sidebar>
          </ContentGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
};

export default ServiceDetailPage;