import React, { useState } from 'react';
import { RoundRecapItem } from '../types';

interface ScorecardModalProps {
  recap: RoundRecapItem | null;
  onClose: () => void;
  onShare: (recap: RoundRecapItem) => void;
}

export const ScorecardModal: React.FC<ScorecardModalProps> = ({ recap, onClose, onShare }) => {
  const [activeView, setActiveView] = useState<'table' | 'trail'>('table');

  if (!recap) return null;

  const defaultPars = recap.holePars || [4, 4, 3, 4, 3, 5, 4, 4, 4, 4, 3, 4, 5, 4, 3, 5, 4, 5];
  const defaultScores = recap.holeScores || [3, 4, 4, 5, 3, 4, 5, 6, 5, 4, 4, 4, 3, 5, 3, 4, 5, 6];
  const yards = [382, 415, 168, 520, 395, 185, 370, 430, 360, 515, 395, 410, 155, 380, 195, 425, 390, 545];

  const frontScores = defaultScores.slice(0, 9);
  const frontPars = defaultPars.slice(0, 9);
  const frontYards = yards.slice(0, 9);
  const frontScoreSum = frontScores.reduce((a, b) => a + b, 0);
  const frontParSum = frontPars.reduce((a, b) => a + b, 0);
  const frontYardSum = frontYards.reduce((a, b) => a + b, 0);

  const backScores = defaultScores.slice(9, 18);
  const backPars = defaultPars.slice(9, 18);
  const backYards = yards.slice(9, 18);
  const backScoreSum = backScores.reduce((a, b) => a + b, 0);
  const backParSum = backPars.reduce((a, b) => a + b, 0);
  const backYardSum = backYards.reduce((a, b) => a + b, 0);

  const getScoreStyle = (score: number, par: number) => {
    const diff = score - par;
    if (diff <= -2) {
      return 'bg-[#D9A441] text-[#1C1F1C] font-extrabold ring-2 ring-[#F5E9D3]'; // Eagle
    }
    if (diff === -1) {
      return 'bg-[#D9A441] text-[#1C1F1C] font-bold'; // Birdie
    }
    if (diff === 0) {
      return 'bg-white/80 text-[#1C1F1C] font-semibold border border-[#E2DED4]'; // Par
    }
    if (diff === 1) {
      return 'bg-[#E5E2DB] text-[#424841] font-medium'; // Bogey
    }
    return 'bg-[#FFDAD6] text-[#93000A] font-bold'; // Double or worse
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1F1C]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#223E26] text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-[11px] text-[#D9A441] uppercase tracking-wider">
                Official Scorecard
              </span>
              <span className="text-white/40">•</span>
              <span className="font-micro-caption text-white/80">{recap.date}</span>
            </div>
            <h3 className="font-title-lg text-xl font-bold text-white mt-0.5">
              {recap.courseName}
            </h3>
            <p className="font-body-md text-xs text-white/80 mt-0.5">
              {recap.courseDetails} • {recap.subLocation}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors relative z-10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* View Switcher: Table vs Shot Trail */}
        <div className="px-4 pt-3 pb-2 bg-[#F6F3EC] flex items-center justify-between border-b border-[#E2DED4]">
          <div className="flex bg-[#E5E2DB] p-1 rounded-full">
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-1 rounded-full font-label-pill text-xs transition-all cursor-pointer ${
                activeView === 'table'
                  ? 'bg-[#2F5233] text-white shadow-sm'
                  : 'text-[#6B7268] hover:text-[#1C1F1C]'
              }`}
            >
              18-Hole Table
            </button>
            <button
              onClick={() => setActiveView('trail')}
              className={`px-4 py-1 rounded-full font-label-pill text-xs transition-all cursor-pointer flex items-center gap-1 ${
                activeView === 'trail'
                  ? 'bg-[#2F5233] text-white shadow-sm'
                  : 'text-[#6B7268] hover:text-[#1C1F1C]'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">timeline</span>
              GPS Shot Trail
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#223E26]">
                {recap.score}
              </span>
              <span className="font-label-pill text-xs font-bold text-[#D9A441]">
                {recap.toPar}
              </span>
            </div>
            <span className="font-micro-caption bg-white px-2 py-1 rounded-full text-[#6B7268] border border-[#E2DED4]">
              {recap.netScore}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {activeView === 'table' ? (
            <>
              {/* Front 9 */}
              <div className="bg-[#F9F8F5] rounded-xl p-3 border border-[#E2DED4] overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-[#223E26] font-bold">
                    FRONT NINE (OUT)
                  </span>
                  <span className="font-metric-stat text-xs text-[#6B7268]">
                    Par {frontParSum} • {frontYardSum} Yds • Score: <strong>{frontScoreSum}</strong>
                  </span>
                </div>
                <table className="w-full text-center font-body-md text-xs border-collapse min-w-[340px]">
                  <thead>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]">
                      <th className="py-1 px-1 text-left font-semibold">HOLE</th>
                      {frontScores.map((_, i) => (
                        <th key={i} className="py-1 px-1 font-semibold">{i + 1}</th>
                      ))}
                      <th className="py-1 px-1 font-bold text-[#223E26]">OUT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]/60">
                      <td className="py-1 px-1 text-left text-[10px]">Yards</td>
                      {frontYards.map((y, i) => (
                        <td key={i} className="py-1 px-1 text-[10px]">{y}</td>
                      ))}
                      <td className="py-1 px-1 text-[10px] font-bold">{frontYardSum}</td>
                    </tr>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]/60">
                      <td className="py-1 px-1 text-left font-semibold">Par</td>
                      {frontPars.map((p, i) => (
                        <td key={i} className="py-1 px-1 font-semibold">{p}</td>
                      ))}
                      <td className="py-1 px-1 font-bold">{frontParSum}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-1 text-left font-bold text-[#1C1F1C]">Score</td>
                      {frontScores.map((s, i) => (
                        <td key={i} className="py-1.5 px-1">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${getScoreStyle(
                              s,
                              frontPars[i]
                            )}`}
                          >
                            {s}
                          </span>
                        </td>
                      ))}
                      <td className="py-1.5 px-1 font-extrabold text-[#223E26] text-sm">
                        {frontScoreSum}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Back 9 */}
              <div className="bg-[#F9F8F5] rounded-xl p-3 border border-[#E2DED4] overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-caps text-xs text-[#223E26] font-bold">
                    BACK NINE (IN)
                  </span>
                  <span className="font-metric-stat text-xs text-[#6B7268]">
                    Par {backParSum} • {backYardSum} Yds • Score: <strong>{backScoreSum}</strong>
                  </span>
                </div>
                <table className="w-full text-center font-body-md text-xs border-collapse min-w-[340px]">
                  <thead>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]">
                      <th className="py-1 px-1 text-left font-semibold">HOLE</th>
                      {backScores.map((_, i) => (
                        <th key={i} className="py-1 px-1 font-semibold">{i + 10}</th>
                      ))}
                      <th className="py-1 px-1 font-bold text-[#223E26]">IN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]/60">
                      <td className="py-1 px-1 text-left text-[10px]">Yards</td>
                      {backYards.map((y, i) => (
                        <td key={i} className="py-1 px-1 text-[10px]">{y}</td>
                      ))}
                      <td className="py-1 px-1 text-[10px] font-bold">{backYardSum}</td>
                    </tr>
                    <tr className="text-[#6B7268] border-b border-[#E2DED4]/60">
                      <td className="py-1 px-1 text-left font-semibold">Par</td>
                      {backPars.map((p, i) => (
                        <td key={i} className="py-1 px-1 font-semibold">{p}</td>
                      ))}
                      <td className="py-1 px-1 font-bold">{backParSum}</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-1 text-left font-bold text-[#1C1F1C]">Score</td>
                      {backScores.map((s, i) => (
                        <td key={i} className="py-1.5 px-1">
                          <span
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${getScoreStyle(
                              s,
                              backPars[i]
                            )}`}
                          >
                            {s}
                          </span>
                        </td>
                      ))}
                      <td className="py-1.5 px-1 font-extrabold text-[#223E26] text-sm">
                        {backScoreSum}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Scoring Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#6B7268] pt-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#D9A441] ring-1 ring-[#F5E9D3] inline-block"></span>
                  <span>Eagle (-2)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#D9A441] inline-block"></span>
                  <span>Birdie (-1)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-white border border-[#E2DED4] inline-block"></span>
                  <span>Par (E)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#E5E2DB] inline-block"></span>
                  <span>Bogey (+1)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-[#FFDAD6] inline-block"></span>
                  <span>Double+ (+2)</span>
                </div>
              </div>
            </>
          ) : (
            /* GPS Shot Trail Visualizer */
            <div className="space-y-3">
              <div className="bg-[#223E26] text-white rounded-xl p-4 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-label-caps text-[10px] text-[#D9A441]">
                      HOLE #13 PAR 5 • EAGLE SHOT TRAIL
                    </span>
                    <h4 className="font-title-lg text-lg text-white font-bold">
                      485 Yds • 3 Strokes To Cup
                    </h4>
                  </div>
                  <span className="font-label-pill text-xs bg-[#D9A441] text-[#1C1F1C] px-2.5 py-1 rounded-full font-bold">
                    -2 Eagle
                  </span>
                </div>

                {/* SVG Visual Trajectory Graphic */}
                <div className="w-full h-44 bg-[#183B1E] rounded-lg p-2 relative flex flex-col justify-between border border-white/10">
                  <svg className="w-full h-full" viewBox="0 0 400 140" fill="none">
                    {/* Fairway fairway contour */}
                    <path
                      d="M 20,70 Q 150,40 260,60 T 360,65"
                      stroke="#2F5233"
                      strokeWidth="32"
                      strokeLinecap="round"
                    />
                    {/* Shot 1: Tee Drive */}
                    <path
                      d="M 20,70 Q 120,20 220,55"
                      stroke="#D9A441"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <circle cx="20" cy="70" r="4" fill="#FFFFFF" />
                    <circle cx="220" cy="55" r="4" fill="#D9A441" />
                    <text x="100" y="32" fill="#F5E9D3" fontSize="10" fontWeight="bold">
                      Shot 1: 294y Drive
                    </text>

                    {/* Shot 2: 3-Wood to Green */}
                    <path
                      d="M 220,55 Q 290,35 345,62"
                      stroke="#D9A441"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                    />
                    <circle cx="345" cy="62" r="4" fill="#D9A441" />
                    <text x="260" y="38" fill="#F5E9D3" fontSize="10" fontWeight="bold">
                      Shot 2: 178y to 13ft
                    </text>

                    {/* Shot 3: Eagle Putt */}
                    <line
                      x1="345"
                      y1="62"
                      x2="355"
                      y2="64"
                      stroke="#C4EDC3"
                      strokeWidth="2"
                    />
                    <circle cx="355" cy="64" r="3" fill="#FFFFFF" />

                    {/* Pin Flag */}
                    <path d="M 355,50 V 64" stroke="#FFFFFF" strokeWidth="1.5" />
                    <polygon points="355,50 365,55 355,60" fill="#D9A441" />
                  </svg>
                  <div className="flex justify-between items-center text-[10px] text-white/70 px-2">
                    <span>Tee Box (0y)</span>
                    <span>Fairway Crest (294y)</span>
                    <span>Greenside Cup (485y)</span>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-white/10 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#D9A441] text-[18px]">
                      verified
                    </span>
                    <span>Left-to-right breaking putt drained from 13.4 ft.</span>
                  </div>
                  <span className="font-bold text-[#D9A441]">+1.4 Strokes Gained</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-center">
            <div className="bg-[#F6F3EC] p-2 rounded-lg">
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase block">
                Fairways
              </span>
              <span className="font-metric-stat text-xs font-bold text-[#1C1F1C]">
                {recap.fairways.split(' ')[0]}
              </span>
            </div>
            <div className="bg-[#F6F3EC] p-2 rounded-lg">
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase block">
                GIR
              </span>
              <span className="font-metric-stat text-xs font-bold text-[#1C1F1C]">
                {recap.gir.split(' ')[0]}
              </span>
            </div>
            <div className="bg-[#F6F3EC] p-2 rounded-lg">
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase block">
                Putts
              </span>
              <span className="font-metric-stat text-xs font-bold text-[#1C1F1C]">
                {recap.putts.split(' ')[0]}
              </span>
            </div>
            <div className="bg-[#F6F3EC] p-2 rounded-lg">
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase block">
                Avg Drive
              </span>
              <span className="font-metric-stat text-xs font-bold text-[#1C1F1C]">
                {recap.avgDriving.split(' ')[0]}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#F6F3EC] border-t border-[#E2DED4] flex items-center justify-between gap-3">
          <button
            onClick={() => onShare(recap)}
            className="flex-1 py-2.5 px-4 rounded-full bg-[#D9A441] hover:bg-[#F5E9D3] text-[#1C1F1C] font-label-pill text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">ios_share</span>
            Share Round Story
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-full bg-white text-[#1C1F1C] border border-[#E2DED4] hover:bg-[#F9F8F5] font-label-pill text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
