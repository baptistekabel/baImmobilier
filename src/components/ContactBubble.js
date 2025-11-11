import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhone, FaEnvelope, FaTimes } from 'react-icons/fa';
import idrissPhoto from '../assets/images/idriss.jpeg';
import { siteConfig } from '../config/emailjs';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(218, 165, 32, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(218, 165, 32, 0);
  }
`;

const slideIn = keyframes`
  0% {
    transform: translateX(100px) scale(0.8);
    opacity: 0;
  }
  100% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
`;

const BubbleContainer = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  pointer-events: none;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 20px;
    right: 20px;
  }
`;

const ContactButton = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, ${props => props.theme.colors.primary});
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(218, 165, 32, 0.4);
  position: relative;
  animation: ${pulse} 2s infinite;
  pointer-events: all;

  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    border-radius: 50%;
    background: url(${idrissPhoto}) center/cover;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 5px;
    right: 8px;
    width: 12px;
    height: 12px;
    background: #10b981;
    border: 2px solid white;
    border-radius: 50%;
    z-index: 10;
  }

  &:hover {
    animation: ${bounce} 1s ease-in-out;
  }
`;

const BubbleCard = styled(motion.div)`
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow:
    0 20px 40px rgba(12, 28, 69, 0.15),
    0 8px 20px rgba(218, 165, 32, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideIn} 0.5s ease-out;
  pointer-events: all;

  &::before {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.95);
    transform: rotate(45deg);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 250px;
    bottom: 65px;
    right: -10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(218, 165, 32, 0.1);
    color: ${props => props.theme.colors.gold};
  }
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProfileImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${idrissPhoto}) center/cover;
  border: 2px solid ${props => props.theme.colors.gold};
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.2rem 0;
`;

const ProfileTitle = styled.p`
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
`;

const BubbleText = styled.p`
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;

const ContactActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.6rem;
  border: none;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &.primary {
    background: ${props => props.theme.colors.gold};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.primary};
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: rgba(218, 165, 32, 0.1);
    color: ${props => props.theme.colors.gold};

    &:hover {
      background: rgba(218, 165, 32, 0.2);
      transform: translateY(-1px);
    }
  }
`;

const ContactBubble = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Affiche la bulle immédiatement sur toutes les pages
    setIsVisible(true);
  }, []);

  const handleCall = () => {
    window.location.href = `tel:${siteConfig.contactPhone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${siteConfig.contactEmail}`;
  };

  if (!isVisible) return null;

  return (
    <BubbleContainer>
      <AnimatePresence>
        {isExpanded && (
          <BubbleCard
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <CloseButton onClick={() => setIsExpanded(false)}>
              <FaTimes size={12} />
            </CloseButton>

            <ProfileSection>
              <ProfileImage />
              <ProfileInfo>
                <ProfileName>Idriss Ba</ProfileName>
                <ProfileTitle>Expert Immobilier</ProfileTitle>
              </ProfileInfo>
            </ProfileSection>

            <BubbleText>
              Besoin d'informations ? Je suis là pour vous accompagner dans vos projets immobiliers entre l'Afrique et les Antilles.
            </BubbleText>

            <ContactActions>
              <ActionButton className="primary" onClick={handleCall}>
                <FaPhone size={12} />
                Appeler
              </ActionButton>
              <ActionButton className="secondary" onClick={handleEmail}>
                <FaEnvelope size={12} />
                Email
              </ActionButton>
            </ContactActions>
          </BubbleCard>
        )}
      </AnimatePresence>

      <ContactButton
        onClick={() => setIsExpanded(!isExpanded)}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      />
    </BubbleContainer>
  );
};

export default ContactBubble;