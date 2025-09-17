import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaBuilding, FaHome, FaGlobeAmericas } from 'react-icons/fa';
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

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
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

const ProfileDetails = styled.div`
  position: relative;
  animation: ${slideInRight} 1s ease-out;
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

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.9;
  margin-bottom: 3rem;
  opacity: 0.95;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const ExpertiseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ExpertiseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(218, 165, 32, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(218, 165, 32, 0.6);
    box-shadow: 0 10px 30px rgba(218, 165, 32, 0.2);
  }
`;

const ExpertiseIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
  color: ${props => props.theme.colors.white};
`;

const ExpertiseText = styled.span`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  font-size: 1rem;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  backdrop-filter: blur(10px);

  .number {
    font-size: 2rem;
    font-weight: 700;
    color: ${props => props.theme.colors.gold};
    display: block;
  }

  .label {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
  }
`;

const AboutSection = () => {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const expertiseItems = [
    { icon: <FaGraduationCap />, text: 'Master ESG Immobilier' },
    { icon: <FaBuilding />, text: 'Cogedim - Promotion immobilière' },
    { icon: <FaHome />, text: 'Foncia - Gestion immobilière' },
    { icon: <FaGlobeAmericas />, text: 'Expert Antilles & Afrique' }
  ];

  const stats = [];

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    const video = document.getElementById('presentation-video');
    if (video) {
      video.play();
    }
  };

  return (
    <AboutContainer>
      <Container>
        <AboutContent>
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

          <ProfileDetails>
            <SectionTitle>{t('about.title')}</SectionTitle>
            <AboutText>{t('about.content')}</AboutText>

            <ExpertiseGrid>
              {expertiseItems.map((item, index) => (
                <ExpertiseItem key={index}>
                  <ExpertiseIcon>{item.icon}</ExpertiseIcon>
                  <ExpertiseText>{item.text}</ExpertiseText>
                </ExpertiseItem>
              ))}
            </ExpertiseGrid>

            <StatsContainer>
              {stats.map((stat, index) => (
                <StatItem key={index}>
                  <span className="number">{stat.number}</span>
                  <div className="label">{stat.label}</div>
                </StatItem>
              ))}
            </StatsContainer>
          </ProfileDetails>
        </AboutContent>
      </Container>
    </AboutContainer>
  );
};

export default AboutSection;