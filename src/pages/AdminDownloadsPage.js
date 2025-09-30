import React from 'react';
import styled from 'styled-components';
import DownloadsAdminSection from '../components/DownloadsAdminSection';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  padding-top: 4rem; /* Pour compenser la navbar fixe */
  min-height: 100vh;
  background: #f8f9fa;
`;

const AdminDownloadsPage = () => {
  return (
    <>
      <SEO
        title="Administration - Téléchargements du Guide | BA Immobilier"
        description="Tableau de bord administrateur pour visualiser et gérer les téléchargements du guide d'investissement"
        keywords="admin, téléchargements, guide, investissement, statistiques"
        url="/admin/downloads"
      />
      <PageContainer>
        <DownloadsAdminSection />
      </PageContainer>
    </>
  );
};

export default AdminDownloadsPage;