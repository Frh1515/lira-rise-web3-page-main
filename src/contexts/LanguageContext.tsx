
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  isRTL: boolean;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    currentPrice: "Current Price",
    
    // Prices page
    pricesTitle: "Cryptocurrency Prices",
    refresh: "Refresh",
    lastUpdated: "Last updated",
    loadingCrypto: "Loading cryptocurrency data...",
    errorFetch: "Failed to fetch cryptocurrency data",
    showingCached: "Showing cached data",
    
    // Tasks page
    tasksTitle: "Welcome to the Task Center!",
    tasksSubtitle: "Earn extra time by completing simple social media tasks or the daily TikTok Live mission.",
    yourBalance: "Your Balance",
    minutes: "minutes",
    completeTask: "Complete Task",
    claimReward: "Claim Reward",
    completed: "Completed",
    processing: "Verifying...",
    
    // Referrals page
    referralsTitle: "Referral Program",
    yourReferralCode: "Your Referral Code",
    referralLink: "Referral Link",
    copyLink: "Copy Link",
    enterReferrerCode: "Enter Referrer Code",
    submitCode: "Submit Code",
    linkCopied: "Link copied to clipboard!",
    codeSubmitted: "Referrer code submitted successfully!",
    
    // Profile page
    profileTitle: "Profile",
    telegramPhoto: "Telegram Photo",
    username: "Username",
    level: "Level",
    fullName: "Full Name",
    editName: "Edit Name",
    saveName: "Save Name",
    nameSaved: "Name saved successfully!",
    
    // User levels
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelAdvanced: "Advanced",
    
    // Platforms
    facebook: "Facebook",
    xtwitter: "X/Twitter",
    tiktok: "TikTok",
    instagram: "Instagram",
    youtube: "YouTube",
    telegram: "Telegram"
  },
  ar: {
    // Common
    currentPrice: "السعر الحالي",
    
    // Prices page
    pricesTitle: "أسعار العملات المشفرة",
    refresh: "تحديث",
    lastUpdated: "آخر تحديث",
    loadingCrypto: "جارٍ تحميل بيانات العملات المشفرة...",
    errorFetch: "فشل في جلب بيانات العملات المشفرة",
    showingCached: "عرض البيانات المحفوظة",
    
    // Tasks page
    tasksTitle: "مرحباً بك في مركز المهام!",
    tasksSubtitle: "اكسب وقتاً إضافياً من خلال إكمال مهام وسائل التواصل الاجتماعي البسيطة أو مهمة TikTok Live اليومية.",
    yourBalance: "رصيدك",
    minutes: "دقيقة",
    completeTask: "إكمال المهمة",
    claimReward: "استلام المكافأة",
    completed: "مكتملة",
    processing: "جارٍ التحقق...",
    
    // Referrals page
    referralsTitle: "برنامج الإحالة",
    yourReferralCode: "كود الإحالة الخاص بك",
    referralLink: "رابط الإحالة",
    copyLink: "نسخ الرابط",
    enterReferrerCode: "أدخل كود المُحيل",
    submitCode: "إرسال الكود",
    linkCopied: "تم نسخ الرابط إلى الحافظة!",
    codeSubmitted: "تم إرسال كود المُحيل بنجاح!",
    
    // Profile page
    profileTitle: "الملف الشخصي",
    telegramPhoto: "صورة تليغرام",
    username: "اسم المستخدم",
    level: "المستوى",
    fullName: "الاسم الكامل",
    editName: "تعديل الاسم",
    saveName: "حفظ الاسم",
    nameSaved: "تم حفظ الاسم بنجاح!",
    
    // User levels
    levelBeginner: "مبتدئ",
    levelIntermediate: "متوسط",
    levelAdvanced: "متقدم",
    
    // Platforms
    facebook: "فيسبوك",
    xtwitter: "إكس (تويتر)",
    tiktok: "تيك توك",
    instagram: "إنستغرام",
    youtube: "يوتيوب",
    telegram: "تليغرام"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
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

  const t = (key: string): string => {
    return translations[language as keyof typeof translations][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
