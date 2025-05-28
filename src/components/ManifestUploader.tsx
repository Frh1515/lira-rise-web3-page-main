
import { useEffect, useState } from 'react';
import { uploadTonConnectManifest } from '@/utils/uploadManifest';

const ManifestUploader = () => {
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    const uploadManifest = async () => {
      try {
        const manifestUrl = await uploadTonConnectManifest();
        console.log('TonConnect manifest is available at:', manifestUrl);
        setIsUploaded(true);
      } catch (error) {
        console.error('Failed to upload manifest:', error);
      }
    };

    // Force re-upload on every component mount to ensure latest manifest
    uploadManifest();
  }, []);

  return null; // This component doesn't render anything
};

export default ManifestUploader;
