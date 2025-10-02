import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  FaBuilding,
  FaHome,
  FaGlobeAmericas,
  FaHeart,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaHandshake,
  FaFlag,
  FaUniversity,
  FaBriefcase,
  FaStar,
  FaKey,
  FaTools,
  FaCompass
} from 'react-icons/fa';
import idrissPhoto from '../assets/images/idriss.jpeg';
import presentationVideo from '../assets/videos/presentationIdriss.mp4';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(218, 165, 32, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(218, 165, 32, 0); }
  100% { box-shadow: 0 0 0 0 rgba(218, 165, 32, 0); }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const AboutContainer = styled.section`
  padding: 0;
  background: #ffffff;
  position: relative;
  overflow: hidden;
`;

// Hero Section
const HeroSection = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, rgba(12, 28, 69, 0.95) 100%);
  color: white;
  padding: 8rem 0 6rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 120%;
    height: 200%;
    background: radial-gradient(ellipse at center, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
    animation: ${float} 20s ease-in-out infinite;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 6rem 0 4rem 0;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 400px;
    gap: 6rem;
  }
`;

const HeroContent = styled.div`
  text-align: center;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: left;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #ffffff, ${props => props.theme.colors.gold});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
  }
`;

const HeroMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  order: -1;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    order: 0;
  }
`;

// Content Sections
const MainSection = styled.section`
  padding: 6rem 0;

  &:nth-child(even) {
    background: #f8fafb;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 4rem 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.primary};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, ${props => props.theme.colors.primary});
    border-radius: 2px;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;

    &.reverse {
      direction: rtl;
      * {
        direction: ltr;
      }
    }
  }
`;

const TextContent = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4a5568;
    margin-bottom: 1.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MediaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 2.5rem;
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInLeft} 1s ease-out;
`;

const ProfileImage = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #B8860B);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    ${props => props.theme.shadows.heavy},
    0 0 60px rgba(218, 165, 32, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    transform: scale(1.05);
    box-shadow:
      ${props => props.theme.shadows.heavy},
      0 0 80px rgba(218, 165, 32, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.white};
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    padding: 8px;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    width: 250px;
    height: 250px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 200px;
    height: 200px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 350px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.heavy};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  video {
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 300px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 250px;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(218, 165, 32, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.theme.colors.gold};
    transform: translate(-50%, -50%) scale(1.1);
  }

  &::after {
    content: '▶';
    color: white;
    font-size: 1.5rem;
    margin-left: 5px;
  }
`;

// Nouveaux composants pour le contenu restructuré
const ContentSection = styled.div`
  margin-bottom: 5rem;
  position: relative;
`;

const ContentTitle = styled.h3`
  font-size: 2.2rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: ${props => props.theme.fonts.title};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.8rem;
    text-align: center;
    justify-content: center;
  }
`;

const ContentText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const HighlightText = styled.span`
  color: ${props => props.theme.colors.gold};
  font-weight: 600;
`;

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(218, 165, 32, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(218, 165, 32, 0.4);
    transform: translateX(10px);
  }
`;

const ListIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
  color: ${props => props.theme.colors.white};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ServiceCard = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(218, 165, 32, 0.3);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(218, 165, 32, 0.6);
    box-shadow: 0 15px 40px rgba(218, 165, 32, 0.2);
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
  color: ${props => props.theme.colors.white};
`;

const ServiceTitle = styled.h4`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.title};
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const ExperienceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const ExperienceCard = styled.div`
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(218, 165, 32, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(218, 165, 32, 0.5);
    transform: translateY(-5px);
  }
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
  color: ${props => props.theme.colors.white};
`;

const CompanyName = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.title};
`;

const Position = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.85rem;
  opacity: 0.9;
  line-height: 1.5;
`;

// Composant pour la vidéo intégrée dans le contenu
const IntegratedVideoSection = styled.div`
  margin: 4rem 0;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(218, 165, 32, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(218, 165, 32, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin: 2rem 0;
    padding: 2rem 1rem;
  }
`;

const IntegratedVideoTitle = styled.h3`
  font-size: 2rem;
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.title};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.6rem;
  }
`;

const IntegratedVideoDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 auto 2rem;
  max-width: 500px;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin: 0 auto 1.5rem;
  }
`;

const IntegratedVideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.heavy};
  transition: all 0.3s ease;
  margin: 0 auto;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const AboutSection = () => {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isSecondVideoPlaying, setIsSecondVideoPlaying] = useState(false);

  // Données structurées pour le nouveau contenu avec traductions
  const senegalAdvantages = [
    { icon: <FaChartLine />, text: t('about.senegal.economy') },
    { icon: <FaUsers />, text: t('about.senegal.demand') },
    { icon: <FaGlobeAmericas />, text: t('about.senegal.diaspora') }
  ];

  const experiences = [
    {
      icon: <FaBuilding />,
      company: "Cogedim",
      position: t('about.journey.cogedim').split(' - ')[0] || "Promotion immobilière",
      description: t('about.journey.cogedim')
    },
    {
      icon: <FaHome />,
      company: "Foncia",
      position: t('about.journey.foncia').split(' - ')[0] || "Conseiller Commercial",
      description: t('about.journey.foncia')
    }
  ];

  const services = [
    { icon: <FaKey />, title: t('about.commitments.buyAndSell'), description: t('about.commitments.buyAndSellDesc') },
    { icon: <FaTools />, title: t('about.commitments.construction'), description: t('about.commitments.constructionDesc') },
    { icon: <FaHome />, title: t('about.commitments.rental'), description: t('about.commitments.rentalDesc') },
    { icon: <FaHandshake />, title: t('about.commitments.concierge'), description: t('about.commitments.conciergeDesc') },
    { icon: <FaShieldAlt />, title: t('about.commitments.estimation'), description: t('about.commitments.estimationDesc') },
    { icon: <FaCompass />, title: t('about.commitments.advice'), description: t('about.commitments.adviceDesc') }
  ];

  const promises = [
    { icon: <FaShieldAlt />, text: t('about.promise.rigor') },
    { icon: <FaHandshake />, text: t('about.promise.proximity') },
    { icon: <FaGlobeAmericas />, text: t('about.promise.vision') }
  ];

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    const video = document.getElementById('presentation-video');
    if (video) {
      video.play();
    }
  };

  const handleSecondVideoPlay = () => {
    setIsSecondVideoPlaying(true);
    const video = document.getElementById('integrated-video');
    if (video) {
      video.play();
    }
  };


  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContainer>
          <HeroGrid>
            <HeroContent>
              <HeroTitle>{t('about.story.title')}</HeroTitle>
              <HeroSubtitle>{t('about.story.intro')}</HeroSubtitle>
              <HeroSubtitle>
                <strong>{t('about.story.identity')}</strong>
              </HeroSubtitle>
            </HeroContent>
            <HeroMediaContainer>
              <ProfileImage>
                <img src={idrissPhoto} alt="Idriss Ba" />
              </ProfileImage>
              <VideoContainer>
                <video
                  id="presentation-video"
                  controls={isVideoPlaying}
                  poster="./previewVideo.png"
                  onPlay={() => setIsVideoPlaying(true)}
                >
                  <source src={presentationVideo} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                {!isVideoPlaying && (
                  <PlayButton onClick={handleVideoPlay} />
                )}
              </VideoContainer>
            </HeroMediaContainer>
          </HeroGrid>
        </HeroContainer>
      </HeroSection>

      {/* Mission Section */}
      <MainSection>
        <Container>
          <SectionTitle>{t('about.story.mission')}</SectionTitle>
          <SectionGrid>
            <TextContent>
              <p>{t('about.mission.intro')}</p>
              <ListContainer>
                <ListItem>
                  <ListIcon><FaUsers /></ListIcon>
                  <span>{t('about.mission.diaspora')}</span>
                </ListItem>
                <ListItem>
                  <ListIcon><FaShieldAlt /></ListIcon>
                  <span>{t('about.mission.local')}</span>
                </ListItem>
                <ListItem>
                  <ListIcon><FaMapMarkedAlt /></ListIcon>
                  <span>{t('about.mission.future')}</span>
                </ListItem>
              </ListContainer>
            </TextContent>
            <MediaContainer>
              {/* On peut ajouter une image ou graphique ici */}
            </MediaContainer>
          </SectionGrid>
        </Container>
      </MainSection>

      {/* Sénégal Section */}
      <MainSection>
        <Container>
          <SectionTitle>{t('about.senegal.title')}</SectionTitle>
          <SectionGrid className="reverse">
            <MediaContainer>
              {/* Image du Sénégal ou carte */}
            </MediaContainer>
            <TextContent>
              <p><strong>{t('about.senegal.intro')}</strong></p>
              <ListContainer>
                {senegalAdvantages.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon>{item.icon}</ListIcon>
                    <span>{item.text}</span>
                  </ListItem>
                ))}
              </ListContainer>
              <p><strong>{t('about.senegal.conclusion')}</strong></p>
            </TextContent>
          </SectionGrid>
        </Container>
      </MainSection>

      {/* Parcours Section */}
      <MainSection>
        <Container>
          <SectionTitle>{t('about.journey.title')}</SectionTitle>
          <TextContent style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p><strong>{t('about.journey.education')}</strong></p>
            <p>{t('about.journey.experience')}</p>
          </TextContent>
          <ExperienceGrid>
            {experiences.map((exp, index) => (
              <ExperienceCard key={index}>
                <CompanyLogo>{exp.icon}</CompanyLogo>
                <CompanyName>{exp.company}</CompanyName>
                <Position>{exp.position}</Position>
                <Description>{exp.description}</Description>
              </ExperienceCard>
            ))}
          </ExperienceGrid>
          <TextContent style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p><strong>{t('about.journey.conclusion')}</strong></p>
          </TextContent>
        </Container>
      </MainSection>

      {/* Engagements Section */}
      <MainSection>
        <Container>
          <SectionTitle>{t('about.commitments.title')}</SectionTitle>
          <TextContent style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p><strong>{t('about.commitments.intro')}</strong></p>
            <p>{t('about.commitments.services')}</p>
          </TextContent>
          <ServicesGrid>
            {services.map((service, index) => (
              <ServiceCard key={index}>
                <ServiceIcon>{service.icon}</ServiceIcon>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
          <TextContent style={{ textAlign: 'center', marginTop: '3rem' }}>
            <p><strong>{t('about.commitments.quality')}</strong></p>
          </TextContent>
        </Container>
      </MainSection>

      {/* Promesse Section */}
      <MainSection>
        <Container>
          <SectionTitle>{t('about.promise.title')}</SectionTitle>
          <SectionGrid>
            <TextContent>
              <p>{t('about.promise.intro')}</p>
              <ListContainer>
                {promises.map((promise, index) => (
                  <ListItem key={index}>
                    <ListIcon>{promise.icon}</ListIcon>
                    <span>{promise.text}</span>
                  </ListItem>
                ))}
              </ListContainer>
              <p><strong>{t('about.promise.conclusion')}</strong></p>
            </TextContent>
            <MediaContainer>
              <IntegratedVideoContainer>
                <video
                  id="integrated-video"
                  controls={isSecondVideoPlaying}
                  poster="./previewVideo2.png"
                  onPlay={() => setIsSecondVideoPlaying(true)}
                >
                  <source src="/previewVideo2.mp4" type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                {!isSecondVideoPlaying && (
                  <PlayButton onClick={handleSecondVideoPlay} />
                )}
              </IntegratedVideoContainer>
            </MediaContainer>
          </SectionGrid>
        </Container>
      </MainSection>
    </AboutContainer>
  );
};

export default AboutSection;