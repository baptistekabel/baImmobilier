import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaGlobeAfrica, FaUserGraduate, FaStar, FaHeart, FaShieldAlt } from 'react-icons/fa';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const WhyChooseContainer = styled.section`
  padding: 8rem 0;
  background:
    linear-gradient(135deg, rgba(12, 28, 69, 0.02) 0%, transparent 50%),
    linear-gradient(45deg, rgba(218, 165, 32, 0.03) 0%, transparent 50%),
    #ffffff;
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
      radial-gradient(circle at 25% 25%, rgba(12, 28, 69, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(218, 165, 32, 0.04) 0%, transparent 50%);
    animation: ${float} 30s ease-in-out infinite;
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

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  position: relative;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;

  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${props => props.theme.colors.gold};
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  color: #64748b;
  font-size: 1.1rem;
  max-width: 650px;
  margin: 2rem auto 0;
  line-height: 1.6;
  font-weight: 400;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  padding: 2rem;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(12, 28, 69, 0.06);
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(12, 28, 69, 0.05);
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 40px rgba(12, 28, 69, 0.12);
    border-color: rgba(218, 165, 32, 0.2);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.gold});
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${props => props.theme.colors.white};
  margin: 0 auto 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(12, 28, 69, 0.15);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1) rotate(3deg);
    box-shadow: 0 8px 25px rgba(218, 165, 32, 0.25);
  }
`;

const FeatureNumber = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 24px;
  height: 24px;
  background: ${props => props.theme.colors.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  box-shadow: 0 2px 8px rgba(218, 165, 32, 0.3);
  z-index: 3;
`;

const FeatureContent = styled.div`
  position: relative;
  z-index: 2;
`;

const FeatureTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.4;
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FeatureHighlight = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: rgba(218, 165, 32, 0.08);
  border-radius: 20px;
  color: ${props => props.theme.colors.gold};
  font-weight: 500;
  font-size: 0.85rem;
  border: 1px solid rgba(218, 165, 32, 0.15);
  margin: 0 auto;
  width: fit-content;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 1.5rem 1rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(12, 28, 69, 0.04);
  transition: all 0.3s ease;
  border: 1px solid rgba(12, 28, 69, 0.04);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(12, 28, 69, 0.08);
    border-color: rgba(218, 165, 32, 0.1);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #64748b;
  font-weight: 400;
  font-size: 0.9rem;
`;

const AnimatedNumber = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startValue = 0;
    const isPercentage = value.includes('%');
    const isPlus = value.includes('+');
    const numericValue = parseInt(value.replace(/[%+]/g, ''));

    const startTime = Date.now();

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * numericValue);

      if (isPercentage) {
        setDisplayValue(`${currentValue}%`);
      } else if (isPlus) {
        setDisplayValue(`${currentValue}+`);
      } else {
        setDisplayValue(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    updateValue();
  }, [isInView, value, duration]);

  return (
    <StatNumber
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2,
        type: "spring",
        stiffness: 200
      }}
    >
      {displayValue}
    </StatNumber>
  );
};

const WhyChooseUsSection = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <FaCheckCircle />,
      titleKey: 'why.transparency.title',
      descKey: 'why.transparency.desc',
      highlight: '100% Transparent'
    },
    {
      icon: <FaGlobeAfrica />,
      titleKey: 'why.diaspora.title',
      descKey: 'why.diaspora.desc',
      highlight: '2 Continents'
    },
    {
      icon: <FaUserGraduate />,
      titleKey: 'why.expertise.title',
      descKey: 'why.expertise.desc',
      highlight: 'Expert Certifié'
    }
  ];

  const stats = [
    { number: '98%', label: 'Clients Satisfaits' },
    { number: '5+', label: 'Années d\'Expérience' },
    { number: '50+', label: 'Projets Réussis' }
  ];

  // Animations variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
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
        damping: 30,
        duration: 0.8
      }
    }
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -15,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const statCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <WhyChooseContainer ref={sectionRef}>
      <Container>
        <SectionHeader
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionTitle>{t('why.title')}</SectionTitle>
          <SectionSubtitle>
            Découvrez pourquoi BA Immobilier est le partenaire de confiance
            pour vos projets immobiliers entre l'Afrique et les Antilles.
          </SectionSubtitle>
        </SectionHeader>

        <FeaturesGrid
          variants={gridVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} variants={cardVariants}>
              <FeatureHeader>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureNumber>{(index + 1).toString().padStart(2, '0')}</FeatureNumber>
              </FeatureHeader>

              <FeatureContent>
                <FeatureTitle>{t(feature.titleKey)}</FeatureTitle>
                <FeatureDescription>{t(feature.descKey)}</FeatureDescription>
                <FeatureHighlight>
                  <FaStar />
                  {feature.highlight}
                </FeatureHighlight>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        <StatsContainer
          variants={statsVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatCard key={index} variants={statCardVariants}>
              <AnimatedNumber value={stat.number} duration={2000 + index * 200} />
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsContainer>
      </Container>
    </WhyChooseContainer>
  );
};

export default WhyChooseUsSection;