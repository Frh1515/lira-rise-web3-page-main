
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CheckSquare, BarChart3, Share, User } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { id: 'prices', label: 'Prices', icon: BarChart3, path: '/prices' },
    { id: 'referrals', label: 'Referrals', icon: Share, path: '/referrals' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-lira-darkest/90 backdrop-blur-sm border-t border-lira-green/20 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon, path }) => (
          <button
            key={id}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
              isActive(path)
                ? 'text-lira-green shadow-glow'
                : 'text-gray-400 hover:text-lira-green/80'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
