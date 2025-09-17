import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const NewsletterContainer = styled.section`
  padding: 4rem 0;
  background-color: ${props => props.theme.colors.lightGray};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 0;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const NewsletterTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const NewsletterSubtitle = styled.p`
  color: ${props => props.theme.colors.text.light};
  font-size: 1.1rem;
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.gold};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.title};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background-color: #B8860B;
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 1rem;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.emerald};
  color: ${props => props.theme.colors.white};
  border-radius: 8px;
  font-weight: 500;
`;

const NewsletterSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simuler l'envoi (à remplacer par une vraie intégration)
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setEmail('');

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <NewsletterContainer>
      <Container>
        <NewsletterTitle>{t('newsletter.title')}</NewsletterTitle>
        <NewsletterSubtitle>{t('newsletter.subtitle')}</NewsletterSubtitle>

        <NewsletterForm onSubmit={handleSubmit}>
          <EmailInput
            type="email"
            placeholder={t('newsletter.placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? '...' : t('newsletter.button')}
          </SubmitButton>
        </NewsletterForm>

        {showSuccess && (
          <SuccessMessage>
            Merci ! Vous êtes maintenant inscrit à notre newsletter.
          </SuccessMessage>
        )}
      </Container>
    </NewsletterContainer>
  );
};

export default NewsletterSection;