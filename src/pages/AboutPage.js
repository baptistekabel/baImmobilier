import React from 'react';
import SEO from '../components/SEO';
import { getSeoConfig } from '../utils/seoConfig';
import AboutSection from '../components/AboutSection';

const AboutPage = () => {
  const seoConfig = getSeoConfig('about');

  return (
    <>
      <SEO
        title={seoConfig.title}
        description={seoConfig.description}
        keywords={seoConfig.keywords}
        url={seoConfig.url}
      />
      <AboutSection />
    </>
  );
};

export default AboutPage;