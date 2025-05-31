import React from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectProps {
  className?: string;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ className }) => {
  const [tonConnectUI] = useTonConnectUI();
  const { toast } = useToast();

  // Handle connection status changes
  React.useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully.",
          duration: 3000,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, toast]);

  return (
    <TonConnectButton
      buttonClassName={`${className} h-11 px-4 py-2 bg-button-gradient hover:bg-button-gradient text-black font-bold transition-all duration-300 shadow-glow hover:shadow-glow-lg rounded-md`}
    />
  );
};

export default WalletConnect;