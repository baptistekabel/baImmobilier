import React from 'react';
import SEO from '../components/SEO';
import { getSeoConfig } from '../utils/seoConfig';
import HeroSection from '../components/HeroSection';
import FeaturedPropertiesSection from '../components/FeaturedPropertiesSection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';

const HomePage = () => {
  const seoConfig = getSeoConfig('home');

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />
      <HeroSection />
      <FeaturedPropertiesSection />
      <ServicesSection />
      <WhyChooseUsSection />
    </>
  );
};

export default HomePage;