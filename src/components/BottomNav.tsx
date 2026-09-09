import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'home', label: 'Home', icon: 'cottage' },
    { id: 'round-prep', label: 'Round Prep', icon: 'menu_book' },
    { id: 'performance', label: 'Performance', icon: 'analytics' },
    { id: 'recaps', label: 'Recaps', icon: 'emoji_events' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#F6F3EC]/90 backdrop-blur-xl border-t border-[#E2DED4]/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] gap-1 transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#2F5233] font-bold'
                  : 'text-[#6B7268] hover:text-[#223E26]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform ${
                  isActive ? 'scale-110 font-variation-settings-fill' : ''
                }`}
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              <span className="font-micro-caption text-[9px] tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
