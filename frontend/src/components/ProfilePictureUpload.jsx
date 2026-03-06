import { useState } from 'react';
import api from '../services/api';
import { Button, Alert } from './UI';

export default function ProfilePictureUpload({ currentPicture, onUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image');
      return;
    }

    // Vérifier la taille (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image est trop grande (max 5MB)');
      return;
    }

    setSelectedFile(file);
    setError(null);

    // Créer un aperçu
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('profile_picture', selectedFile);

    try {
      const response = await api.put('/users/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Photo de profil mise à jour avec succès !');
      setSelectedFile(null);
      setPreview(null);
      
      // Informer le parent
      if (onUpdate) {
        onUpdate(response.data.user);
      }

      // Réinitialiser le champ de fichier
      const fileInput = document.getElementById('profile-picture-input');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour de la photo');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    const fileInput = document.getElementById('profile-picture-input');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo de profil</h3>

      {/* Aperçu actuel ou nouveau */}
      <div className="flex items-center gap-6 mb-6">
        <div className="relative">
          {preview || currentPicture ? (
            <img
              src={preview || `${import.meta.env.VITE_API_URL}/storage/${currentPicture}`}
              alt="Photo de profil"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] flex items-center justify-center text-white text-3xl font-bold">
              ?
            </div>
          )}
          {preview && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <label 
            htmlFor="profile-picture-input" 
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Choisir une photo
          </label>
          <input
            id="profile-picture-input"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG ou GIF (max 5MB)
          </p>
        </div>
      </div>

      {/* Messages */}
      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}

      {/* Boutons d'action */}
      {selectedFile && (
        <div className="flex gap-3">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              'Enregistrer'
            )}
          </Button>
          <Button
            onClick={handleCancel}
            variant="secondary"
            disabled={uploading}
          >
            Annuler
          </Button>
        </div>
      )}
    </div>
  );
}
