import React, { useState } from 'react';

export type DrillType = 'approach-leak' | 'putting-speed';

interface DrillModalProps {
  drillType: DrillType | null;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const DrillModal: React.FC<DrillModalProps> = ({ drillType, onClose, onToast }) => {
  const [completedReps, setCompletedReps] = useState<number>(0);
  const totalReps = drillType === 'putting-speed' ? 15 : 20;

  if (!drillType) return null;

  const isPutting = drillType === 'putting-speed';

  const handleLogRep = () => {
    if (completedReps < totalReps) {
      const next = completedReps + 1;
      setCompletedReps(next);
      if (next === totalReps) {
        onToast('Drill Completed! Performance index updated ✓');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border-t sm:border border-[#E2DED4] flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isPutting ? 'bg-[#F5E9D3] text-[#7D5700]' : 'bg-[#FFDAD6] text-[#93000A]'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">
                {isPutting ? 'sports_score' : 'warning'}
              </span>
            </div>
            <div>
              <span className="font-label-caps text-[10px] text-[#D9A441] uppercase font-bold">
                {isPutting ? 'PRE-ROUND WARMUP DRILL' : 'STROKE LEAK RANGE DRILL'}
              </span>
              <h3 className="font-title-lg text-lg font-bold text-[#1C1F1C] leading-snug">
                {isPutting
                  ? '15 Putts: 20-to-30ft Speed Control'
                  : '7-Iron Anti-Push & Bunker Elimination'}
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

        {/* Diagnosis / Core Context */}
        <div
          className={`rounded-xl p-3.5 border ${
            isPutting
              ? 'bg-[#F5E9D3]/50 border-[#D9A441]/30'
              : 'bg-[#FFDAD6]/30 border-[#FFDAD6]'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`font-label-caps text-[10px] font-bold ${
                isPutting ? 'text-[#7D5700]' : 'text-[#93000A]'
              }`}
            >
              {isPutting ? 'CALIBRATION PURPOSE' : 'ATHLETIC DIAGNOSIS'}
            </span>
          </div>
          <p className="font-body-md text-xs text-[#1C1F1C] leading-relaxed">
            {isPutting
              ? 'Blessings greens roll at 12.5 Stimpmeter with severe tiers and Ozark grain. Calibrate distance feel from outside 20ft to eliminate three-putts on undulating shelves.'
              : 'Your last 5 rounds show a -1.8 strokes gained leak on 140–170y approach shots, with 4 of 6 right-side misses landing in front greenside bunkers due to an open clubface push.'}
          </p>
        </div>

        {/* Step-by-Step Training Protocol */}
        <div className="space-y-2.5">
          <span className="font-label-caps text-[10px] text-[#6B7268] uppercase block">
            PRACTICE PROTOCOL
          </span>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-[#F9F8F5] rounded-lg border border-[#E2DED4] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                1
              </span>
              <div>
                <strong className="text-[#1C1F1C] block font-semibold">
                  {isPutting ? 'Set Up 3 Distance Gates' : 'Alignment Stick Corridor'}
                </strong>
                <span className="text-[#6B7268]">
                  {isPutting
                    ? 'Place tees at 20ft, 25ft, and 30ft. Create a 3ft collection ring behind the cup.'
                    : 'Lay alignment rod 8 yards right of target to establish an absolute visual boundary.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-[#F9F8F5] rounded-lg border border-[#E2DED4] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                2
              </span>
              <div>
                <strong className="text-[#1C1F1C] block font-semibold">
                  {isPutting ? 'Putt in Sequence of 5' : 'Focus on Left Forearm Rotation'}
                </strong>
                <span className="text-[#6B7268]">
                  {isPutting
                    ? 'Hit 5 balls from each gate. Any ball stopping short of the cup is a reset.'
                    : 'Square clubface early through impact. Target flight must finish left of right rod.'}
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-[#F9F8F5] rounded-lg border border-[#E2DED4] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                3
              </span>
              <div>
                <strong className="text-[#1C1F1C] block font-semibold">
                  {isPutting ? 'Feel the Green Firmness' : 'Transfer to 160y Target Pin'}
                </strong>
                <span className="text-[#6B7268]">
                  {isPutting
                    ? 'Focus on consistent pendulum tempo without wrist deceleration.'
                    : 'Hit 10 consecutive controlled 7-irons within a 15-yard target corridor.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Repetition Tracker */}
        <div className="bg-[#F6F3EC] rounded-xl p-3.5 border border-[#E2DED4] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-micro-caption text-[10px] text-[#6B7268] uppercase">
              Rep Progress
            </span>
            <span className="font-title-lg text-lg font-extrabold text-[#223E26]">
              {completedReps} / {totalReps} Reps
            </span>
          </div>

          <button
            onClick={handleLogRep}
            className="py-2 px-4 rounded-full bg-[#2F5233] hover:bg-[#223E26] text-white font-label-pill text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_task</span>
            Log Rep
          </button>
        </div>

        {/* Dismiss Button */}
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
