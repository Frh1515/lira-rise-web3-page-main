import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Link2, DollarSign, Users, TrendingUp, Facebook, Instagram, Globe, Send } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';

const LandingPage = () => {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setIsRTL(savedLanguage === 'ar');
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    setIsRTL(newLanguage === 'ar');
    localStorage.setItem('language', newLanguage);
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const texts = {
    en: {
      title: "LYRA COIN is Live",
      subtitle: "Earn. Share. Rise.",
      connectWallet: "Connect Wallet",
      currentPrice: "Current Price",
      shareTitle: "🔗 Spread the word about LYRA COIN!",
      howItWorks: "How it Works",
      buyTokens: "Buy Tokens",
      buyTokensDesc: "Purchase LYRA tokens with BNB and join our growing community of investors.",
      getReferral: "Get Referral Link",
      getReferralDesc: "Receive your unique referral link to share with friends and family.",
      earnRewards: "Earn Rewards",
      earnRewardsDesc: "Earn rewards for every successful purchase made through your referral link.",
      smartContract: "Smart Contract Integration",
      webThree: "Web3 functionality coming soon...",
      referralNote: "* Referral link activates only after purchase",
      liveStats: "Live Stats",
      totalSold: "Total Tokens Sold",
      verifiedReferrals: "Verified Referrals",
      joinCommunity: "Join Our Community",
      telegramChannel: "Telegram Channel",
      twitter: "X (Twitter)",
      footer: "© 2025 LYRA COIN. All Rights Reserved."
    },
    ar: {
      title: "LYRA COIN متاحة الآن",
      subtitle: "اكسب. شارك. ارتقي.",
      connectWallet: "ربط المحفظة",
      currentPrice: "السعر الحالي",
      shareTitle: "🔗 انشر كلمة عن LYRA COIN!",
      howItWorks: "كيف يعمل",
      buyTokens: "شراء الرموز",
      buyTokensDesc: "اشترِ رموز LYRA بعملة BNB وانضم إلى مجتمعنا المتنامي من المستثمرين.",
      getReferral: "احصل على رابط الإحالة",
      getReferralDesc: "احصل على رابط الإحالة الفريد الخاص بك لمشاركته مع الأصدقاء والعائلة.",
      earnRewards: "اكسب المكافآت",
      earnRewardsDesc: "اكسب مكافآت عن كل عملية شراء ناجحة تتم من خلال رابط الإحالة الخاص بك.",
      smartContract: "تكامل العقد الذكي",
      webThree: "وظائف Web3 قادمة قريباً...",
      referralNote: "* رابط الإحالة يُفعل فقط بعد الشراء",
      liveStats: "الإحصائيات المباشرة",
      totalSold: "إجمالي الرموز المباعة",
      verifiedReferrals: "الإحالات المُتحققة",
      joinCommunity: "انضم إلى مجتمعنا",
      telegramChannel: "قناة تليجرام",
      twitter: "إكس (تويتر)",
      footer: "© 2025 LYRA COIN. جميع الحقوق محفوظة."
    }
  };

  const t = texts[language as keyof typeof texts];
  const landingPageURL = window.location.origin;

  const handleSocialShare = (platform: string) => {
    let url = '';
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(landingPageURL)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(landingPageURL)}&text=Check out LYRA COIN!`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(landingPageURL)}&text=Join LYRA COIN now!`;
        break;
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`min-h-screen bg-lira-gradient text-white overflow-hidden pb-20 ${isRTL ? 'font-arabic' : ''}`}>
      {/* Language Toggle */}
      <div className={`fixed top-4 ${isRTL ? 'left-4' : 'right-4'} z-50`}>
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 bg-card-gradient backdrop-blur-sm border border-lira-green/20 rounded-full flex items-center justify-center hover:border-lira-green/60 transition-all duration-300 shadow-card-glow hover:shadow-glow"
        >
          <Globe className="w-5 h-5 text-lira-green" />
        </button>
      </div>

      {/* Compact Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-lira-green/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-lira-green/5 rounded-full blur-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-lira-green/8 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="text-center z-10 animate-fade-in max-w-4xl mx-auto">
          {/* Official Logo */}
          <div className="mb-4 animate-float">
            <div className="w-32 h-32 mx-auto flex items-center justify-center">
              <img 
                src="/lovable-uploads/c2f64824-403b-4fd4-a1a8-dbf0b6e0c7a4.png" 
                alt="LYRA COIN Official Logo" 
                className="max-w-[120px] w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-lira-green bg-clip-text text-transparent">
            {t.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-lira-green font-semibold mb-6">
            {t.subtitle}
          </p>

          {/* Connect Wallet Button - Now using WalletConnect component */}
          <WalletConnect className="mb-4 animate-glow-pulse" />

          {/* Token Price */}
          <div className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 rounded-2xl p-4 max-w-sm mx-auto shadow-card-glow mb-6">
            <p className="text-sm text-gray-300 mb-2">{t.currentPrice}</p>
            <div className="flex items-center justify-center gap-2">
              <img 
                src="https://cryptologos.cc/logos/bnb-bnb-logo.png" 
                alt="BNB" 
                className="w-6 h-6"
              />
              <p className="text-2xl font-bold bg-gradient-to-r from-[#F3BA2F] to-[#F0B90B] bg-clip-text text-transparent">
                0.01 BNB
              </p>
            </div>
          </div>

          {/* Compact Sharing Section */}
          <div className="bg-gradient-to-r from-lira-darker/30 to-lira-darkest/30 rounded-2xl p-4 mb-6">
            <h3 className="text-lg font-bold mb-3 text-white">
              {t.shareTitle}
            </h3>
            
            <div className="flex justify-center gap-3">
              {/* Facebook */}
              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300 shadow-lg"
              >
                <Facebook className="w-5 h-5 text-white" />
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300 shadow-lg border border-gray-700"
              >
                <div className="w-5 h-5 text-white font-bold text-base flex items-center justify-center">
                  𝕏
                </div>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleSocialShare('telegram')}
                className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300 shadow-lg"
              >
                <Send className="w-5 h-5 text-white" />
              </button>

              {/* TikTok - Official Logo */}
              <button
                className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300 shadow-lg cursor-default relative overflow-hidden"
              >
                <div className="relative">
                  {/* TikTok musical note logo */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FF0050"/>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#25F4EE"/>
                  </svg>
                </div>
              </button>

              {/* Instagram */}
              <button
                className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-full flex items-center justify-center hover:scale-110 hover:shadow-glow transition-all duration-300 shadow-lg cursor-default"
              >
                <Instagram className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Compact How it Works */}
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {/* Step 1 */}
            <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-3 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-lira-green/20 rounded-full flex items-center justify-center group-hover:bg-lira-green/30 transition-colors duration-300">
                  <Wallet className="h-5 w-5 text-lira-green" />
                </div>
                <h3 className="text-base font-bold mb-1 text-white">{t.buyTokens}</h3>
                <p className="text-xs text-gray-300">{t.buyTokensDesc}</p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-3 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-lira-green/20 rounded-full flex items-center justify-center group-hover:bg-lira-green/30 transition-colors duration-300">
                  <Link2 className="h-5 w-5 text-lira-green" />
                </div>
                <h3 className="text-base font-bold mb-1 text-white">{t.getReferral}</h3>
                <p className="text-xs text-gray-300">{t.getReferralDesc}</p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow hover:shadow-glow transition-all duration-300 group">
              <CardContent className="p-3 text-center">
                <div className="w-10 h-10 mx-auto mb-2 bg-lira-green/20 rounded-full flex items-center justify-center group-hover:bg-lira-green/30 transition-colors duration-300">
                  <DollarSign className="h-5 w-5 text-lira-green" />
                </div>
                <h3 className="text-base font-bold mb-1 text-white">{t.earnRewards}</h3>
                <p className="text-xs text-gray-300">{t.earnRewardsDesc}</p>
              </CardContent>
            </Card>
          </div>

          {/* Compact Live Stats */}
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow">
              <CardContent className="p-3 text-center">
                <TrendingUp className="h-6 w-6 text-lira-green mx-auto mb-1" />
                <p className="text-base font-bold text-white mb-1">{t.totalSold}</p>
                <p className="text-xl font-bold text-lira-green">18,920</p>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow">
              <CardContent className="p-3 text-center">
                <Users className="h-6 w-6 text-lira-green mx-auto mb-1" />
                <p className="text-base font-bold text-white mb-1">{t.verifiedReferrals}</p>
                <p className="text-xl font-bold text-lira-green">420</p>
              </CardContent>
            </Card>
          </div>

          {/* Compact Social Media Section */}
          <div className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 rounded-2xl p-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">
              {t.joinCommunity}
            </h2>
            <div className="flex justify-center gap-4">
              {/* Telegram Channel */}
              <a 
                href="https://t.me/LYRACOIN25" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-xl px-3 py-2 hover:border-blue-500/60 transition-all duration-300 shadow-card-glow hover:shadow-blue-500/20"
              >
                <Send className="w-4 h-4 text-blue-400" />
                <span className="text-base font-semibold text-blue-400">{t.telegramChannel}</span>
              </a>

              {/* X (Twitter) */}
              <a 
                href="https://x.com/CoinLyra90781" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800/20 border border-gray-500/30 rounded-xl px-3 py-2 hover:border-gray-500/60 transition-all duration-300 shadow-card-glow hover:shadow-gray-500/20"
              >
                <div className="w-4 h-4 text-gray-300 font-bold text-base flex items-center justify-center">
                  𝕏
                </div>
                <span className="text-base font-semibold text-gray-300">{t.twitter}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-lira-darkest/80 backdrop-blur-sm border-t border-lira-green/20 py-4 px-4 mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            {t.footer}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;