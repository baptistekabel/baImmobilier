import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FaUpload, FaTrash, FaImage, FaSpinner } from 'react-icons/fa';
import { adminService } from '../services/AdminService';

const UploaderContainer = styled.div`
  margin: 2rem 0;
`;

const UploaderTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const DropZone = styled.div`
  border: 2px dashed ${props => props.isDragOver ? props.theme.colors.gold : '#ccc'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isDragOver ? 'rgba(218, 165, 32, 0.1)' : '#f9f9f9'};
  margin-bottom: 1rem;

  &:hover {
    border-color: ${props => props.theme.colors.gold};
    background: rgba(218, 165, 32, 0.05);
  }

  .upload-icon {
    font-size: 2rem;
    color: ${props => props.theme.colors.gold};
    margin-bottom: 1rem;
  }

  .upload-text {
    color: ${props => props.theme.colors.primary};
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  .upload-hint {
    color: #666;
    font-size: 0.8rem;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const PreviewItem = styled.div`
  position: relative;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${PreviewItem}:hover & {
    opacity: 1;
  }
`;

const DeleteButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ff3742;
    transform: scale(1.1);
  }
`;

const PreviewInfo = styled.div`
  padding: 0.5rem;
  background: white;
`;

const FileName = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FileSize = styled.div`
  font-size: 0.7rem;
  color: #666;
  margin-top: 0.2rem;
`;

const UploadProgress = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;

  .progress-fill {
    height: 100%;
    background: ${props => props.theme.colors.gold};
    transition: width 0.3s ease;
    width: ${props => props.progress}%;
  }
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.colors.primary};

  .spinner {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  border-left: 4px solid #c62828;
`;

const ImageUploader = ({ onImagesChange, existingImages = [], maxImages = 10 }) => {
  const [images, setImages] = useState(existingImages);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleImagesUpdate = useCallback((newImages) => {
    setImages(newImages);
    onImagesChange(newImages);
  }, [onImagesChange]);

  const processFiles = async (files) => {
    const fileArray = Array.from(files);

    // Vérifier le nombre maximum d'images
    if (images.length + fileArray.length > maxImages) {
      setError(`Vous ne pouvez pas télécharger plus de ${maxImages} images au total.`);
      return;
    }

    // Vérifier les types de fichiers
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const invalidFiles = fileArray.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError('Seuls les fichiers JPEG, PNG et WebP sont autorisés.');
      return;
    }

    // Vérifier la taille des fichiers (max 5MB par fichier)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = fileArray.filter(file => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      setError('Les fichiers ne doivent pas dépasser 5MB.');
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Créer des aperçus locaux pour l'affichage immédiat
      const previews = await Promise.all(
        fileArray.map(async (file) => {
          const preview = URL.createObjectURL(file);
          return {
            id: Date.now() + Math.random(),
            file,
            preview,
            name: file.name,
            size: file.size,
            isUploading: true,
            uploaded: false
          };
        })
      );

      // Ajouter les aperçus aux images existantes
      const updatedImages = [...images, ...previews];
      handleImagesUpdate(updatedImages);

      // Upload des fichiers
      let uploadedCount = 0;
      const uploadPromises = previews.map(async (previewItem, index) => {
        try {
          const result = await adminService.uploadImage(previewItem.file);

          if (result.success) {
            // Mettre à jour l'image avec l'URL uploadée
            const imageIndex = updatedImages.findIndex(img => img.id === previewItem.id);
            if (imageIndex !== -1) {
              updatedImages[imageIndex] = {
                ...updatedImages[imageIndex],
                url: result.url,
                path: result.path,
                isUploading: false,
                uploaded: true
              };

              // Libérer l'URL de l'aperçu
              URL.revokeObjectURL(previewItem.preview);
              delete updatedImages[imageIndex].preview;
              delete updatedImages[imageIndex].file;
            }
          } else {
            throw new Error(result.error);
          }

          uploadedCount++;
          setUploadProgress((uploadedCount / previews.length) * 100);

          return result;
        } catch (error) {
          console.error(`Erreur upload ${previewItem.name}:`, error);

          // Supprimer l'image en échec
          const imageIndex = updatedImages.findIndex(img => img.id === previewItem.id);
          if (imageIndex !== -1) {
            URL.revokeObjectURL(previewItem.preview);
            updatedImages.splice(imageIndex, 1);
          }

          throw error;
        }
      });

      await Promise.allSettled(uploadPromises);
      handleImagesUpdate([...updatedImages]);

    } catch (error) {
      setError(`Erreur lors de l'upload: ${error.message}`);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
    // Reset l'input pour permettre de sélectionner le même fichier
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const removeImage = async (imageId) => {
    const imageToRemove = images.find(img => img.id === imageId);

    if (imageToRemove) {
      // Si l'image a été uploadée, la supprimer du storage
      if (imageToRemove.uploaded && imageToRemove.path) {
        try {
          await adminService.deleteImage(imageToRemove.path);
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
        }
      }

      // Si c'est un aperçu local, libérer l'URL
      if (imageToRemove.preview) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
    }

    const updatedImages = images.filter(img => img.id !== imageId);
    handleImagesUpdate(updatedImages);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <UploaderContainer>
      <UploaderTitle>Images du bien ({images.length}/{maxImages})</UploaderTitle>

      <DropZone
        isDragOver={isDragOver}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-input').click()}
      >
        <FaUpload className="upload-icon" />
        <div className="upload-text">
          Cliquez ou glissez-déposez vos images ici
        </div>
        <div className="upload-hint">
          Formats acceptés : JPEG, PNG, WebP (max 5MB par fichier)
        </div>
      </DropZone>

      <HiddenInput
        id="file-input"
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      {isUploading && (
        <UploadProgress>
          <ProgressText>
            <span>Upload en cours...</span>
            <FaSpinner className="spinner" />
          </ProgressText>
          <ProgressBar progress={uploadProgress}>
            <div className="progress-fill"></div>
          </ProgressBar>
          <ProgressText>
            <span>{Math.round(uploadProgress)}% terminé</span>
          </ProgressText>
        </UploadProgress>
      )}

      {images.length > 0 && (
        <PreviewGrid>
          {images.map((image) => (
            <PreviewItem key={image.id}>
              <PreviewImage
                src={image.url || image.preview}
                alt={image.name}
                onError={(e) => {
                  e.target.src = '/placeholder-image.jpg'; // Image de fallback
                }}
              />
              <PreviewOverlay>
                <DeleteButton onClick={() => removeImage(image.id)}>
                  <FaTrash />
                </DeleteButton>
              </PreviewOverlay>
              <PreviewInfo>
                <FileName title={image.name}>
                  {image.isUploading ? (
                    <>
                      <FaSpinner className="spinner" style={{ marginRight: '0.5rem' }} />
                      Upload...
                    </>
                  ) : (
                    <>
                      <FaImage style={{ marginRight: '0.5rem' }} />
                      {image.name}
                    </>
                  )}
                </FileName>
                <FileSize>{formatFileSize(image.size)}</FileSize>
              </PreviewInfo>
            </PreviewItem>
          ))}
        </PreviewGrid>
      )}
    </UploaderContainer>
  );
};

export default ImageUploader;