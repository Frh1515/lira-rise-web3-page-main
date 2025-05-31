import React from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  return (
    <TonConnectButton
      buttonClassName={`${className} h-11 px-4 py-2 bg-button-gradient hover:bg-button-gradient text-black font-bold transition-all duration-300 shadow-glow hover:shadow-glow-lg rounded-md`}
    />
  );
};

export default WalletConnect;