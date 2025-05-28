
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAppStore } from '@/store/useAppStore';
import { User, Edit, Check, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { t, isRTL } = useLanguage();
  const { user, updateFullName, balance } = useAppStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.fullName || '');
  const { toast } = useToast();

  // Calculate user level based on balance
  const getUserLevel = (balance: number) => {
    if (balance >= 500) return { level: 3, name: t('levelAdvanced') };
    if (balance >= 200) return { level: 2, name: t('levelIntermediate') };
    return { level: 1, name: t('levelBeginner') };
  };

  const userLevel = getUserLevel(balance);

  const handleSaveName = () => {
    if (editedName.trim()) {
      updateFullName(editedName.trim());
      setIsEditingName(false);
      toast({
        title: t('nameSaved'),
        duration: 2000,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditedName(user?.fullName || '');
    setIsEditingName(false);
  };

  return (
    <div className={`min-h-screen bg-lira-gradient text-white pb-20 px-4 pt-8 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-lira-green bg-clip-text text-transparent">
            {t('profileTitle')}
          </h1>
        </div>

        {/* Profile Photo */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t('telegramPhoto')}
              </h2>
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user?.id ? `https://api.telegram.org/file/bot${user.id}.jpg` : undefined} />
                <AvatarFallback className="bg-lira-green/20 text-lira-green text-2xl">
                  <User className="w-12 h-12" />
                </AvatarFallback>
              </Avatar>
            </div>
          </CardContent>
        </Card>

        {/* Username */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t('username')}
              </h2>
              <div className="bg-lira-darkest/50 rounded-xl p-4">
                <p className="text-lira-green font-mono text-lg">
                  @{user?.username || 'telegram_user'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Level */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t('level')}
              </h2>
              <div className="bg-lira-darkest/50 rounded-xl p-4">
                <div className={`flex items-center justify-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Star className="w-6 h-6 text-lira-green" />
                  <span className="text-xl font-bold text-lira-green">
                    {t('level')} {userLevel.level}
                  </span>
                </div>
                <p className="text-gray-300">
                  {userLevel.name}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Full Name */}
        <Card className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 shadow-card-glow mb-6">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t('fullName')}
              </h2>
              {isEditingName ? (
                <div className="space-y-4">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder={t('fullName')}
                    className="bg-lira-darkest/50 border-lira-green/30 text-white placeholder-gray-400 text-center"
                  />
                  <div className={`flex gap-3 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      onClick={handleSaveName}
                      disabled={!editedName.trim()}
                      className="bg-button-gradient hover:bg-button-gradient text-black font-bold px-6 py-2 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      <Check className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {t('saveName')}
                    </Button>
                    <Button
                      onClick={handleCancelEdit}
                      variant="outline"
                      className="border-gray-500 text-gray-300 hover:bg-gray-500/20 px-6 py-2 rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-lira-darkest/50 rounded-xl p-4">
                    <p className="text-white text-lg">
                      {user?.fullName || user?.firstName || 'Not set'}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsEditingName(true)}
                    className="bg-button-gradient hover:bg-button-gradient text-black font-bold px-6 py-2 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
                  >
                    <Edit className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                    {t('editName')}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
