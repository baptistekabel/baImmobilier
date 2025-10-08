import React, { useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaKey, FaBuilding, FaTools, FaHardHat, FaArrowRight, FaMapMarkedAlt, FaSearch, FaDraftingCompass } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import immobilier1 from '../assets/images/immobilier1.jpeg';
import immobilier2 from '../assets/images/immobilier2.jpg';
import immobilier3 from '../assets/images/immobilier3.jpg';
import immobilier4 from '../assets/images/immobilier4.jpg';
import conseilImage from '../assets/images/conseil.jpeg';
import chasseurBien from '../assets/images/chasseurBien.png';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(-20px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ServicesContainer = styled(motion.section)`
  padding: 8rem 0;
  background:
    linear-gradient(135deg, rgba(12, 28, 69, 0.02) 0%, transparent 50%),
    linear-gradient(225deg, rgba(218, 165, 32, 0.03) 0%, transparent 50%),
    radial-gradient(ellipse at center, #ffffff 0%, #f8fafb 100%);
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
    animation: ${float} 40s ease-in-out infinite;
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 45deg, transparent, rgba(218, 165, 32, 0.02), transparent);
    animation: ${float} 60s linear infinite reverse;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 5rem 0;
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

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 3rem;
  position: relative;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.1;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.gold}, #667eea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ${shimmer} 5s ease-in-out infinite;
  letter-spacing: -0.02em;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, ${props => props.theme.colors.primary});
    border-radius: 2px;
    opacity: 0.6;
  }

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

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 5rem;
  perspective: 1000px;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
  }
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(12, 28, 69, 0.08);
  transition: all 0.4s ease;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(218, 165, 32, 0.1),
      transparent
    );
    transition: left 0.6s ease;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(12, 28, 69, 0.12);
    border-color: rgba(218, 165, 32, 0.3);

    &::before {
      left: 100%;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const ServiceImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.image ? `url(${props.image}) center/cover` : props.theme.colors.lightGray};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(12, 28, 69, 0.7) 0%, rgba(218, 165, 32, 0.3) 100%);
  }
`;

const ServiceContent = styled.div`
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem 1.5rem;
  }
`;

const ServiceIcon = styled(motion.div)`
  width: 70px;
  height: 70px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg,
    ${props => props.theme.colors.primary},
    ${props => props.theme.colors.gold}
  );
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  color: ${props => props.theme.colors.white};
  box-shadow: 0 4px 20px rgba(12, 28, 69, 0.15);
  transition: all 0.3s ease;
  position: absolute;
  bottom: 10px;
  right: 20px;
  z-index: 3;
  animation: ${breathe} 4s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    background: linear-gradient(135deg,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    border-radius: 13px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 30px rgba(218, 165, 32, 0.3);

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
    font-size: 1.6rem;
    bottom: 8px;
    right: 15px;
  }
`;

const ServiceTitle = styled(motion.h3)`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.4;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.2rem;
  }
`;

const ServiceDescription = styled(motion.p)`
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const ServiceButton = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.white};
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.primary};
    transition: left 0.3s ease;
  }

  &:hover {
    transform: translateX(4px);

    &::before {
      left: 0;
    }

    svg {
      transform: translateX(2px);
    }
  }

  span, svg {
    position: relative;
    z-index: 1;
  }

  svg {
    transition: transform 0.3s ease;
    font-size: 0.8rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;

const ServicesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const services = [
    {
      icon: <FaHome />,
      titleKey: 'services.location.title',
      descKey: 'services.location.desc',
      slug: 'location',
      image: immobilier1
    },
    {
      icon: <FaKey />,
      titleKey: 'services.buyAndSell.title',
      descKey: 'services.buyAndSell.desc',
      slug: 'achat',
      image: immobilier2
    },
    {
      icon: <FaTools />,
      titleKey: 'services.renovationAndConstruction.title',
      descKey: 'services.renovationAndConstruction.desc',
      slug: 'renovation',
      image: immobilier4
    },
    {
      icon: <FaMapMarkedAlt />,
      titleKey: 'services.consulting.title',
      descKey: 'services.consulting.desc',
      slug: 'conseil',
      image: conseilImage
    },
    {
      icon: <FaSearch />,
      titleKey: 'services.propertyHunting.title',
      descKey: 'services.propertyHunting.desc',
      slug: 'chasseur-de-biens',
      image: chasseurBien
    },
    {
      icon: <FaDraftingCompass />,
      titleKey: 'services.projectOnPlan.title',
      descKey: 'services.projectOnPlan.desc',
      slug: 'projet-sur-plan',
      image: immobilier3
    }
  ];

  // Animation variants
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const iconVariants = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: 5,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    rest: { x: 0 },
    hover: {
      x: 4,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <ServicesContainer ref={sectionRef} id="services">
      <Container>
        <SectionTitle
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {t('services.title')}
        </SectionTitle>
        <ServicesGrid
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
            >
              <ServiceImageContainer image={service.image}>
                <ServiceIcon
                  variants={iconVariants}
                >
                  {service.icon}
                </ServiceIcon>
              </ServiceImageContainer>
              <ServiceContent>
                <ServiceTitle>{t(service.titleKey)}</ServiceTitle>
                <ServiceDescription>{t(service.descKey)}</ServiceDescription>
                <ServiceButton
                  variants={buttonVariants}
                  onClick={() => navigate(`/services/${service.slug}`)}
                >
                  <span>En savoir plus</span>
                  <FaArrowRight />
                </ServiceButton>
              </ServiceContent>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesContainer>
  );
};

export default ServicesSection;