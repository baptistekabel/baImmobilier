import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';
import logo from '../assets/images/logoBaImmobilier.jpeg';
import { siteConfig } from '../config/emailjs';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 3rem 0 1rem;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h4`
  color: ${props => props.theme.colors.gold};
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.title};
`;

const FooterText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const FooterSlogan = styled.p`
  font-family: ${props => props.theme.fonts.accent};
  font-style: italic;
  color: ${props => props.theme.colors.gold};
  font-size: 1.1rem;
  margin-top: 1rem;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.gold};
    opacity: 1;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    transform: translateX(5px);
    color: ${props => props.theme.colors.gold};
  }

  span {
    font-size: 0.9rem;
  }
`;

const ContactIcon = styled.div`
  color: ${props => props.theme.colors.gold};
  font-size: 1.2rem;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-size: 1.3rem;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
    transform: translateY(-5px) rotate(10deg) scale(1.1);
    box-shadow: 0 10px 25px rgba(218, 165, 32, 0.3);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 10px;
  margin-right: 15px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
`;

const LogoText = styled.span`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  text-transform: uppercase;
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterContainer id="contact">
      <Container>
        <FooterContent>
          <FooterSection>
            <Logo>
              <LogoImage src={logo} alt="BA Immobilier" />
              <LogoText>BA Immobilier</LogoText>
            </Logo>
            <FooterText>
              Votre partenaire immobilier de confiance entre l'Afrique et les Antilles.
              Nous accompagnons la diaspora dans tous ses projets immobiliers avec transparence et expertise.
            </FooterText>
            <FooterSlogan>{t('footer.slogan')}</FooterSlogan>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.links')}</FooterTitle>
            <FooterLink to="/">{t('nav.home')}</FooterLink>
            <FooterLink to="/services">{t('nav.services')}</FooterLink>
            <FooterLink to="/about">{t('nav.about')}</FooterLink>
            <FooterLink to="/properties">{t('nav.properties')}</FooterLink>
            <FooterLink to="/contact">{t('nav.contact')}</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.contact.title')}</FooterTitle>
            <ContactInfo>
              <ContactIcon><FaPhone /></ContactIcon>
              <span>{siteConfig.contactPhone.replace('+33', '0').replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}</span>
            </ContactInfo>
            <ContactInfo>
              <ContactIcon><FaEnvelope /></ContactIcon>
              <span>{siteConfig.contactEmail}</span>
            </ContactInfo>
          </FooterSection>

          <FooterSection>
            <FooterTitle>{t('footer.social')}</FooterTitle>
            <SocialLinks>
              <SocialLink href="https://www.instagram.com/idrissba_realestate?igsh=MWlxeTg0Y3Ywbnp0dQ==" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <p>&copy; 2024 BA Immobilier. Tous droits réservés.</p>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;