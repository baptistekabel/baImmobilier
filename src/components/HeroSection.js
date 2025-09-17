import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const floating = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-15px);
  }
  60% {
    transform: translateX(-50%) translateY(-8px);
  }
`;

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const pulseBorder = keyframes`
  0%, 100% {
    border-color: rgba(218, 165, 32, 0.3);
    transform: scale(1);
  }
  50% {
    border-color: rgba(218, 165, 32, 0.8);
    transform: scale(1.05);
  }
`;

const HeroContainer = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary} 0%,
    #1a2b5e 25%,
    rgba(12, 28, 69, 0.9) 50%,
    #1a2b5e 75%,
    ${props => props.theme.colors.primary} 100%
  );
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(ellipse at 20% 50%, rgba(218, 165, 32, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(218, 165, 32, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 80%, rgba(60, 179, 113, 0.1) 0%, transparent 50%);
    animation: ${floating} 20s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 28, 69, 0.3) 0%,
      rgba(12, 28, 69, 0.1) 50%,
      rgba(12, 28, 69, 0.3) 100%
    );
    z-index: 2;
  }
`;

const BuildingsBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const SimpleImage = styled.img`
  position: absolute;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  opacity: 0.85;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  &:nth-child(1) {
    top: 8%;
    left: 5%;
    width: 280px;
    height: 350px;
    transform: rotate(-8deg);
  }

  &:nth-child(2) {
    top: 3%;
    right: 8%;
    width: 300px;
    height: 380px;
    transform: rotate(5deg);
  }

  &:nth-child(3) {
    bottom: 20%;
    left: 8%;
    width: 260px;
    height: 320px;
    transform: rotate(-4deg);
  }

  &:nth-child(4) {
    bottom: 3%;
    right: 3%;
    width: 320px;
    height: 400px;
    transform: rotate(7deg);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    opacity: 0.4;

    &:nth-child(1) {
      width: 120px;
      height: 150px;
      top: 3%;
      left: 1%;
      transform: rotate(-8deg);
    }

    &:nth-child(2) {
      width: 130px;
      height: 160px;
      top: 8%;
      right: 1%;
      transform: rotate(5deg);
    }

    &:nth-child(3) {
      width: 110px;
      height: 140px;
      bottom: 28%;
      left: 2%;
      transform: rotate(-5deg);
    }

    &:nth-child(4) {
      width: 100px;
      height: 125px;
      bottom: 12%;
      right: 3%;
      transform: rotate(7deg);
    }
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 3;

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: ${props => props.theme.colors.gold};
    border-radius: 50%;
    animation: ${floating} 6s ease-in-out infinite;
    opacity: 0.6;

    &:nth-child(2n) {
      animation-delay: -2s;
      background: rgba(218, 165, 32, 0.8);
    }

    &:nth-child(3n) {
      animation-delay: -4s;
      background: rgba(60, 179, 113, 0.6);
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  padding: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const HeroLogo = styled(motion.img)`
  width: clamp(120px, 15vw, 200px);
  height: auto;
  margin-bottom: 2rem;
  border-radius: 15px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(218, 165, 32, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 10;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: clamp(80px, 20vw, 150px);
    margin-bottom: 1.5rem;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.accent};
  font-style: italic;
  font-weight: 800;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 100%;
  padding: 0 1rem;

  /* Gestion intelligente du texte - éviter la coupure des mots */
  word-break: keep-all;
  overflow-wrap: normal;
  hyphens: none;
  white-space: normal;
  line-height: 1.3;

  /* Couleur solide bien visible */
  color: #FFFFFF;

  /* Text shadow optimisé pour les performances */
  text-shadow:
    0 0 20px rgba(218, 165, 32, 0.8),
    0 4px 8px rgba(0, 0, 0, 0.6);

  /* Bordure dorée pour plus de visibilité */
  -webkit-text-stroke: 1px rgba(218, 165, 32, 0.3);

  /* Position relative pour les effets */
  position: relative;
  z-index: 10;

  /* Tailles responsives adaptées pour éviter la coupure */
  font-size: clamp(1.8rem, 4vw, 4rem);

  @media (min-width: 1400px) {
    font-size: clamp(3.5rem, 3.5vw, 4.5rem);
    padding: 0 3rem;
  }

  @media (min-width: 1200px) and (max-width: 1399px) {
    font-size: clamp(3rem, 3.8vw, 4rem);
    padding: 0 2rem;
  }

  @media (max-width: 1199px) {
    font-size: clamp(2.2rem, 4vw, 3.2rem);
  }

  @media (max-width: 768px) {
    font-size: clamp(1.8rem, 4.5vw, 2.8rem);
    line-height: 1.4;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.5rem, 5vw, 2.2rem);
    -webkit-text-stroke: 0.5px rgba(218, 165, 32, 0.3);
    padding: 0 0.5rem;
    line-height: 1.5;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${props => props.theme.fonts.body};
  color: #FFFFFF;
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 1;
  line-height: 1.8;
  font-weight: 500;
  text-shadow:
    0 0 10px rgba(218, 165, 32, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
  max-width: 100%;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 1.3rem;
    line-height: 1.7;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 2.5rem;
    line-height: 1.6;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const CTAButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 1.2rem 2.5rem;
  font-family: ${props => props.theme.fonts.title};
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  min-width: 200px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

  &:hover::before {
    left: 100%;
  }

  &.primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
    color: ${props => props.theme.colors.white};
    box-shadow:
      0 8px 30px rgba(218, 165, 32, 0.4),
      0 0 0 0 rgba(218, 165, 32, 0.5);

    &:hover {
      background: linear-gradient(135deg, #FFD700, ${props => props.theme.colors.gold});
      transform: translateY(-8px) scale(1.05);
      box-shadow:
        0 15px 40px rgba(218, 165, 32, 0.6),
        0 0 20px rgba(218, 165, 32, 0.4);
    }

    &:active {
      transform: translateY(-4px) scale(1.02);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.white};
    border: 2px solid rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);

    &:hover {
      background: ${props => props.theme.colors.white};
      color: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.white};
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 15px 40px rgba(255, 255, 255, 0.3);
    }

    &:active {
      transform: translateY(-4px) scale(1.02);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 350px;
    padding: 1rem 2rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.colors.white};
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    opacity: 1;
    transform: translateX(-50%) scale(1.1);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 2rem;
  }
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 500;
  letter-spacing: 1px;
`;

const ScrollArrow = styled.div`
  width: 3px;
  height: 40px;
  background: linear-gradient(to bottom, ${props => props.theme.colors.gold}, transparent);
  position: relative;
  border-radius: 2px;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 10px solid ${props => props.theme.colors.gold};
  }
`;

const HeroSection = () => {
  const { t } = useTranslation();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 12; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      });
    }
    setParticles(particleArray);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants pour les titres
  const titleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: -100,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1.2,
        ease: "easeOut"
      }
    }
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.8
    },
    visible: {
      opacity: 0.95,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 25,
        delay: 0.3,
        duration: 1
      }
    }
  };

  const subtitleLetterVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        delay: i * 0.008,
        duration: 0.25
      }
    })
  };

  const subtitleContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0.8,
        when: "beforeChildren"
      }
    }
  };

  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const ctaVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6,
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.9
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        delay: i * 0.015,
        duration: 0.3
      }
    })
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      scale: 0.3,
      y: -50,
      rotateY: -180
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 1
      }
    }
  };

  const titleContainerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.8,
        when: "beforeChildren"
      }
    }
  };

  const glowVariants = {
    animate: {
      textShadow: [
        "0 0 20px rgba(218, 165, 32, 0.5)",
        "0 0 40px rgba(218, 165, 32, 0.8)",
        "0 0 60px rgba(218, 165, 32, 1)",
        "0 0 40px rgba(218, 165, 32, 0.8)",
        "0 0 20px rgba(218, 165, 32, 0.5)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Fonction pour diviser le texte en lettres - optimisée avec support multiligne
  const AnimatedText = React.memo(({ text, variants, className = "" }) => {
    // Ajouter des sauts de ligne dans le sous-titre pour une meilleure présentation
    // et ajouter un point à la fin si ce n'est pas déjà présent
    let formattedText = text;

    // Ajouter un point à la fin si nécessaire
    if (!formattedText.endsWith('.')) {
      formattedText += '.';
    }

    // Ajouter les sauts de ligne de manière plus intelligente
    formattedText = formattedText
      .replace(/(de confiance)/i, 'de confiance\n')
      .replace(/(entre l)/i, 'entre l');

    return formattedText.split('').map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        custom={index}
        variants={variants}
        whileHover={char !== '\n' ? {
          scale: 1.05,
          y: -1,
          transition: {
            duration: 0.15,
            ease: "easeOut"
          }
        } : {}}
        style={{
          display: char === '\n' ? 'block' : 'inline-block',
          transformOrigin: 'center',
          willChange: 'transform',
          width: char === '\n' ? '100%' : 'auto',
          height: char === '\n' ? '0' : 'auto'
        }}
        className={className}
      >
        {char === ' ' ? '\u00A0' : char === '\n' ? '' : char}
      </motion.span>
    ));
  });

  // Fonction pour créer un texte simple et visible - optimisée
  const SimpleText = React.memo(({ text, variants }) => {
    // Ajouter un saut de ligne avant "construire" et un point à la fin
    let formattedText = text.replace(/(\s+)construire/i, '\nconstruire');

    // Ajouter un point à la fin si nécessaire
    if (!formattedText.endsWith('.')) {
      formattedText += '.';
    }

    return formattedText.split('').map((char, index) => (
      <motion.span
        key={`${char}-${index}`}
        custom={index}
        variants={variants}
        style={{
          display: char === '\n' ? 'block' : 'inline-block',
          color: '#FFFFFF',
          fontWeight: 'inherit',
          willChange: 'transform',
          width: char === '\n' ? '100%' : 'auto',
          height: char === '\n' ? '0' : 'auto'
        }}
        whileHover={char !== '\n' ? {
          scale: 1.05,
          y: -2,
          color: '#FFD700',
          transition: {
            duration: 0.15,
            ease: "easeOut"
          }
        } : {}}
      >
        {char === ' ' ? '\u00A0' : char === '\n' ? '' : char}
      </motion.span>
    ));
  });

  // Animation variants pour les images
  const buildingVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (custom) => ({
      opacity: custom.opacity,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: custom.delay
      }
    })
  };

  const buildingFloat = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <HeroContainer>
      <BuildingsBackground>
        <SimpleImage src="/immobilier1.jpeg" alt="Immeuble moderne" />
        <SimpleImage src="/immobilier2.jpg" alt="Résidence de luxe" />
        <SimpleImage src="/immobilier3.jpg" alt="Complexe résidentiel" />
        <SimpleImage src="/immobilier4.jpg" alt="Projet immobilier moderne" />
      </BuildingsBackground>

      <ParticlesContainer>
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </ParticlesContainer>

      <HeroContent>
        <HeroLogo
          src="/logoBaImmobilier.jpeg"
          alt="BA Immobilier Logo"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.1,
            rotateY: [0, 10, -10, 0],
            transition: {
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        />
        <HeroTitle
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <SimpleText text={t('hero.title')} variants={letterVariants} />
        </HeroTitle>
        <HeroSubtitle
          variants={subtitleContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatedText text={t('hero.subtitle')} variants={subtitleLetterVariants} />
        </HeroSubtitle>
        <CTAContainer
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CTAButton className="primary" onClick={scrollToServices}>
              {t('hero.cta.discover')}
            </CTAButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <CTAButton className="secondary" onClick={scrollToContact}>
              {t('hero.cta.contact')}
            </CTAButton>
          </motion.div>
        </CTAContainer>
      </HeroContent>

    </HeroContainer>
  );
};

export default HeroSection;