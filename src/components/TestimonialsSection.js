import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(218, 165, 32, 0.3); }
  50% { box-shadow: 0 0 40px rgba(218, 165, 32, 0.6); }
`;

const TestimonialsContainer = styled.section`
  padding: 8rem 0;
  background:
    linear-gradient(135deg, rgba(12, 28, 69, 0.02) 0%, transparent 50%),
    linear-gradient(45deg, rgba(218, 165, 32, 0.03) 0%, transparent 50%),
    #ffffff;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 4rem 0;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 0 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.title};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  position: relative;
  text-align: center;


  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
    border-radius: 2px;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;

`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  padding: 2rem 0;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 3rem;
  }
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

`;

const TestimonialContent = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: -10px;
    font-size: 3rem;
    color: ${props => props.theme.colors.gold};
    font-family: serif;
    opacity: 0.3;
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorInitial = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${props => props.theme.colors.gold}, #FFD700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.white};
  box-shadow: 0 4px 15px rgba(218, 165, 32, 0.3);
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-family: ${props => props.theme.fonts.title};
  font-size: 1.1rem;
  font-weight: 600;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.25rem;
`;

const AuthorDetails = styled.p`
  font-family: ${props => props.theme.fonts.body};
  font-size: 0.9rem;
  color: ${props => props.theme.colors.gold};
  margin: 0;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-top: 0.5rem;
`;

const Star = styled.span`
  color: ${props => props.theme.colors.gold};
  font-size: 1rem;
`;

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "Grâce à BA Immobilier, j'ai pu acquérir ma villa de rêve à Abidjan. Leur accompagnement depuis Paris a été exceptionnel, de la recherche au financement. Une équipe vraiment professionnelle qui comprend les enjeux de la diaspora.",
      author: "Marie-Claire Kouassi",
      details: "Cadre bancaire",
      initial: "M",
      rating: 5
    },
    {
      id: 2,
      content: "L'investissement locatif en Côte d'Ivoire semblait compliqué depuis la France, mais BA Immobilier a rendu tout simple. Rendement de 8% la première année, je recommande vivement leurs services de conciergerie premium.",
      author: "Pierre Dubois",
      details: "Entrepreneur",
      initial: "P",
      rating: 5
    },
    {
      id: 3,
      content: "Après 15 ans en Martinique, je voulais investir au pays. BA Immobilier m'a trouvé le terrain parfait à Yamoussoukro et s'est occupé de tout. Aujourd'hui ma résidence secondaire prend forme !",
      author: "Fatou Diabaté",
      details: "Infirmière",
      initial: "F",
      rating: 5
    },
    {
      id: 4,
      content: "La transparence et le professionnalisme de cette équipe m'ont convaincu. Ils ont géré mon projet immobilier à Bouaké de A à Z. Communication constante, délais respectés, je suis ravi de mon investissement.",
      author: "Sophie Martin",
      details: "Ingénieur",
      initial: "S",
      rating: 5
    },
    {
      id: 5,
      content: "En tant que retraitée, je cherchais un investissement sûr. BA Immobilier m'a proposé un appartement clé en main à Abidjan avec gestion locative incluse. Tranquillité d'esprit totale !",
      author: "Awa Koné",
      details: "Retraitée",
      initial: "A",
      rating: 5
    },
    {
      id: 6,
      content: "Leur réseau de partenaires financiers m'a permis d'obtenir un financement adapté à ma situation de non-résident. Un service personnalisé qui fait vraiment la différence.",
      author: "Laurent Rousseau",
      details: "Consultant",
      initial: "L",
      rating: 5
    }
  ];

  return (
    <TestimonialsContainer>
      <ContentWrapper>
        <SectionHeader>
          <SectionTitle>Ils nous font confiance</SectionTitle>
          <SectionSubtitle>
            Découvrez les témoignages de nos clients qui ont concrétisé leurs projets immobiliers
            en Afrique et aux Antilles grâce à notre accompagnement personnalisé.
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialsGrid>
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.id}>
              <TestimonialContent>
                {testimonial.content}
              </TestimonialContent>

              <TestimonialAuthor>
                <AuthorInitial>
                  {testimonial.initial}
                </AuthorInitial>
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorDetails>{testimonial.details}</AuthorDetails>
                  <StarsContainer>
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <Star key={index}>★</Star>
                    ))}
                  </StarsContainer>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </ContentWrapper>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;