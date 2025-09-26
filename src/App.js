import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';

import GlobalStyles, { theme } from './styles/GlobalStyles';
import i18n from './i18n/i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactBubble from './components/ContactBubble';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import PropertiesPage from './pages/PropertiesPage';
import ContactPage from './pages/ContactPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <ScrollToTop />
          <div className="App">
            <Header />
            <main style={{ paddingTop: '80px' }}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:serviceType" element={<ServiceDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
            <ContactBubble />
          </div>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;
