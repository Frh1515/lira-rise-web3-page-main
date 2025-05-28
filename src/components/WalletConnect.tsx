
import React from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, XCircle } from 'lucide-react';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const isConnected = !!wallet;

  const handleConnect = async () => {
    if (isConnected) {
      // Disconnect wallet
      await tonConnectUI.disconnect();
    } else {
      // Connect wallet
      await tonConnectUI.connectWallet();
    }
  };

  const getButtonContent = () => {
    if (isConnected) {
      return (
        <>
          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
          ✅ Wallet Connected
        </>
      );
    }

    return (
      <>
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </>
    );
  };

  return (
    <Button
      onClick={handleConnect}
      variant={isConnected ? "secondary" : "default"}
      size="lg"
      className={`${className} ${
        !isConnected 
          ? 'bg-button-gradient hover:bg-button-gradient text-black font-bold' 
          : ''
      } transition-all duration-300 shadow-glow hover:shadow-glow-lg`}
    >
      {getButtonContent()}
    </Button>
  );
};

export default WalletConnect;
