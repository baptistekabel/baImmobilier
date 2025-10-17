// Configuration EmailJS
export const emailJSConfig = {
  serviceId: 'service_ba_immobilier', // À remplacer par votre Service ID
  templateId: 'template_contact', // À remplacer par votre Template ID
  publicKey: 'YOUR_PUBLIC_KEY' // À remplacer par votre Public Key
};

// Template par défaut pour les emails
export const emailTemplate = {
  to_email: 'idrissba@outlook.com',
  from_name: '{{from_name}}',
  from_email: '{{from_email}}',
  subject: '{{subject}}',
  message: '{{message}}',
  phone: '{{phone}}',
  service: '{{service}}'
};