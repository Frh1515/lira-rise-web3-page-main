
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { Copy, Share, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Referrals = () => {
  const { t, isRTL } = useLanguage();
  const { referralCode, setReferralCode, submittedReferralCode, setSubmittedReferralCode } = useAppStore();
  const [inputReferrerCode, setInputReferrerCode] = useState('');
  const { toast } = useToast();

  // Generate referral code if not exists
  useEffect(() => {
    if (!referralCode) {
      const generateCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'ref_';
        for (let i = 0; i < 6; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      setReferralCode(generateCode());
    }
  }, [referralCode, setReferralCode]);

  const referralLink = `https://t.me/LyraCoinBot?start=${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast({
        title: t('linkCopied'),
        duration: 2000,
      });
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = referralLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast({
        title: t('linkCopied'),
        duration: 2000,
      });
    }
  };

  const handleSubmitCode = () => {
    if (inputReferrerCode.trim()) {
      setSubmittedReferralCode(inputReferrerCode.trim());
      setInputReferrerCode('');
      toast({
        title: t('codeSubmitted'),
        duration: 2000,
      });
    }
  };

  return (
    <div className={`min-h-screen bg-lira-gradient text-white pb-20 px-4 pt-8 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Gift className="w-12 h-12 text-lira-green mx-auto mb-3" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-lira-green bg-clip-text text-transparent">
            {t('referralsTitle')}
          </h1>
        </div>

        {/* Your Referral Code */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t('yourReferralCode')}
              </h2>
              <div className="bg-lira-darkest/50 rounded-xl p-4 mb-4">
                <p className="text-2xl font-mono font-bold text-lira-green tracking-wider">
                  {referralCode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              {t('referralLink')}
            </h2>
            <div className="bg-lira-darkest/50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-300 break-all font-mono">
                {referralLink}
              </p>
            </div>
            <Button
              onClick={handleCopyLink}
              className="w-full bg-button-gradient hover:bg-button-gradient text-black font-bold py-3 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
            >
              <Copy className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t('copyLink')}
            </Button>
          </CardContent>
        </Card>

        {/* Enter Referrer Code */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              {t('enterReferrerCode')}
            </h2>
            <div className="space-y-4">
              <Input
                value={inputReferrerCode}
                onChange={(e) => setInputReferrerCode(e.target.value)}
                placeholder="ref_ABC123"
                className="bg-lira-darkest/50 border-lira-green/30 text-white placeholder-gray-400 text-center font-mono text-lg"
                disabled={!!submittedReferralCode}
              />
              {submittedReferralCode ? (
                <div className="text-center">
                  <p className="text-green-400 text-sm mb-2">
                    ✓ {t('codeSubmitted')}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {t('yourReferralCode')}: {submittedReferralCode}
                  </p>
                </div>
              ) : (
                <Button
                  onClick={handleSubmitCode}
                  disabled={!inputReferrerCode.trim()}
                  className="w-full bg-button-gradient hover:bg-button-gradient text-black font-bold py-3 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
                >
                  <Share className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                  {t('submitCode')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Referrals;
