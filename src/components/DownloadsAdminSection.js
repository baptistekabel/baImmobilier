import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FaDownload,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaFileExport,
  FaTrash,
  FaEye,
  FaChartBar,
  FaEnvelope,
  FaClock,
  FaGlobeAmericas,
  FaSync
} from 'react-icons/fa';
import downloadService from '../services/DownloadService';

const AdminContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
`;

const Header = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.text.light};
  font-size: 1.1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  background: ${props => props.color || props.theme.colors.primary};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.dark};
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.light};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ControlsBar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  position: relative;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E") no-repeat 0.75rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;

    &:hover {
      background: ${props => props.theme.colors.secondary};
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: ${props => props.theme.colors.lightGray};
    color: ${props => props.theme.colors.text.dark};

    &:hover {
      background: #e9ecef;
    }
  }

  &.danger {
    background: #dc3545;
    color: white;

    &:hover {
      background: #c82333;
    }
  }
`;

const DataTable = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Table = styled.div`
  overflow-x: auto;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 80px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  align-items: center;
  font-size: 0.9rem;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: left;
  }
`;

const TableHeaderRow = styled(TableRow)`
  background: #f8f9fa;
  font-weight: 600;
  color: ${props => props.theme.colors.text.dark};
  border-bottom: 2px solid ${props => props.theme.colors.lightGray};

  &:hover {
    background: #f8f9fa;
  }
`;

const EmailCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
`;

const Badge = styled.span`
  background: ${props => {
    switch (props.type) {
      case 'high': return '#28a745';
      case 'medium': return '#ffc107';
      case 'low': return '#6c757d';
      default: return '#17a2b8';
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #c82333;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${props => props.theme.colors.text.light};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.text.light};
`;

const DownloadsAdminSection = () => {
  const [downloads, setDownloads] = useState([]);
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filtrer les téléchargements selon le terme de recherche
    const filtered = downloads.filter(download =>
      download.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (download.name && download.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      download.date.includes(searchTerm)
    );
    setFilteredDownloads(filtered);
  }, [downloads, searchTerm]);

  const loadData = () => {
    setLoading(true);
    try {
      const downloadData = downloadService.getAllDownloads();
      const statsData = downloadService.getDownloadStats();

      setDownloads(downloadData);
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce téléchargement ?')) {
      downloadService.deleteDownload(id);
      loadData();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous les téléchargements ? Cette action est irréversible.')) {
      downloadService.clearAllDownloads();
      loadData();
    }
  };

  const handleExport = () => {
    downloadService.exportToCSV();
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDownloadBadge = (count) => {
    if (count >= 3) return { type: 'high', text: `${count}x` };
    if (count >= 2) return { type: 'medium', text: `${count}x` };
    return { type: 'low', text: `${count}x` };
  };

  if (loading) {
    return (
      <AdminContainer>
        <LoadingSpinner>
          <FaSync style={{ marginRight: '0.5rem', animation: 'spin 1s linear infinite' }} />
          Chargement des données...
        </LoadingSpinner>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <Header>
        <Title>Téléchargements du Guide</Title>
        <Subtitle>
          Gestion et analyse des téléchargements du guide d'investissement
        </Subtitle>
      </Header>

      <StatsGrid>
        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#28a745">
            <FaDownload />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.totalDownloads || 0}</StatNumber>
            <StatLabel>Total téléchargements</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#007bff">
            <FaUsers />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.uniqueUsers || 0}</StatNumber>
            <StatLabel>Utilisateurs uniques</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#ffc107">
            <FaCalendarAlt />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.recentDownloads || 0}</StatNumber>
            <StatLabel>Ce mois-ci</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#17a2b8">
            <FaClock />
          </StatIcon>
          <StatContent>
            <StatNumber>
              {stats.lastDownload ? formatDate(stats.lastDownload.timestamp) : 'N/A'}
            </StatNumber>
            <StatLabel>Dernier téléchargement</StatLabel>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <ControlsBar>
        <SearchInput
          type="text"
          placeholder="Rechercher par email, nom ou date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ActionButton className="primary" onClick={loadData}>
          <FaSync />
          Actualiser
        </ActionButton>

        <ActionButton className="secondary" onClick={handleExport}>
          <FaFileExport />
          Exporter CSV
        </ActionButton>

        <ActionButton className="danger" onClick={handleClearAll}>
          <FaTrash />
          Tout supprimer
        </ActionButton>
      </ControlsBar>

      <DataTable>
        <TableHeader>
          <FaEye />
          Liste des téléchargements ({filteredDownloads.length})
        </TableHeader>

        <Table>
          <TableHeaderRow>
            <div>Email</div>
            <div>Nom</div>
            <div>Date</div>
            <div>Heure</div>
            <div>Téléchargements</div>
            <div>Source</div>
            <div>Actions</div>
          </TableHeaderRow>

          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((download) => {
              const badge = getDownloadBadge(download.downloadCount || 1);
              return (
                <TableRow key={download.id}>
                  <EmailCell>
                    <FaEnvelope />
                    {download.email}
                  </EmailCell>
                  <div>{download.name || 'Non renseigné'}</div>
                  <div>{formatDate(download.timestamp)}</div>
                  <div>{formatTime(download.timestamp)}</div>
                  <div>
                    <Badge type={badge.type}>{badge.text}</Badge>
                  </div>
                  <div>
                    <Badge>{download.source || 'Website'}</Badge>
                  </div>
                  <DeleteButton onClick={() => handleDelete(download.id)}>
                    <FaTrash />
                  </DeleteButton>
                </TableRow>
              );
            })
          ) : (
            <EmptyState>
              {searchTerm ? (
                <p>Aucun résultat trouvé pour "{searchTerm}"</p>
              ) : (
                <p>Aucun téléchargement enregistré pour le moment.</p>
              )}
            </EmptyState>
          )}
        </Table>
      </DataTable>
    </AdminContainer>
  );
};

export default DownloadsAdminSection;