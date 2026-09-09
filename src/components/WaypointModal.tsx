import React, { useState } from 'react';
import { WaypointMarker } from '../types';

interface WaypointModalProps {
  waypoint: WaypointMarker | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const WaypointModal: React.FC<WaypointModalProps> = ({
  waypoint,
  onClose,
  onToast,
}) => {
  const [isDialed, setIsDialed] = useState(false);

  if (!waypoint) return null;

  const handleCopyGps = () => {
    navigator.clipboard?.writeText(waypoint.gps);
    onToast(`GPS coordinates copied: ${waypoint.gps}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-[#E2DED4] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#2F5233]">
              <span className="material-symbols-outlined text-[22px]">pin_drop</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-label-caps text-[10px] text-[#2F5233] uppercase font-bold">
                  HOLE {waypoint.hole} WAYPOINT
                </span>
                <span className="font-micro-caption bg-[#C4EDC3] text-[#05210C] px-1.5 py-0.5 rounded-full font-bold">
                  GPS Cached
                </span>
              </div>
              <h3 className="font-title-lg text-lg font-bold text-[#1C1F1C] leading-snug">
                {waypoint.name}
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

        {/* Tactical Elevation & Distance Tile */}
        <div className="bg-[#223E26] text-white rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-micro-caption text-white/70 uppercase">Tee to Waypoint</span>
              <div className="font-headline-md text-2xl font-extrabold text-white">
                {waypoint.yardage} <span className="text-sm font-normal text-[#D9A441]">yards</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-micro-caption text-white/70 uppercase">Approach In</span>
              <div className="font-headline-md text-2xl font-extrabold text-white">
                {Math.max(105, 410 - waypoint.yardage)}{' '}
                <span className="text-sm font-normal text-white/70">yards</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-2.5 flex items-center justify-between text-xs text-white/90">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D9A441] text-[16px]">air</span>
              <span>{waypoint.subtitle}</span>
            </div>
            <span className="font-bold text-[#C4EDC3]">True Line</span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/80 border-t border-white/10 pt-2 font-mono">
            <span>{waypoint.gps}</span>
            <button
              onClick={handleCopyGps}
              className="text-[#D9A441] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">content_copy</span>
              Copy
            </button>
          </div>
        </div>

        {/* Hazard Safety Guidance */}
        <div className="bg-[#F9F8F5] rounded-xl p-3.5 border border-[#E2DED4] space-y-2">
          <span className="font-label-caps text-[10px] text-[#6B7268] uppercase block">
            TARGET TACTICS & MISS ZONES
          </span>
          <p className="font-body-md text-xs text-[#1C1F1C] leading-relaxed">
            Landing at this specific crest neutralizes the eucalyptus branches pinching the left side. Leaves a level lie with clean wind-shielding into the elevated back tier.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="font-micro-caption bg-white px-2 py-1 rounded-full text-[#2F5233] border border-[#E2DED4] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F5233]"></span>
              Safe Miss: 8y Right
            </span>
            <span className="font-micro-caption bg-[#FFDAD6] text-[#93000A] px-2 py-1 rounded-full font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span>
              Dead: Left Canyon
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => {
              setIsDialed(!isDialed);
              onToast(isDialed ? 'Waypoint reset' : 'Waypoint marked as Dialed Target ✓');
            }}
            className={`py-2.5 px-3 rounded-full font-label-pill text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              isDialed
                ? 'bg-[#C4EDC3] text-[#05210C]'
                : 'bg-[#2F5233] hover:bg-[#223E26] text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isDialed ? 'task_alt' : 'verified'}
            </span>
            {isDialed ? 'Dialed Target' : 'Mark as Dialed'}
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-3 rounded-full bg-[#F6F3EC] hover:bg-[#E5E2DB] text-[#1C1F1C] font-label-pill text-xs font-semibold cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
