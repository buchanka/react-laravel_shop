import React, { useState } from 'react';
import api from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UploadAvatar({ onAvatarUpdate }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  setLoading(true);

  try {
    const response = await api.post('/customer/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data.url) {
      const newUrl = `${response.data.url}?force=${Date.now()}`;
      

      const img = new Image();
      img.src = newUrl;
      img.onload = () => {
        onAvatarUpdate('');
        setTimeout(() => onAvatarUpdate(newUrl), 100);
      };
      img.onerror = () => console.error('Ошибка загрузки изображения');
    }
  } catch (error) {
    console.error('Ошибка при загрузке аватара:', error);
  } finally {
    setLoading(false);
    setFile(null);
  }
};

  return (
    <div className="space-y-3">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={() => handleUpload(file)} disabled={loading || !file}>
        {loading ? 'Загрузка...' : 'Загрузить аватар'}
      </Button>
    </div>
  );
}
