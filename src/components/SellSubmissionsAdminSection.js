import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaSearch,
  FaFileExport,
  FaTrash,
  FaEye,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSync,
  FaEuroSign,
  FaFilter,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaExclamationTriangle
} from 'react-icons/fa';
import sellService from '../services/SellService';

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

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;

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
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 120px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  align-items: center;
  font-size: 0.9rem;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.clickable ? '#e3f2fd' : '#f8f9fa'};
    ${props => props.clickable && `
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    `}
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

const ContactCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .name {
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
  }

  .contact {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text.light};
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const PropertyCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .type {
    font-weight: 600;
    color: ${props => props.theme.colors.text.dark};
  }

  .details {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text.light};
  }
`;

const LocationCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .neighborhood {
    font-weight: 500;
    color: ${props => props.theme.colors.text.dark};
  }

  .address {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.text.light};
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const StatusBadge = styled.span`
  background: ${props => props.color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  /* Empêche le clic sur les actions de déclencher le clic sur la ligne */
  * {
    pointer-events: auto;
  }
`;

const ActionIconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &.view {
    background: #e3f2fd;
    color: #1976d2;

    &:hover {
      background: #bbdefb;
    }
  }

  &.edit {
    background: #f3e5f5;
    color: #7b1fa2;

    &:hover {
      background: #e1bee7;
    }
  }

  &.delete {
    background: #ffebee;
    color: #d32f2f;

    &:hover {
      background: #ffcdd2;
    }
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

// Styles pour le modal de détails
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 0;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, #1a2b5e);
  color: white;
  padding: 2rem;
  position: relative;

  h2 {
    margin: 0 0 0.5rem 0;
    font-size: 1.8rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1rem;
  }
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const ModalBody = styled.div`
  overflow-y: auto;
  max-height: calc(90vh - 120px);
`;

const DetailSection = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};

  &:last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const DetailItem = styled.div`
  background: ${props => props.theme.colors.lightGray};
  padding: 1.5rem;
  border-radius: 12px;

  .label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text.light};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${props => props.theme.colors.text.dark};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const AmenitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const AmenityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${props => props.available ?
    `linear-gradient(135deg, ${props.theme.colors.gold}, #FFD700)` :
    '#f8f9fa'
  };
  color: ${props => props.available ? 'white' : props.theme.colors.text.light};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;

  .icon {
    font-size: 1rem;
  }
`;

const StatusSection = styled.div`
  padding: 2rem;
  background: #f8f9fa;

  .status-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .current-status {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const StatusSelector = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.theme.colors.lightGray};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const UpdateButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const NotesSection = styled.div`
  margin-top: 1.5rem;

  label {
    display: block;
    font-weight: 600;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid ${props => props.theme.colors.lightGray};
    border-radius: 8px;
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

const ContactActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ContactButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &.email {
    background: #007bff;
    color: white;

    &:hover {
      background: #0056b3;
    }
  }

  &.phone {
    background: #28a745;
    color: white;

    &:hover {
      background: #1e7e34;
    }
  }
`;

const TimelineItem = styled.div`
  padding: 1rem;
  border-left: 3px solid ${props => props.theme.colors.gold};
  margin-left: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 1.5rem;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.colors.gold};
    border-radius: 50%;
  }

  .time {
    font-size: 0.9rem;
    color: ${props => props.theme.colors.text.light};
    margin-bottom: 0.5rem;
  }

  .event {
    font-weight: 600;
    color: ${props => props.theme.colors.text.dark};
  }
`;

const SellSubmissionsAdminSection = () => {
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [stats, setStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [modalNotes, setModalNotes] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    // Filtrer les soumissions selon le terme de recherche et le statut
    let filtered = submissions;

    if (searchTerm) {
      filtered = sellService.searchSubmissions(searchTerm);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(submission => submission.status === statusFilter);
    }

    setFilteredSubmissions(filtered);
  }, [submissions, searchTerm, statusFilter]);

  const loadData = () => {
    setLoading(true);
    try {
      const submissionsData = sellService.getAllSubmissions();
      const statsData = sellService.getSubmissionStats();

      setSubmissions(submissionsData);
      setStats(statsData);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette soumission ?')) {
      const result = sellService.deleteSubmission(id);
      if (result.success) {
        loadData();
      } else {
        alert('Erreur lors de la suppression: ' + result.error);
      }
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes les soumissions ? Cette action est irréversible.')) {
      sellService.clearAllSubmissions();
      loadData();
    }
  };

  const handleExport = () => {
    sellService.exportToCSV();
  };

  const handleStatusChange = (id, newStatus) => {
    const result = sellService.updateSubmissionStatus(id, newStatus);
    if (result.success) {
      loadData();
    } else {
      alert('Erreur lors de la mise à jour: ' + result.error);
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'nouveau': return <FaExclamationTriangle />;
      case 'en_cours': return <FaClock />;
      case 'traite': return <FaCheckCircle />;
      case 'refuse': return <FaTimes />;
      default: return null;
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setModalStatus(submission.status);
    setModalNotes(submission.notes || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setModalStatus('');
    setModalNotes('');
  };

  const handleUpdateStatus = () => {
    if (selectedSubmission && modalStatus !== selectedSubmission.status) {
      const result = sellService.updateSubmissionStatus(selectedSubmission.id, modalStatus, modalNotes);
      if (result.success) {
        loadData();
        handleCloseModal();
      } else {
        alert('Erreur lors de la mise à jour: ' + result.error);
      }
    } else {
      handleCloseModal();
    }
  };

  const formatPropertyAmenities = (submission) => {
    const amenities = [
      { key: 'pool', label: 'Piscine', available: submission.pool },
      { key: 'garage', label: 'Garage', available: submission.garage },
      { key: 'garden', label: 'Jardin', available: submission.garden },
      { key: 'terrace', label: 'Terrasse', available: submission.terrace },
      { key: 'airConditioning', label: 'Climatisation', available: submission.airConditioning },
      { key: 'security', label: 'Sécurité', available: submission.security }
    ];
    return amenities;
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
        <Title>Demandes de Vente</Title>
        <Subtitle>
          Gestion et suivi des soumissions de vente de biens immobiliers
        </Subtitle>
      </Header>

      <StatsGrid>
        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#007bff">
            <FaHome />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.totalSubmissions || 0}</StatNumber>
            <StatLabel>Total soumissions</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#28a745">
            <FaCheckCircle />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.byStatus?.traite || 0}</StatNumber>
            <StatLabel>Traitées</StatLabel>
          </StatContent>
        </StatCard>

        <StatCard
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <StatIcon color="#ffc107">
            <FaClock />
          </StatIcon>
          <StatContent>
            <StatNumber>{stats.byStatus?.en_cours || 0}</StatNumber>
            <StatLabel>En cours</StatLabel>
          </StatContent>
        </StatCard>

      </StatsGrid>

      <ControlsBar>
        <SearchInput
          type="text"
          placeholder="Rechercher par nom, email, adresse..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tous les statuts</option>
          <option value="nouveau">Nouveau</option>
          <option value="en_cours">En cours</option>
          <option value="traite">Traité</option>
          <option value="refuse">Refusé</option>
        </FilterSelect>

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
          Soumissions de vente ({filteredSubmissions.length})
        </TableHeader>

        <Table>
          <TableHeaderRow>
            <div>Contact</div>
            <div>Bien</div>
            <div>Localisation</div>
            <div>Surface</div>
            <div>Date</div>
            <div>Statut</div>
            <div>Actions</div>
          </TableHeaderRow>

          {filteredSubmissions.length > 0 ? (
            filteredSubmissions.map((submission) => (
              <TableRow
                key={submission.id}
                clickable={true}
                onClick={() => handleViewSubmission(submission)}
                title="Cliquer pour voir les détails"
              >
                <ContactCell>
                  <div className="name">
                    {submission.firstName} {submission.lastName}
                  </div>
                  <div className="contact">
                    <FaEnvelope />
                    {submission.email}
                  </div>
                  <div className="contact">
                    <FaPhone />
                    {submission.phone}
                  </div>
                </ContactCell>

                <PropertyCell>
                  <div className="type">{submission.propertyType}</div>
                  <div className="details">
                    {submission.bedrooms} ch. • {submission.bathrooms} sdb
                  </div>
                  <div className="details">
                    Année: {submission.yearBuilt}
                  </div>
                </PropertyCell>

                <LocationCell>
                  <div className="neighborhood">{submission.neighborhood}</div>
                  <div className="address">
                    <FaMapMarkerAlt />
                    {submission.address}
                  </div>
                </LocationCell>

                <div>
                  <strong>{submission.surface}</strong> Sq.Ft
                </div>

                <div>{formatDate(submission.timestamp)}</div>

                <div>
                  <StatusBadge color={sellService.getStatusColor(submission.status)}>
                    {getStatusIcon(submission.status)}
                    {sellService.getStatusLabel(submission.status)}
                  </StatusBadge>
                </div>

                <ActionsCell onClick={(e) => e.stopPropagation()}>
                  <ActionIconButton
                    className="view"
                    title="Voir détails"
                    onClick={() => handleViewSubmission(submission)}
                  >
                    <FaEye />
                  </ActionIconButton>
                  <ActionIconButton
                    className="edit"
                    title="Modifier statut"
                    onClick={() => {
                      const newStatus = prompt(
                        'Nouveau statut (nouveau/en_cours/traite/refuse):',
                        submission.status
                      );
                      if (newStatus && newStatus !== submission.status) {
                        handleStatusChange(submission.id, newStatus);
                      }
                    }}
                  >
                    <FaEdit />
                  </ActionIconButton>
                  <ActionIconButton
                    className="delete"
                    title="Supprimer"
                    onClick={() => handleDelete(submission.id)}
                  >
                    <FaTrash />
                  </ActionIconButton>
                </ActionsCell>
              </TableRow>
            ))
          ) : (
            <EmptyState>
              {searchTerm || statusFilter !== 'all' ? (
                <p>Aucun résultat trouvé pour les critères sélectionnés.</p>
              ) : (
                <p>Aucune soumission de vente pour le moment.</p>
              )}
            </EmptyState>
          )}
        </Table>
      </DataTable>

      {/* Modal de détails */}
      <AnimatePresence>
        {isModalOpen && selectedSubmission && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <h2>Demande de Vente #{selectedSubmission.id}</h2>
                <p>Soumise le {formatDate(selectedSubmission.timestamp)}</p>
                <ModalCloseButton onClick={handleCloseModal}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>

              <ModalBody>
                {/* Informations du contact */}
                <DetailSection>
                  <h3>
                    <FaUsers />
                    Informations Contact
                  </h3>
                  <DetailGrid>
                    <DetailItem>
                      <div className="label">Nom complet</div>
                      <div className="value">
                        {selectedSubmission.firstName} {selectedSubmission.lastName}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Email</div>
                      <div className="value">
                        <FaEnvelope />
                        {selectedSubmission.email}
                      </div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Téléphone</div>
                      <div className="value">
                        <FaPhone />
                        {selectedSubmission.phone}
                      </div>
                    </DetailItem>
                  </DetailGrid>
                  <ContactActions>
                    <ContactButton
                      as="a"
                      href={`mailto:${selectedSubmission.email}`}
                      className="email"
                    >
                      <FaEnvelope />
                      Envoyer un email
                    </ContactButton>
                    <ContactButton
                      as="a"
                      href={`tel:${selectedSubmission.phone}`}
                      className="phone"
                    >
                      <FaPhone />
                      Appeler
                    </ContactButton>
                  </ContactActions>
                </DetailSection>

                {/* Informations du bien */}
                <DetailSection>
                  <h3>
                    <FaHome />
                    Détails du Bien
                  </h3>
                  <DetailGrid>
                    <DetailItem>
                      <div className="label">Type de bien</div>
                      <div className="value">{selectedSubmission.propertyType}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Chambres</div>
                      <div className="value">{selectedSubmission.bedrooms}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Salles de bain</div>
                      <div className="value">{selectedSubmission.bathrooms}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Surface</div>
                      <div className="value">{selectedSubmission.surface} Sq.Ft</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Année de construction</div>
                      <div className="value">{selectedSubmission.yearBuilt}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Valeur estimée</div>
                      <div className="value">
                        <FaEuroSign />
                        {selectedSubmission.estimatedValue ?
                          sellService.formatPrice(selectedSubmission.estimatedValue) :
                          'Non spécifiée'
                        }
                      </div>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                {/* Localisation */}
                <DetailSection>
                  <h3>
                    <FaMapMarkerAlt />
                    Localisation
                  </h3>
                  <DetailGrid>
                    <DetailItem>
                      <div className="label">Quartier</div>
                      <div className="value">{selectedSubmission.neighborhood}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Adresse complète</div>
                      <div className="value">{selectedSubmission.address}</div>
                    </DetailItem>
                    <DetailItem>
                      <div className="label">Pays</div>
                      <div className="value">{selectedSubmission.country}</div>
                    </DetailItem>
                  </DetailGrid>
                </DetailSection>

                {/* Équipements */}
                <DetailSection>
                  <h3>
                    <FaCheckCircle />
                    Équipements et Commodités
                  </h3>
                  <AmenitiesGrid>
                    {formatPropertyAmenities(selectedSubmission).map((amenity) => (
                      <AmenityBadge key={amenity.key} available={amenity.available}>
                        <span className="icon">
                          {amenity.available ? <FaCheckCircle /> : <FaTimes />}
                        </span>
                        {amenity.label}
                      </AmenityBadge>
                    ))}
                  </AmenitiesGrid>
                </DetailSection>

                {/* Description */}
                {selectedSubmission.description && (
                  <DetailSection>
                    <h3>Description du bien</h3>
                    <DetailItem>
                      <div className="value" style={{ whiteSpace: 'pre-wrap' }}>
                        {selectedSubmission.description}
                      </div>
                    </DetailItem>
                  </DetailSection>
                )}

                {/* Gestion du statut */}
                <StatusSection>
                  <div className="status-header">
                    <h3>
                      <FaEdit />
                      Gestion du Statut
                    </h3>
                    <div className="current-status">
                      <StatusBadge color={sellService.getStatusColor(selectedSubmission.status)}>
                        {getStatusIcon(selectedSubmission.status)}
                        {sellService.getStatusLabel(selectedSubmission.status)}
                      </StatusBadge>
                    </div>
                  </div>

                  <DetailGrid>
                    <DetailItem>
                      <div className="label">Nouveau statut</div>
                      <StatusSelector
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                      >
                        <option value="nouveau">Nouveau</option>
                        <option value="en_cours">En cours</option>
                        <option value="traite">Traité</option>
                        <option value="refuse">Refusé</option>
                      </StatusSelector>
                    </DetailItem>
                  </DetailGrid>


                  <ContactActions>
                    <UpdateButton onClick={handleUpdateStatus}>
                      <FaCheckCircle />
                      {modalStatus !== selectedSubmission.status ? 'Mettre à jour' : 'Fermer'}
                    </UpdateButton>
                  </ContactActions>
                </StatusSection>

                {/* Historique */}
                <DetailSection>
                  <h3>
                    <FaCalendarAlt />
                    Historique
                  </h3>
                  <TimelineItem>
                    <div className="time">{formatDate(selectedSubmission.timestamp)}</div>
                    <div className="event">Demande soumise</div>
                  </TimelineItem>
                  {selectedSubmission.statusHistory && selectedSubmission.statusHistory.map((entry, index) => (
                    <TimelineItem key={index}>
                      <div className="time">{formatDate(entry.timestamp)}</div>
                      <div className="event">
                        Statut changé en "{sellService.getStatusLabel(entry.status)}"
                        {entry.notes && ` - ${entry.notes}`}
                      </div>
                    </TimelineItem>
                  ))}
                </DetailSection>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </AdminContainer>
  );
};

export default SellSubmissionsAdminSection;