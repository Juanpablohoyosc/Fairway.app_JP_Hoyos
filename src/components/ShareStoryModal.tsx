import React from 'react';
import { RoundRecapItem } from '../types';

interface ShareStoryModalProps {
  isOpen: boolean;
  recap: RoundRecapItem | null;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export const ShareStoryModal: React.FC<ShareStoryModalProps> = ({
  isOpen,
  recap,
  onClose,
  onTriggerToast,
}) => {
  if (!isOpen || !recap) return null;

  const handleAction = (actionType: string) => {
    onClose();
    if (actionType === 'copy') {
      onTriggerToast('Story Card image copied to clipboard!');
    } else if (actionType === 'insta') {
      onTriggerToast('Story Card formatted & ready for Instagram!');
    } else {
      onTriggerToast('Story link prepared for iMessage!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/60 backdrop-blur-sm flex items-end justify-center p-0 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-2xl p-5 flex flex-col gap-4 shadow-2xl border-t border-[#E2DED4] animate-slideUp">
        {/* Drag handle pill */}
        <div className="w-12 h-1 bg-[#E2DED4] rounded-full mx-auto"></div>

        {/* Modal Title Row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-[#D9A441] uppercase tracking-wider">
              Export Round Story
            </span>
            <h3 className="font-title-lg text-lg text-[#1C1F1C] font-bold">
              {recap.courseName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#6B7268] hover:text-[#1C1F1C] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Story Preview Graphic Simulation */}
        <div className="w-full bg-[#223E26] text-white rounded-xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-inner text-center border border-white/10">
          {/* Subtle course watermark background graphic */}
          <svg
            className="absolute -right-6 -bottom-10 w-44 h-44 text-white opacity-10 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" strokeWidth="1.2" />
            <circle cx="50" cy="50" r="32" strokeWidth="1" />
            <path d="M50 20 V80 M50 24 L72 34 L50 44 Z" fill="currentColor" opacity="0.4" />
          </svg>

          <span className="font-label-caps text-[10px] text-[#D9A441] tracking-widest uppercase">
            FAIRWAY ARCHIVE CARD
          </span>
          <h4 className="font-headline-md text-3xl font-extrabold text-white mt-1.5">
            {recap.score} ({recap.toPar})
          </h4>
          <p className="font-body-md text-xs text-[#F9F8F5]/90 max-w-xs mt-1">
            {recap.highlightDesc}
          </p>
          <span className="font-micro-caption text-[9px] text-[#E5E2DB]/70 mt-3 uppercase tracking-wider">
            {recap.date} • JUAN PABLO (14.8 HCP)
          </span>
        </div>

        {/* Quick Export Actions Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => handleAction('copy')}
            className="flex flex-col items-center justify-center p-3 bg-[#F6F3EC] hover:bg-[#F1EEE7] active:scale-95 rounded-xl gap-1.5 text-[#1C1F1C] transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#223E26] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">content_copy</span>
            </div>
            <span className="font-label-pill text-xs font-semibold">Copy Image</span>
          </button>
          <button
            onClick={() => handleAction('insta')}
            className="flex flex-col items-center justify-center p-3 bg-[#F6F3EC] hover:bg-[#F1EEE7] active:scale-95 rounded-xl gap-1.5 text-[#1C1F1C] transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#D9A441] text-[#1C1F1C] flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <span className="font-label-pill text-xs font-semibold">Instagram</span>
          </button>
          <button
            onClick={() => handleAction('msg')}
            className="flex flex-col items-center justify-center p-3 bg-[#F6F3EC] hover:bg-[#F1EEE7] active:scale-95 rounded-xl gap-1.5 text-[#1C1F1C] transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#2F5233] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </div>
            <span className="font-label-pill text-xs font-semibold">Message</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#F6F3EC] hover:bg-[#E5E2DB] text-[#1C1F1C] font-label-pill text-xs font-semibold cursor-pointer transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
