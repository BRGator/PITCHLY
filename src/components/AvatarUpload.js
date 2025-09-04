import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useI18n } from '../lib/i18n';

export default function AvatarUpload({ currentImage, onUploadSuccess }) {
  const { t } = useI18n();
  const { data: session, update: updateSession } = useSession();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (session?.user?.email) {
      return session.user.email[0].toUpperCase();
    }
    return '?';
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      alert(t('avatarUpload.pleaseSelectImage'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert(t('avatarUpload.fileSizeLimit'));
      return;
    }

    uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      // Call success callback first to update local state
      if (onUploadSuccess) {
        onUploadSuccess(data.imageUrl);
      }

      // Force session refresh to get updated user data
      await updateSession({ 
        trigger: 'update',
        user: {
          ...session?.user,
          image: data.imageUrl
        }
      });

      // Trigger a second update after a brief delay to ensure it sticks
      setTimeout(async () => {
        await updateSession();
      }, 1000);

      alert(t('avatarUpload.updateSuccess'));

    } catch (error) {
      console.error('Upload error:', error);
      alert(t('avatarUpload.uploadFailed') + ': ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Display */}
      <div className="relative group">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 flex items-center justify-center text-white font-bold text-2xl border-4 border-gray-200 dark:border-gray-600">
            {getUserInitials()}
          </div>
        )}
        
        {/* Upload overlay */}
        {!uploading && (
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${
              dragActive ? 'opacity-100 bg-primary-600 bg-opacity-70' : ''
            }`}
            onClick={handleClick}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        )}

        {/* Loading overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Upload Button/Area */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="text-sm text-primary-600 dark:text-primary-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? t('avatarUpload.uploading') : currentImage ? t('avatarUpload.changeAvatar') : t('avatarUpload.uploadAvatar')}
        </button>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {t('avatarUpload.fileTypes')}
        </p>
        
        {/* Drag and drop hint */}
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {t('avatarUpload.uploadHint')}
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files?.[0])}
        className="hidden"
      />
    </div>
  );
}