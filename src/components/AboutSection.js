import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  FaGraduationCap,
  FaBuilding,
  FaHome,
  FaGlobeAmericas,
  FaHeart,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaMapMarkedAlt,
  FaHandshake,
  FaLightbulb,
  FaFlag,
  FaUniversity,
  FaBriefcase,
  FaStar,
  FaRocket,
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
  padding: 5rem 0;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary} 0%, rgba(12, 28, 69, 0.95) 100%);
  color: ${props => props.theme.colors.white};
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

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 10% 30%, rgba(218, 165, 32, 0.05) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 70%, rgba(60, 179, 113, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 0;
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

const MainContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 2fr;
    align-items: start;
  }
`;

const SidebarContent = styled.div`
  position: sticky;
  top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    position: relative;
    top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const MainContent = styled.div`
  /* Contenu principal */
`;

const ProfileSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideInLeft} 1s ease-out;
`;

const ProfileImage = styled.div`
  width: 320px;
  height: 320px;
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 250px;
    height: 250px;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
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

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.gold};
  margin-bottom: 2rem;
  position: relative;
  font-size: 3rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.gold}, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, transparent);
    border-radius: 2px;

    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.2rem;
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
    { icon: <FaRocket />, text: t('about.promise.vision') }
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
      <Container>
        <MainContentGrid>
          <SidebarContent>
            <ProfileSection>
              <ProfileImageContainer>
                <ProfileImage>
                  <img src={idrissPhoto} alt="Idriss Ba" />
                </ProfileImage>
              </ProfileImageContainer>

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
            </ProfileSection>
          </SidebarContent>

          <MainContent>
            {/* Mon histoire */}
            <ContentSection>
              <ContentTitle>
                <FaHeart /> {t('about.story.title')}
              </ContentTitle>
              <ContentText>
                {t('about.story.intro')}
              </ContentText>
              <ContentText>
                <HighlightText>{t('about.story.identity')}</HighlightText>
              </ContentText>
              <ContentText>
                {t('about.story.mission')}
              </ContentText>
            </ContentSection>

            {/* Pourquoi le Sénégal */}
            <ContentSection>
              <ContentTitle>
                <FaFlag /> {t('about.senegal.title')}
              </ContentTitle>
              <ContentText>
                <HighlightText>{t('about.senegal.intro')}</HighlightText>
              </ContentText>
              <ListContainer>
                {senegalAdvantages.map((item, index) => (
                  <ListItem key={index}>
                    <ListIcon>{item.icon}</ListIcon>
                    <span>{item.text}</span>
                  </ListItem>
                ))}
              </ListContainer>
              <ContentText>
                <HighlightText>{t('about.senegal.conclusion')}</HighlightText>
              </ContentText>
            </ContentSection>

            {/* Mon parcours */}
            <ContentSection>
              <ContentTitle>
                <FaGraduationCap /> {t('about.journey.title')}
              </ContentTitle>
              <ContentText>
                <HighlightText>{t('about.journey.education')}</HighlightText>
              </ContentText>
              <ContentText>
                {t('about.journey.experience')}
              </ContentText>

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

              <ContentText>
                <HighlightText>{t('about.journey.conclusion')}</HighlightText>
              </ContentText>
            </ContentSection>

            {/* Vidéo de présentation intégrée */}
            <IntegratedVideoSection>
              <IntegratedVideoTitle>{t('about.video.title')}</IntegratedVideoTitle>
              <IntegratedVideoDescription>
                {t('about.video.description')}
              </IntegratedVideoDescription>
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
            </IntegratedVideoSection>

            {/* Notre mission */}
            <ContentSection>
              <ContentTitle>
                <FaRocket /> {t('about.mission.title')}
              </ContentTitle>
              <ContentText>
                {t('about.mission.intro')}
              </ContentText>
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
            </ContentSection>

            {/* Nos engagements */}
            <ContentSection>
              <ContentTitle>
                <FaHandshake /> {t('about.commitments.title')}
              </ContentTitle>
              <ContentText>
                <HighlightText>{t('about.commitments.intro')}</HighlightText>
              </ContentText>
              <ContentText>
                {t('about.commitments.services')}
              </ContentText>

              <ServicesGrid>
                {services.map((service, index) => (
                  <ServiceCard key={index}>
                    <ServiceIcon>{service.icon}</ServiceIcon>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                  </ServiceCard>
                ))}
              </ServicesGrid>

              <ContentText>
                <HighlightText>{t('about.commitments.quality')}</HighlightText>
              </ContentText>
            </ContentSection>

            {/* Ma promesse */}
            <ContentSection>
              <ContentTitle>
                <FaLightbulb /> {t('about.promise.title')}
              </ContentTitle>
              <ContentText>
                {t('about.promise.intro')}
              </ContentText>
              <ListContainer>
                {promises.map((promise, index) => (
                  <ListItem key={index}>
                    <ListIcon>{promise.icon}</ListIcon>
                    <span>{promise.text}</span>
                  </ListItem>
                ))}
              </ListContainer>
              <ContentText>
                <HighlightText>{t('about.promise.conclusion')}</HighlightText>
              </ContentText>
            </ContentSection>
          </MainContent>
        </MainContentGrid>
      </Container>

    </AboutContainer>
  );
};

export default AboutSection;