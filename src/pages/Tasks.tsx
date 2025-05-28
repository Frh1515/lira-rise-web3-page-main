
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/useAppStore';
import { useLanguage } from '@/contexts/LanguageContext';
import { Facebook, MessageCircle, Music, Instagram, Youtube, Send } from 'lucide-react';

const Tasks = () => {
  const { t, isRTL } = useLanguage();
  const { 
    tasks, 
    balance, 
    completingTasks, 
    completeTask, 
    setCompletingTask, 
    addBalance, 
    initializeTasks,
    claimableRewards,
    setClaimableReward,
    clearClaimableReward
  } = useAppStore();
  const [countdowns, setCountdowns] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  const getPlatformLink = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return 'https://www.facebook.com/profile.php?id=61575500415354';
      case 'X/Twitter':
        return 'https://x.com/CoinLyra90781';
      case 'TikTok':
        return 'https://www.tiktok.com/@lyracoin';
      case 'Instagram':
        return 'https://www.instagram.com/lyracoin950/';
      case 'YouTube':
        return 'https://www.youtube.com/channel/UCfxBlnbBd9D37Oue5JpK-Rg';
      case 'Telegram':
        return 'https://t.me/LYRACOIN25';
      default:
        return '#';
    }
  };

  const handleCompleteTask = (taskId: string, platform: string) => {
    // Open platform link in new tab
    const link = getPlatformLink(platform);
    window.open(link, '_blank');
    
    // Start verification process
    setCompletingTask(taskId, true);
    setCountdowns(prev => ({ ...prev, [taskId]: 30 }));
    
    // Start countdown
    const interval = setInterval(() => {
      setCountdowns(prev => {
        const newCountdown = prev[taskId] - 1;
        if (newCountdown <= 0) {
          clearInterval(interval);
          setCompletingTask(taskId, false);
          setClaimableReward(taskId);
          return { ...prev, [taskId]: 0 };
        }
        return { ...prev, [taskId]: newCountdown };
      });
    }, 1000);
  };

  const handleClaimReward = (taskId: string, reward: number) => {
    completeTask(taskId);
    addBalance(reward);
    clearClaimableReward(taskId);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return <Facebook className="w-6 h-6 text-blue-500" />;
      case 'X/Twitter':
        return <div className="w-6 h-6 text-white font-bold text-lg flex items-center justify-center">𝕏</div>;
      case 'TikTok':
        return <Music className="w-6 h-6 text-pink-500" />;
      case 'Instagram':
        return <Instagram className="w-6 h-6 text-pink-500" />;
      case 'YouTube':
        return <Youtube className="w-6 h-6 text-red-500" />;
      case 'Telegram':
        return <Send className="w-6 h-6 text-blue-400" />;
      default:
        return <MessageCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook':
        return 'border-blue-500/30 bg-blue-500/10';
      case 'X/Twitter':
        return 'border-gray-500/30 bg-gray-500/10';
      case 'TikTok':
        return 'border-pink-500/30 bg-pink-500/10';
      case 'Instagram':
        return 'border-pink-500/30 bg-pink-500/10';
      case 'YouTube':
        return 'border-red-500/30 bg-red-500/10';
      case 'Telegram':
        return 'border-blue-400/30 bg-blue-400/10';
      default:
        return 'border-lira-green/30 bg-lira-green/10';
    }
  };

  return (
    <div className={`min-h-screen bg-lira-gradient text-white pb-20 px-4 pt-8 ${isRTL ? 'font-arabic' : ''}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-lira-green bg-clip-text text-transparent">
            {t('tasksTitle')}
          </h1>
          <p className="text-gray-300 text-base">
            {t('tasksSubtitle')}
          </p>
        </div>

        {/* Balance Display */}
        <div className="bg-card-gradient backdrop-blur-sm border border-lira-green/20 rounded-2xl p-4 mb-6 text-center shadow-card-glow">
          <p className="text-sm text-gray-300 mb-1">{t('yourBalance')}</p>
          <p className="text-2xl font-bold text-lira-green">{balance} {t('minutes')}</p>
        </div>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {tasks.map((task) => {
            const isCompleting = completingTasks.includes(task.id);
            const isClaimable = claimableRewards.includes(task.id);
            const countdown = countdowns[task.id] || 0;
            
            return (
              <Card 
                key={task.id} 
                className={`bg-card-gradient backdrop-blur-sm border shadow-card-glow hover:shadow-glow transition-all duration-300 ${getPlatformColor(task.platform)}`}
              >
                <CardContent className="p-4">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 flex-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="flex-shrink-0">
                        {getPlatformIcon(task.platform)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white text-sm">
                          {t(task.platform.toLowerCase().replace('/', '').replace(' ', ''))}
                        </h3>
                        <p className="text-gray-300 text-xs mb-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-lira-green font-bold text-sm">
                            +{task.reward} {t('minutes')}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex-shrink-0 ${isRTL ? 'mr-3' : 'ml-3'}`}>
                      {task.completed ? (
                        <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                          <span className="text-green-400 text-xs font-medium">✅ {t('completed')}</span>
                        </div>
                      ) : isClaimable ? (
                        <Button
                          size="sm"
                          onClick={() => handleClaimReward(task.id, task.reward)}
                          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xs px-3 py-1 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300"
                        >
                          ✅ {t('claimReward')}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled={isCompleting}
                          onClick={() => handleCompleteTask(task.id, task.platform)}
                          className="bg-button-gradient hover:bg-button-gradient text-black font-bold text-xs px-3 py-1 rounded-full shadow-glow hover:shadow-glow-lg transition-all duration-300 disabled:opacity-50"
                        >
                          {isCompleting ? `⏳ ${t('processing')} ${countdown}s` : t('completeTask')}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
