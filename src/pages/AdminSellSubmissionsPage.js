import React from 'react';
import styled from 'styled-components';
import SellSubmissionsAdminSection from '../components/SellSubmissionsAdminSection';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  padding-top: 4rem; /* Pour compenser la navbar fixe */
  min-height: 100vh;
  background: #f8f9fa;
`;

const AdminSellSubmissionsPage = () => {
  return (
    <>
      <SEO
        title="Administration - Demandes de Vente | BA Immobilier"
        description="Tableau de bord administrateur pour visualiser et gérer les demandes de vente de biens immobiliers"
        keywords="admin, vente, demandes, soumissions, immobilier, statistiques"
        url="/admin/sell-submissions"
      />
      <PageContainer>
        <SellSubmissionsAdminSection />
      </PageContainer>
    </>
  );
};

export default AdminSellSubmissionsPage;