import React from 'react';
import { USER_PROFILE } from '../data/mockData';

interface HandicapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandicapModal: React.FC<HandicapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-[#E2DED4] flex flex-col gap-4">
        {/* Header with Avatar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt={USER_PROFILE.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#2F5233]"
              src={USER_PROFILE.avatarUrl}
            />
            <div>
              <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
                USGA / WHS MEMBER
              </span>
              <h3 className="font-title-lg text-lg font-bold text-[#1C1F1C]">
                {USER_PROFILE.name}
              </h3>
              <span className="font-body-md text-xs text-[#6B7268]">
                Blessings Golf Club • Fayetteville, AR
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F6F3EC] text-[#6B7268] hover:text-[#1C1F1C] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Handicap Index Hero Tile */}
        <div className="bg-[#223E26] text-white rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-micro-caption text-white/70 uppercase tracking-wider">
                CURRENT REVISION INDEX
              </span>
              <div className="font-display-hero-mobile text-3xl font-extrabold text-white">
                14.8 <span className="text-sm font-normal text-[#D9A441]">HCP</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-micro-caption text-white/70 uppercase tracking-wider">
                LOW INDEX (365D)
              </span>
              <div className="font-headline-md text-xl font-bold text-[#C4EDC3]">
                13.9
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs text-white/90">
            <span>30-Day Moving Trajectory:</span>
            <span className="font-bold text-[#C4EDC3] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_down</span>
              -0.4 Improvement
            </span>
          </div>
        </div>

        {/* Course Handicap Calculator Preview */}
        <div className="bg-[#F9F8F5] rounded-xl p-3.5 border border-[#E2DED4] space-y-2 text-xs">
          <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold block">
            COURSE PLAYING HANDICAPS TODAY
          </span>
          <div className="flex justify-between items-center py-1 border-b border-[#E2DED4]">
            <span className="font-medium text-[#1C1F1C]">Blessings GC (Member Tees 74.8/146)</span>
            <span className="font-bold text-[#223E26] text-sm">19 Strokes</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-[#E2DED4]">
            <span className="font-medium text-[#1C1F1C]">Pasatiempo (Blue Tees 72.8/139)</span>
            <span className="font-bold text-[#223E26] text-sm">18 Strokes</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="font-medium text-[#1C1F1C]">TPC Harding Park (74.0/141)</span>
            <span className="font-bold text-[#223E26] text-sm">19 Strokes</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#F6F3EC] hover:bg-[#E5E2DB] text-[#1C1F1C] font-label-pill text-xs font-semibold cursor-pointer transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
