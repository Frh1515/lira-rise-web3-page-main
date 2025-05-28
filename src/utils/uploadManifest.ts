
import { supabase } from '@/integrations/supabase/client';

export const uploadTonConnectManifest = async () => {
  const manifestContent = {
    "manifest_version": "0.0.1",
    "name": "Lira Coin WebApp",
    "url": "https://lira-rise-web3-page.lovable.app",
    "icons": [
      "https://i.postimg.cc/5yNL8pnT/liracoin-logo.png"
    ],
    "bridge": {
      "type": "ton-connect",
      "url": "https://bridge.tonapi.io/bridge"
    }
  };

  const manifestFile = new File(
    [JSON.stringify(manifestContent, null, 2)], 
    'tonconnect-manifest.json', 
    { type: 'application/json' }
  );

  try {
    const { data, error } = await supabase.storage
      .from('public-files')
      .upload('tonconnect/tonconnect-manifest.json', manifestFile, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Error uploading manifest:', error);
      throw error;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('public-files')
      .getPublicUrl('tonconnect/tonconnect-manifest.json');

    console.log('Manifest uploaded successfully. Public URL:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Failed to upload TonConnect manifest:', error);
    throw error;
  }
};
