import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { getSeoConfig } from '../utils/seoConfig';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaWhatsapp, FaSkype } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { emailJSConfig } from '../config/emailjs';

const ContactContainer = styled.section`
  padding: 8rem 0 4rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9ff 0%, ${props => props.theme.colors.lightGray} 100%);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const ContactTitle = styled.h1`
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 800;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, ${props => props.theme.colors.emerald});
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

const ContactSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text.light};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0 1rem;
  }
`;

const ContactForm = styled.form`
  background: ${props => props.theme.colors.white};
  padding: 3rem;
  border-radius: 20px;
  box-shadow: ${props => props.theme.shadows.heavy};
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 700px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, ${props => props.theme.colors.gold}, ${props => props.theme.colors.emerald});
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 2rem;
    max-width: 100%;
  }
`;

const FormTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  transition: all 0.3s ease;
  background: #fafbfc;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    background: ${props => props.theme.colors.white};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }

  &::placeholder {
    color: #a0a6b1;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  background: #fafbfc;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    background: ${props => props.theme.colors.white};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }

  &::placeholder {
    color: #a0a6b1;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  font-family: ${props => props.theme.fonts.body};
  transition: all 0.3s ease;
  background: #fafbfc;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.gold};
    background: ${props => props.theme.colors.white};
    box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: ${props => props.theme.fonts.title};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #0C1C45);
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactCard = styled.div`
  background: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: 15px;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  border-left: 4px solid ${props => props.color || props.theme.colors.gold};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.gold}, ${props => props.color2 || '#FFD700'});
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: 1.3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.text.light};
  line-height: 1.6;
  margin: 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ActionCard = styled.a`
  background: ${props => props.theme.colors.white};
  padding: 2rem;
  border-radius: 15px;
  text-decoration: none;
  color: inherit;
  box-shadow: ${props => props.theme.shadows.medium};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.heavy};
    border-color: ${props => props.color || props.theme.colors.gold};
  }
`;

const ActionIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${props => props.color || props.theme.colors.gold}, ${props => props.color2 || '#FFD700'});
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  font-size: 1.5rem;
`;

const ActionContent = styled.div`
  flex: 1;
`;

const ActionTitle = styled.h5`
  color: ${props => props.theme.colors.primary};
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
`;

const ActionText = styled.p`
  color: ${props => props.theme.colors.text.light};
  margin: 0;
  font-size: 0.9rem;
`;

const ContactPage = () => {
  const location = useLocation();
  const seoConfig = getSeoConfig('contact');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const propertyId = searchParams.get('property');
    const prefilledMessage = searchParams.get('message');

    if (propertyId && prefilledMessage) {
      setFormData(prev => ({
        ...prev,
        subject: `Demande d'information - Propriété ${propertyId}`,
        service: 'Achat',
        message: decodeURIComponent(prefilledMessage)
      }));
    }
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer les données pour EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        to_email: 'idrissba@outlook.com',
        subject: formData.subject || `Nouvelle demande de contact - ${formData.service || 'Général'}`,
        message: formData.message,
        phone: formData.phone || 'Non renseigné',
        service: formData.service || 'Non spécifié',
        // Ajout de la date
        date: new Date().toLocaleDateString('fr-FR')
      };

      // Envoyer l'email via EmailJS
      const result = await emailjs.send(
        emailJSConfig.serviceId,
        emailJSConfig.templateId,
        templateParams,
        emailJSConfig.publicKey
      );

      if (result.status === 200) {
        alert('✅ Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
        // Réinitialiser le formulaire
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          service: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      alert('❌ Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ou nous contacter directement à idrissba@outlook.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />
      <ContactContainer>
        <Container>
          <ContactHeader>
            <ContactTitle>Contactez-nous</ContactTitle>
            <ContactSubtitle>
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans vos projets immobiliers entre l'Afrique et les Antilles.
            </ContactSubtitle>
          </ContactHeader>

          <ContactGrid>
            <ContactForm onSubmit={handleSubmit}>
              <FormTitle>Envoyez-nous un message</FormTitle>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    required
                  />
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre.email@exemple.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="06 62 36 82 25"
                  />
                </FormGroup>
              </FormGrid>

              <FormGrid>
                <FormGroup>
                  <Label htmlFor="service">Service recherché</Label>
                  <Select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Sélectionnez un service</option>
                    <option value="achat">Achat de propriété</option>
                    <option value="vente">Vente de propriété</option>
                    <option value="location">Location</option>
                    <option value="investissement">Conseil en investissement</option>
                    <option value="gestion">Gestion de patrimoine</option>
                    <option value="autre">Autre</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="subject">Sujet</Label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Sujet de votre demande"
                  />
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label htmlFor="message">Message *</Label>
                <TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre projet ou posez votre question..."
                  required
                />
              </FormGroup>

              <SubmitButton type="submit" disabled={isSubmitting}>
                <FaPaperPlane />
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </SubmitButton>
            </ContactForm>

            <ContactInfo>
            </ContactInfo>
          </ContactGrid>

        </Container>
      </ContactContainer>
    </>
  );
};

export default ContactPage;