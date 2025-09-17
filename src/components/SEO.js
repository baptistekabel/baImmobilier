import { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}) => {
  const siteTitle = "BA Immobilier";
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} - Unir nos histoires, construire notre avenir`;
  const siteUrl = "https://ba-immobilier.com";
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl;
  const defaultImage = `${siteUrl}/logoBaImmobilier.jpeg`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update Open Graph tags
    const updateMetaProperty = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      }
    };

    updateMetaProperty('og:title', fullTitle);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', fullUrl);
    updateMetaProperty('og:image', image || defaultImage);
    updateMetaProperty('og:type', type);

    // Update Twitter Card tags
    updateMetaProperty('twitter:title', fullTitle);
    updateMetaProperty('twitter:description', description);
    updateMetaProperty('twitter:url', fullUrl);
    updateMetaProperty('twitter:image', image || defaultImage);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    }
  }, [fullTitle, description, keywords, fullUrl, image, defaultImage, type]);

  return null; // This component doesn't render anything
};

export default SEO;