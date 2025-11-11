// Configuration EmailJS avec variables d'environnement
export const emailJSConfig = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_ba_immobilier',
  templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_contact',
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
};

// Configuration du site
export const siteConfig = {
  contactEmail: process.env.REACT_APP_CONTACT_EMAIL || 'contact@baimmobilier.com',
  contactPhone: process.env.REACT_APP_CONTACT_PHONE || '+33662368225',
  siteUrl: process.env.REACT_APP_SITE_URL || 'https://ba-immobilier.onrender.com'
};

// Template par défaut pour les emails
export const emailTemplate = {
  to_email: siteConfig.contactEmail,
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  subject: '{{subject}}',
  message: '{{message}}',
  phone: '{{phone}}',
  service: '{{service}}'
};