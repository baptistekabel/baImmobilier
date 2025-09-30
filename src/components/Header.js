import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logoBaImmobilier.jpeg';
import LanguageDropdown from './LanguageDropdown';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  box-shadow: ${props => props.theme.shadows.light};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.gold};
    transform: scale(1.02);
  }
`;

const LogoImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  margin-right: 15px;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(12, 28, 69, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 25px rgba(218, 165, 32, 0.3);
    transform: rotate(5deg) scale(1.05);
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const Navigation = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen'
})`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    box-shadow: ${props => props.theme.shadows.medium};
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.gold};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${props => props.theme.colors.gold};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;


const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MenuIcon = styled.div`
  width: 25px;
  height: 3px;
  background-color: ${props => props.theme.colors.primary};
  margin: 5px 0;
  transition: 0.3s;
  transform-origin: center;
  border-radius: 2px;

  &:nth-child(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
  }

  &:nth-child(2) {
    opacity: ${props => props.isOpen ? '0' : '1'};
  }

  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)'};
  }
`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          <LogoImage src={logo} alt="BA Immobilier" />
          BA Immobilier
        </Logo>

        <Navigation isOpen={isMenuOpen}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/services" onClick={() => setIsMenuOpen(false)}>
            {t('nav.services')}
          </NavLink>
          <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/properties" onClick={() => setIsMenuOpen(false)}>
            {t('nav.properties')}
          </NavLink>
          <NavLink to="/vendre" onClick={() => setIsMenuOpen(false)}>
            {t('nav.sell')}
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </NavLink>

          <LanguageDropdown />
        </Navigation>

        <MobileMenuButton onClick={toggleMenu}>
          <MenuIcon isOpen={isMenuOpen} />
          <MenuIcon isOpen={isMenuOpen} />
          <MenuIcon isOpen={isMenuOpen} />
        </MobileMenuButton>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;