import React from 'react';
import { ClubDispersionItem } from '../types';

interface ClubModalProps {
  club: ClubDispersionItem | null;
  onClose: () => void;
  onOpenDrill: () => void;
}

export const ClubModal: React.FC<ClubModalProps> = ({ club, onClose, onOpenDrill }) => {
  if (!club) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-[#E2DED4] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-10 h-10 rounded-lg font-label-pill text-sm flex items-center justify-center font-bold ${
                club.code === 'DR'
                  ? 'bg-[#223E26] text-white'
                  : club.isLeak
                  ? 'bg-[#D9A441] text-[#1C1F1C]'
                  : 'bg-[#F1EEE7] text-[#1C1F1C]'
              }`}
            >
              {club.code}
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
                  BAG TRAJECTORY PROFILE
                </span>
                {club.isLeak && (
                  <span className="font-micro-caption bg-[#FFDAD6] text-[#93000A] px-1.5 py-0.5 rounded-full font-bold">
                    Stroke Leak
                  </span>
                )}
              </div>
              <h3 className="font-title-lg text-lg font-bold text-[#1C1F1C]">
                {club.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F6F3EC] text-[#6B7268] hover:text-[#1C1F1C] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Distance Metrics */}
        <div className="bg-[#223E26] text-white rounded-xl p-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white/10 rounded-lg p-2.5">
              <span className="font-micro-caption text-white/70 uppercase block">
                Avg Carry
              </span>
              <span className="font-headline-md text-2xl font-extrabold text-white">
                {club.carry} <span className="text-xs text-[#D9A441] font-normal">yds</span>
              </span>
            </div>
            <div className="bg-white/10 rounded-lg p-2.5">
              <span className="font-micro-caption text-white/70 uppercase block">
                Avg Total
              </span>
              <span className="font-headline-md text-2xl font-extrabold text-white">
                {club.total} <span className="text-xs text-[#D9A441] font-normal">yds</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/90 px-1">
            <span>Rollout: ~{club.total - club.carry} yards</span>
            <span className="font-bold text-[#D9A441]">{club.bias}</span>
          </div>
        </div>

        {/* Dispersion Ellipse Visualization */}
        <div className="bg-[#F9F8F5] rounded-xl p-3 border border-[#E2DED4] space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
              SHOT DISPERSION PATTERN
            </span>
            <span className="font-micro-caption text-[#6B7268]">Last 25 Logged Shots</span>
          </div>

          {/* Graphical Target Dispersion Box */}
          <div className="w-full h-32 bg-white rounded-lg border border-[#E2DED4] relative flex items-center justify-center overflow-hidden">
            {/* Target lines */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-[#E2DED4]"></div>
            <div className="absolute inset-y-0 left-1/2 w-px bg-[#E2DED4]"></div>
            <div className="w-16 h-16 rounded-full border border-dashed border-[#2F5233]/40 absolute"></div>

            {/* Simulated Shot Cluster */}
            {club.isLeak ? (
              <>
                <div className="w-3 h-3 rounded-full bg-[#D9A441] absolute top-[44%] right-[32%] ring-2 ring-[#F5E9D3] shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#D9A441]/80 absolute top-[38%] right-[28%]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#D9A441]/80 absolute top-[52%] right-[25%]"></div>
                <div className="w-2 h-2 rounded-full bg-[#D9A441]/70 absolute top-[40%] right-[35%]"></div>
                <div className="w-2 h-2 rounded-full bg-[#2F5233]/80 absolute top-[50%] left-[49%]"></div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 rounded-full bg-[#2F5233] absolute top-[48%] left-[49%] ring-2 ring-[#C4EDC3] shadow-sm"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2F5233]/70 absolute top-[45%] left-[53%]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#2F5233]/70 absolute top-[52%] left-[46%]"></div>
                <div className="w-2 h-2 rounded-full bg-[#2F5233]/60 absolute top-[43%] left-[48%]"></div>
              </>
            )}
            <span className="absolute bottom-1 right-2 font-micro-caption text-[8px] text-[#6B7268]">
              Target Pin (Center)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-[#6B7268] pt-1">
            <span>Consistency: <strong>{club.statLabel}</strong></span>
            {club.isLeak && (
              <button
                onClick={() => {
                  onClose();
                  onOpenDrill();
                }}
                className="text-[#D9A441] hover:underline font-bold text-xs cursor-pointer flex items-center gap-1"
              >
                <span>Drill to fix right push</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full bg-[#F6F3EC] hover:bg-[#E5E2DB] text-[#1C1F1C] font-label-pill text-xs font-semibold cursor-pointer transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
