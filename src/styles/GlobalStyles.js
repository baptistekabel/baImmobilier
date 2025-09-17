import { createGlobalStyle } from 'styled-components';
import './fonts.css';

export const theme = {
  colors: {
    primary: '#0C1C45',    // Bleu nuit
    gold: '#DAA520',       // Doré
    white: '#FFFFFF',      // Blanc pur
    lightGray: '#F2F2F2',  // Gris clair
    emerald: '#3CB371',    // Vert émeraude
    text: {
      primary: '#0C1C45',
      light: '#666666',
      white: '#FFFFFF',
    }
  },
  fonts: {
    primary: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    title: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    body: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    accent: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1200px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem',
  },
  shadows: {
    light: '0 2px 10px rgba(12, 28, 69, 0.1)',
    medium: '0 4px 20px rgba(12, 28, 69, 0.15)',
    heavy: '0 8px 30px rgba(12, 28, 69, 0.2)',
  }
};

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.text.primary};
    line-height: 1.6;
    overflow-x: hidden;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.title};
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: ${theme.spacing.sm};
  }

  h1 {
    font-size: 3rem;
    font-weight: 800;
    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 2.2rem;
    }
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 1.8rem;
    }
  }

  h3 {
    font-size: 2rem;
    font-weight: 600;
    @media (max-width: ${theme.breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  }

  h4 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  h5 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  h6 {
    font-size: 1rem;
    font-weight: 500;
  }

  p {
    margin-bottom: ${theme.spacing.sm};
    font-weight: 400;
  }

  strong, b {
    font-weight: 700;
  }

  em, i {
    font-style: italic;
  }

  a {
    color: ${theme.colors.gold};
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: ${theme.colors.primary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul, ol {
    margin-left: ${theme.spacing.md};
    margin-bottom: ${theme.spacing.sm};
  }

  input, textarea, select, button {
    font-family: ${theme.fonts.body};
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};

    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: 0 ${theme.spacing.sm};
    }
  }

  .btn {
    display: inline-block;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: none;
    border-radius: 5px;
    font-family: ${theme.fonts.title};
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    text-align: center;

    &.btn-primary {
      background-color: ${theme.colors.gold};
      color: ${theme.colors.white};

      &:hover {
        background-color: ${theme.colors.primary};
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.medium};
      }
    }

    &.btn-secondary {
      background-color: transparent;
      color: ${theme.colors.gold};
      border: 2px solid ${theme.colors.gold};

      &:hover {
        background-color: ${theme.colors.gold};
        color: ${theme.colors.white};
        transform: translateY(-2px);
      }
    }

    &.btn-white {
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};

      &:hover {
        background-color: ${theme.colors.lightGray};
        transform: translateY(-2px);
      }
    }
  }

  .section-padding {
    padding: ${theme.spacing.xxl} 0;

    @media (max-width: ${theme.breakpoints.mobile}) {
      padding: ${theme.spacing.xl} 0;
    }
  }

  .text-center {
    text-align: center;
  }

  .text-gold {
    color: ${theme.colors.gold};
  }

  .text-white {
    color: ${theme.colors.white};
  }

  .bg-primary {
    background-color: ${theme.colors.primary};
  }

  .bg-light {
    background-color: ${theme.colors.lightGray};
  }

  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Typography utilities */
  .font-light {
    font-weight: 300;
  }

  .font-normal {
    font-weight: 400;
  }

  .font-medium {
    font-weight: 500;
  }

  .font-semibold {
    font-weight: 600;
  }

  .font-bold {
    font-weight: 700;
  }

  .font-extrabold {
    font-weight: 800;
  }

  .font-black {
    font-weight: 900;
  }
`;

export default GlobalStyles;