import React from 'react';
import SEO from '../components/SEO';
import { getSeoConfig } from '../utils/seoConfig';
import ServicesSection from '../components/ServicesSection';

const ServicesPage = () => {
  const seoConfig = getSeoConfig('services');

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />
      <ServicesSection />
    </>
  );
};

export default ServicesPage;