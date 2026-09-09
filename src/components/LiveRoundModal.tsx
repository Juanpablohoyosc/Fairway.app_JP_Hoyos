import React, { useState } from 'react';
import { HoleTacticalData } from '../types';

interface LiveRoundModalProps {
  isOpen: boolean;
  holes: HoleTacticalData[];
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const LiveRoundModal: React.FC<LiveRoundModalProps> = ({
  isOpen,
  holes,
  onClose,
  onToast,
}) => {
  const [currentHoleIndex, setCurrentHoleIndex] = useState(0);
  const [score, setScore] = useState(4);
  const [putts, setPutts] = useState(2);
  const [fairway, setFairway] = useState<'left' | 'center' | 'right'>('center');
  const [isTrackingShot, setIsTrackingShot] = useState(false);
  const [trackedDistance, setTrackedDistance] = useState(0);

  if (!isOpen) return null;

  const currentHole = holes[currentHoleIndex] || holes[0];

  const handleNextHole = () => {
    if (currentHoleIndex < holes.length - 1) {
      setCurrentHoleIndex(currentHoleIndex + 1);
      setScore(holes[currentHoleIndex + 1]?.par || 4);
      setPutts(2);
      setIsTrackingShot(false);
      setTrackedDistance(0);
      onToast(`Advanced to Hole ${currentHoleIndex + 2}`);
    } else {
      onToast('Round completed! 18 holes logged.');
      onClose();
    }
  };

  const handlePrevHole = () => {
    if (currentHoleIndex > 0) {
      setCurrentHoleIndex(currentHoleIndex - 1);
      setScore(holes[currentHoleIndex - 1]?.par || 4);
      setIsTrackingShot(false);
      setTrackedDistance(0);
    }
  };

  const toggleShotTracker = () => {
    if (!isTrackingShot) {
      setIsTrackingShot(true);
      setTrackedDistance(0);
      // Simulate GPS walk distance accumulating
      const interval = setInterval(() => {
        setTrackedDistance((prev) => {
          if (prev >= 265) {
            clearInterval(interval);
            return 268;
          }
          return prev + 12;
        });
      }, 400);
      onToast('Live Shot Distance Tracker started');
    } else {
      setIsTrackingShot(false);
      onToast(`Shot marked: ${trackedDistance} yards!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh] border-t sm:border border-[#E2DED4]">
        {/* Top Status Banner */}
        <div className="bg-[#223E26] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D9A441] animate-pulse"></span>
            <span className="font-label-caps text-xs text-[#D9A441] uppercase tracking-wider font-bold">
              BLESSINGS GC • LIVE ROUND CADDIE
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Hole Navigation Header */}
        <div className="bg-[#2F5233] text-white px-5 py-3 flex items-center justify-between border-t border-white/10">
          <button
            onClick={handlePrevHole}
            disabled={currentHoleIndex === 0}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>

          <div className="text-center">
            <span className="font-micro-caption text-white/80 uppercase tracking-widest">
              STROKE INDEX {currentHole.strokeIndex}
            </span>
            <h2 className="font-title-lg text-xl font-extrabold text-white">
              Hole {currentHole.holeNumber} • Par {currentHole.par}
            </h2>
            <span className="font-body-md text-xs text-white/80">
              {currentHole.yardage} Yds from Championship Tees
            </span>
          </div>

          <button
            onClick={handleNextHole}
            disabled={currentHoleIndex === holes.length - 1}
            className="p-1 rounded-full hover:bg-white/10 disabled:opacity-30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </div>

        {/* Unified Scrollable Hole Details & Scoring (Matching Cohesive Styling) */}
        <div className="bg-[#F6F3EC] p-4 sm:p-5 overflow-y-auto space-y-3.5 flex-1">
          {/* Card 1: GPS Yardage Numbers Display */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 text-center">
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span className="font-micro-caption text-[10px] text-[#6B7268] uppercase">
                  FRONT
                </span>
                <span className="font-title-lg text-lg font-bold text-[#1C1F1C]">
                  {Math.max(70, currentHole.yardage - 142)}
                </span>
              </div>
              <div className="flex flex-col border-x border-[#E2DED4]/70">
                <span className="font-micro-caption text-[10px] text-[#2F5233] uppercase font-bold">
                  CENTER / PIN
                </span>
                <span className="font-headline-lg text-3xl font-extrabold text-[#223E26] leading-none">
                  {Math.max(85, currentHole.yardage - 130)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-micro-caption text-[10px] text-[#6B7268] uppercase">
                  BACK
                </span>
                <span className="font-title-lg text-lg font-bold text-[#1C1F1C]">
                  {Math.max(98, currentHole.yardage - 118)}
                </span>
              </div>
            </div>
          </div>

          {/* Plays-Like Telemetry Bar */}
          <div className="bg-[#223E26] text-white rounded-xl px-4 py-2.5 flex items-center justify-between text-xs shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D9A441] text-[18px]">air</span>
              <span>Plays Like: <strong>+{currentHole.windOrElevationTag.label}</strong></span>
            </div>
            <span className="font-label-pill bg-[#D9A441] text-[#1C1F1C] px-2.5 py-0.5 rounded-full font-bold">
              {currentHole.chips[0]?.label || '3-Wood Suggested'}
            </span>
          </div>

          {/* Card 2: Tactical Caddie Directive */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-[#D9A441] font-bold">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                lightbulb
              </span>
              <span className="uppercase tracking-wider font-label-caps">CADDIE STRATEGY</span>
            </div>
            <p className="font-body-md text-xs text-[#1C1F1C] leading-relaxed">
              <strong className="text-[#223E26]">{currentHole.tacticalDirectiveTitle}</strong>{' '}
              {currentHole.tacticalAdvice}
            </p>
          </div>

          {/* Card 3: Hole Scoring & Stats (Matching Card Styling) */}
          <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 space-y-3.5">
            {/* Score Input Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
                  HOLE {currentHole.holeNumber} SCORE
                </span>
                <span className="font-title-lg text-lg font-extrabold text-[#1C1F1C] block">
                  {score} {score === currentHole.par ? '(Par)' : score < currentHole.par ? `(${score - currentHole.par} Under)` : `(+${score - currentHole.par})`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScore(Math.max(1, score - 1))}
                  className="w-9 h-9 rounded-full bg-[#F6F3EC] border border-[#E2DED4] font-bold text-lg flex items-center justify-center hover:bg-[#E5E2DB] cursor-pointer transition-colors active:scale-95"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-base">{score}</span>
                <button
                  onClick={() => setScore(score + 1)}
                  className="w-9 h-9 rounded-full bg-[#F6F3EC] border border-[#E2DED4] font-bold text-lg flex items-center justify-center hover:bg-[#E5E2DB] cursor-pointer transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Putts Stepper */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E2DED4]/50">
              <div>
                <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
                  PUTTS
                </span>
                <span className="font-title-lg text-sm font-bold text-[#1C1F1C] block">
                  {putts} Putts
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPutts(Math.max(0, putts - 1))}
                  className="w-8 h-8 rounded-full bg-[#F6F3EC] border border-[#E2DED4] font-bold text-base flex items-center justify-center hover:bg-[#E5E2DB] cursor-pointer transition-colors active:scale-95"
                >
                  -
                </button>
                <span className="w-5 text-center font-bold text-sm">{putts}</span>
                <button
                  onClick={() => setPutts(putts + 1)}
                  className="w-8 h-8 rounded-full bg-[#F6F3EC] border border-[#E2DED4] font-bold text-base flex items-center justify-center hover:bg-[#E5E2DB] cursor-pointer transition-colors active:scale-95"
                >
                  +
                </button>
              </div>
            </div>

            {/* Fairway Accuracy Selector */}
            {currentHole.par > 3 && (
              <div className="pt-2 border-t border-[#E2DED4]/50 space-y-1.5">
                <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold block">
                  FAIRWAY HIT
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {(['left', 'center', 'right'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setFairway(dir)}
                      className={`py-1.5 rounded-lg font-label-pill capitalize transition-all cursor-pointer ${
                        fairway === dir
                          ? 'bg-[#2F5233] text-white font-bold shadow-sm'
                          : 'bg-[#F6F3EC] text-[#6B7268] border border-[#E2DED4]/60 hover:text-[#1C1F1C]'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Card 4: Shot Distance Tracer */}
          <div className="bg-white rounded-xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex items-center justify-between">
            <div>
              <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold">
                GPS SHOT MEASURER
              </span>
              <div className="font-title-md text-xs font-bold text-[#1C1F1C]">
                {isTrackingShot
                  ? `Tracking... ${trackedDistance} yds`
                  : 'Measure Last Shot Distance'}
              </div>
            </div>
            <button
              onClick={toggleShotTracker}
              className={`py-1.5 px-3 rounded-full font-label-pill text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isTrackingShot
                  ? 'bg-[#D9A441] text-[#1C1F1C] animate-pulse'
                  : 'bg-[#2F5233] text-white hover:bg-[#223E26]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isTrackingShot ? 'stop_circle' : 'play_circle'}
              </span>
              {isTrackingShot ? 'End Shot' : 'Start Shot'}
            </button>
          </div>
        </div>

        {/* Save & Advance Footer (Seamless matching container) */}
        <div className="p-4 bg-[#F6F3EC] border-t border-[#E2DED4]/80 flex items-center gap-3">
          <button
            onClick={handleNextHole}
            className="flex-1 py-3 rounded-full bg-[#2F5233] hover:bg-[#223E26] text-white font-label-pill text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Save &amp; Go To Hole {currentHoleIndex < holes.length - 1 ? currentHoleIndex + 2 : 18}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
