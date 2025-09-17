import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 25px;
  padding: 0.5rem 1rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover {
    background: ${props => props.theme.colors.primary};
    color: white;
  }

  .flag {
    font-size: 1.2rem;
  }

  .chevron {
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: translateY(${props => props.isOpen ? '8px' : '0px'});
  transition: all 0.3s ease;
  overflow: hidden;
`;

const LanguageOption = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: ${props => props.theme.colors.text.dark};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.lightGray};
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f8f9fa;
  }

  .flag {
    font-size: 1.2rem;
  }
`;

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  const otherLanguages = languages.filter(lang => lang.code !== currentLanguage.code);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown} isOpen={isOpen}>
        <span className="flag">{currentLanguage.flag}</span>
        <span>{currentLanguage.code.toUpperCase()}</span>
        <FaChevronDown className="chevron" size={12} />
      </DropdownButton>

      <DropdownMenu isOpen={isOpen}>
        {otherLanguages.map((language) => (
          <LanguageOption
            key={language.code}
            onClick={() => changeLanguage(language.code)}
          >
            <span className="flag">{language.flag}</span>
            <span>{language.name}</span>
          </LanguageOption>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default LanguageDropdown;