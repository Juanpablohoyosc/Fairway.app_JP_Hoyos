import React from 'react';
import { USER_PROFILE } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onOpenProfile }) => {
  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'round-prep':
        return 'Round Prep';
      case 'performance':
        return 'Performance';
      case 'recaps':
        return 'Round Recaps';
      default:
        return 'Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#F6F3EC]/90 backdrop-blur-xl border-b border-[#E2DED4]/60 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="h-16 px-4 sm:px-6 max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="Fairway Pin Flag Monogram"
            className="h-8 w-auto object-contain shrink-0"
            src={USER_PROFILE.logoUrl}
          />
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-caps text-[11px] uppercase tracking-wider text-[#223E26] font-bold">
                FAIRWAY
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9A441] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9A441]"></span>
              </span>
            </div>
            <h1 className="font-title-lg text-[18px] text-[#1C1F1C] truncate leading-none font-bold">
              {getTitle()}
            </h1>
          </div>
        </div>

        {/* Right: Handicap Pill & Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-end cursor-pointer group text-right focus:outline-none"
            title="View Handicap Details"
          >
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              INDEX
            </span>
            <span className="font-label-pill text-[11px] bg-[#223E26] text-white px-2 py-0.5 rounded-full leading-none font-semibold group-hover:bg-[#2F5233] transition-colors">
              {USER_PROFILE.handicap}
            </span>
          </button>
          <button
            onClick={onOpenProfile}
            className="w-8 h-8 rounded-full ring-2 ring-[#E2DED4] overflow-hidden flex items-center justify-center shrink-0 cursor-pointer hover:ring-[#2F5233] transition-all"
            title="Profile"
          >
            <img
              alt={USER_PROFILE.name}
              className="w-8 h-8 rounded-full object-cover"
              src={USER_PROFILE.avatarUrl}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
