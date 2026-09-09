import React, { useState } from 'react';
import { RECAP_ITEMS } from '../data/mockData';
import { RoundRecapItem } from '../types';

interface RecapsScreenProps {
  onOpenScorecard: (recap: RoundRecapItem) => void;
  onOpenShareModal: (recap: RoundRecapItem) => void;
  onToast: (msg: string) => void;
}

export const RecapsScreen: React.FC<RecapsScreenProps> = ({
  onOpenScorecard,
  onOpenShareModal,
  onToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const featuredRecap = RECAP_ITEMS[0];
  const pastRecaps = RECAP_ITEMS.slice(1);

  const filteredPastRecaps = pastRecaps.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'best') return item.score <= 82;
    if (activeFilter === 'blessings') return item.tagFilter === 'blessings';
    if (activeFilter === 'coast') return item.tagFilter === 'coast';
    if (activeFilter === 'pasatiempo') return item.tagFilter === 'pasatiempo';
    return true;
  });

  return (
    <div className="flex flex-col w-full px-3.5 sm:px-6 max-w-xl mx-auto gap-4 pb-24">
      {/* Screen Header & Season Snapshot */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
              Juan Pablo • Season Archive
            </span>
            <h2 className="font-headline-md text-2xl text-[#1C1F1C] font-bold">
              Round Recaps
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-[#F1EEE7] px-2.5 py-1 rounded-full border border-[#E2DED4]">
            <span className="material-symbols-outlined text-[#D9A441] text-[16px]">
              military_tech
            </span>
            <span className="font-label-caps text-[10px] text-[#2F5233] font-bold">
              2024 VOYAGE
            </span>
          </div>
        </div>

        {/* Season Performance Pill Ribbon */}
        <div className="bg-white rounded-xl p-3 shadow-sm flex items-center justify-between border border-[#E2DED4]/70">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#F6F3EC] flex items-center justify-center shrink-0 text-[#2F5233]">
              <span className="material-symbols-outlined text-[20px]">sports_score</span>
            </div>
            <div className="flex flex-col">
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
                Logged Rounds
              </span>
              <span className="font-title-md text-base text-[#1C1F1C] font-bold">14 Rounds</span>
            </div>
          </div>

          <div className="w-px h-8 bg-[#E2DED4]"></div>

          <div className="flex flex-col">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              Season Low
            </span>
            <span className="font-title-md text-base text-[#223E26] font-bold">
              79{' '}
              <span className="font-metric-stat text-xs text-[#D9A441] font-normal">(+7)</span>
            </span>
          </div>

          <div className="w-px h-8 bg-[#E2DED4]"></div>

          <div className="flex flex-col text-right">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              Avg 18-Hole
            </span>
            <span className="font-title-md text-base text-[#1C1F1C] font-bold">83.4</span>
          </div>
        </div>

        {/* Course & Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full font-label-pill text-xs shrink-0 shadow-sm transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#223E26] text-white font-bold'
                : 'bg-white text-[#1C1F1C] hover:bg-[#F9F8F5] border border-[#E2DED4]'
            }`}
          >
            All Recaps (14)
          </button>
          <button
            onClick={() => setActiveFilter('best')}
            className={`px-3 py-1.5 rounded-full font-label-pill text-xs shrink-0 shadow-sm transition-all cursor-pointer ${
              activeFilter === 'best'
                ? 'bg-[#223E26] text-white font-bold'
                : 'bg-white text-[#1C1F1C] hover:bg-[#F9F8F5] border border-[#E2DED4]'
            }`}
          >
            ✨ Best Rounds (Sub-83)
          </button>
          <button
            onClick={() => setActiveFilter('pasatiempo')}
            className={`px-3 py-1.5 rounded-full font-label-pill text-xs shrink-0 shadow-sm transition-all cursor-pointer ${
              activeFilter === 'pasatiempo'
                ? 'bg-[#223E26] text-white font-bold'
                : 'bg-white text-[#1C1F1C] hover:bg-[#F9F8F5] border border-[#E2DED4]'
            }`}
          >
            Pasatiempo
          </button>
          <button
            onClick={() => setActiveFilter('blessings')}
            className={`px-3 py-1.5 rounded-full font-label-pill text-xs shrink-0 shadow-sm transition-all cursor-pointer ${
              activeFilter === 'blessings'
                ? 'bg-[#223E26] text-white font-bold'
                : 'bg-white text-[#1C1F1C] hover:bg-[#F9F8F5] border border-[#E2DED4]'
            }`}
          >
            Blessings GC
          </button>
          <button
            onClick={() => setActiveFilter('coast')}
            className={`px-3 py-1.5 rounded-full font-label-pill text-xs shrink-0 shadow-sm transition-all cursor-pointer ${
              activeFilter === 'coast'
                ? 'bg-[#223E26] text-white font-bold'
                : 'bg-white text-[#1C1F1C] hover:bg-[#F9F8F5] border border-[#E2DED4]'
            }`}
          >
            Coastal Links
          </button>
        </div>
      </div>

      {/* FEATURED RECAP HERO CARD (Most Recent - Pasatiempo) */}
      {(activeFilter === 'all' || activeFilter === 'pasatiempo' || activeFilter === 'best') && (
        <div className="relative bg-[#223E26] text-white rounded-xl overflow-hidden shadow-md flex flex-col transition-all border border-[#223E26]">
          {/* Decorative Golf Course Contours & Pin Watermark */}
          <svg
            className="absolute -right-6 -bottom-10 w-56 h-56 text-[#F9F8F5] opacity-10 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" strokeWidth="1.2"></circle>
            <circle cx="50" cy="50" r="32" strokeWidth="1"></circle>
            <path d="M50 20 V80 M50 24 L72 34 L50 44 Z" fill="currentColor" opacity="0.4"></path>
            <path d="M10 65 Q 40 45, 60 70 T 95 60" strokeWidth="1.5"></path>
          </svg>

          {/* Card Top: Header & Course Photo Accents */}
          <div className="p-4.5 flex flex-col gap-3 relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-caps text-[11px] text-[#D9A441] font-bold uppercase">
                    MOST RECENT ROUND
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]"></span>
                  <span className="font-micro-caption text-[10px] text-[#EBE8E1] opacity-80">
                    {featuredRecap.date}
                  </span>
                </div>
                <h3 className="font-headline-md text-2xl font-bold text-white mt-0.5 leading-tight">
                  {featuredRecap.courseName}
                </h3>
                <span className="font-body-md text-xs text-[#EBE8E1] opacity-80">
                  {featuredRecap.subLocation}
                </span>
              </div>

              {/* Share Story Pill Action */}
              <button
                onClick={() => onOpenShareModal(featuredRecap)}
                className="flex items-center gap-1 bg-[#D9A441] text-[#1C1F1C] hover:bg-[#F5E9D3] px-2.5 py-1.5 rounded-full font-label-pill text-xs font-bold shadow-sm transition-transform active:scale-90 shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">ios_share</span>
                <span>Share Story</span>
              </button>
            </div>

            {/* Big Score Hero Display */}
            <div className="flex items-baseline justify-between bg-[#2F5233]/80 rounded-lg px-3.5 py-2 backdrop-blur-sm border border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="font-display-hero-mobile text-4xl font-extrabold text-white tracking-tight">
                  {featuredRecap.score}
                </span>
                <div className="flex flex-col">
                  <span className="font-title-md text-sm text-[#D9A441] font-bold">
                    {featuredRecap.toPar}
                  </span>
                  <span className="font-micro-caption text-[9px] text-white/90">
                    {featuredRecap.netScore}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-micro-caption text-[9px] text-white/80 uppercase">
                  Course Details
                </span>
                <span className="font-metric-stat text-xs text-white font-bold">
                  {featuredRecap.courseDetails}
                </span>
              </div>
            </div>

            {/* Standout Highlight Banner */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 border border-white/10">
              <span className="material-symbols-outlined text-[#D9A441] text-[20px] shrink-0">
                {featuredRecap.highlightIcon}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-[10px] text-[#D9A441] font-bold">
                  {featuredRecap.highlightTitle}
                </span>
                <span className="font-title-md text-xs text-white font-semibold truncate">
                  {featuredRecap.highlightDesc}
                </span>
              </div>
            </div>

            {/* Stat Pill Badges Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#2F5233]/50 rounded-lg p-1.5 flex flex-col items-center text-center border border-white/5">
                <span className="font-micro-caption text-[9px] text-white/80 opacity-80 uppercase">
                  Longest Tee Shot
                </span>
                <span className="font-title-md text-sm text-white font-bold">294 yds</span>
                <span className="font-micro-caption text-[9px] text-[#D9A441]">Hole #9 Fairway</span>
              </div>
              <div className="bg-[#2F5233]/50 rounded-lg p-1.5 flex flex-col items-center text-center border border-white/5">
                <span className="font-micro-caption text-[9px] text-white/80 opacity-80 uppercase">
                  Birdie Count
                </span>
                <span className="font-title-md text-sm text-white font-bold">4 Birdies</span>
                <span className="font-micro-caption text-[9px] text-[#D9A441]">Top 5% Round</span>
              </div>
              <div className="bg-[#2F5233]/50 rounded-lg p-1.5 flex flex-col items-center text-center border border-white/5">
                <span className="font-micro-caption text-[9px] text-white/80 opacity-80 uppercase">
                  Putting Total
                </span>
                <span className="font-title-md text-sm text-white font-bold">32 Putts</span>
                <span className="font-micro-caption text-[9px] text-white/80 opacity-80">
                  1.78 per GIR
                </span>
              </div>
            </div>

            {/* Mini Scorecard Preview Strip */}
            <div className="bg-[#F6F3EC]/10 rounded-lg p-2 flex flex-col gap-1 border border-white/10">
              <div className="flex justify-between items-center text-white/90 font-micro-caption text-[9px] uppercase">
                <span>Split Summary</span>
                <span>Front: 41 (+5) • Back: 41 (+5)</span>
              </div>
              {/* Hole Score Pip Visualization */}
              <div className="flex items-center justify-between gap-1 pt-0.5">
                {/* 18 miniature hole result indicators */}
                <div className="flex-1 h-3 rounded-full bg-[#D9A441] flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C] font-bold" title="H1: Birdie">3</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H2: Par">4</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H3: Par">4</div>
                <div className="flex-1 h-3 rounded-full bg-[#E5E2DB]/60 flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C]" title="H4: Bogey">5</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H5: Par">3</div>
                <div className="flex-1 h-3 rounded-full bg-[#D9A441] flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C] font-bold" title="H6: Birdie">4</div>
                <div className="flex-1 h-3 rounded-full bg-[#E5E2DB]/60 flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C]" title="H7: Bogey">5</div>
                <div className="flex-1 h-3 rounded-full bg-[#BA1A1A]/80 flex items-center justify-center font-micro-caption text-[7px] text-white font-bold" title="H8: Double">6</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H9: Par">5</div>
                <div className="w-1 h-3 bg-[#E2DED4]/40 mx-0.5"></div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H10: Par">4</div>
                <div className="flex-1 h-3 rounded-full bg-[#E5E2DB]/60 flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C]" title="H11: Bogey">4</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H12: Par">4</div>
                <div className="flex-1 h-3 rounded-full bg-[#D9A441] flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C] font-bold ring-1 ring-[#F5E9D3]" title="H13: Eagle">3</div>
                <div className="flex-1 h-3 rounded-full bg-[#E5E2DB]/60 flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C]" title="H14: Bogey">5</div>
                <div className="flex-1 h-3 rounded-full bg-white/30 flex items-center justify-center font-micro-caption text-[7px] text-white" title="H15: Par">3</div>
                <div className="flex-1 h-3 rounded-full bg-[#D9A441] flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C] font-bold" title="H16: Birdie">4</div>
                <div className="flex-1 h-3 rounded-full bg-[#E5E2DB]/60 flex items-center justify-center font-micro-caption text-[7px] text-[#1C1F1C]" title="H17: Bogey">5</div>
                <div className="flex-1 h-3 rounded-full bg-[#BA1A1A]/80 flex items-center justify-center font-micro-caption text-[7px] text-white font-bold" title="H18: Double">6</div>
              </div>
            </div>
          </div>

          {/* Action Drilldown Footer */}
          <button
            onClick={() => onOpenScorecard(featuredRecap)}
            className="bg-[#2F5233] hover:bg-[#183B1E] text-white px-4.5 py-2.5 flex items-center justify-between transition-colors z-10 border-t border-white/10 cursor-pointer"
          >
            <span className="font-label-pill text-xs text-[#F9F8F5] flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[16px] text-[#D9A441]">
                receipt_long
              </span>
              View Full 18-Hole Scorecard &amp; GPS Shot Trail
            </span>
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[14px] text-white">
                arrow_forward
              </span>
            </div>
          </button>
        </div>
      )}

      {/* RECENT ROUNDS SECTION HEADER */}
      <div className="flex items-center justify-between pt-2">
        <h3 className="font-title-lg text-lg text-[#1C1F1C] font-bold">Past Triumphs</h3>
        <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
          Showing {filteredPastRecaps.length} of 13 Older Rounds
        </span>
      </div>

      {/* PAST RECAP CARDS LIST */}
      <div className="flex flex-col gap-3">
        {filteredPastRecaps.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col transition-all border border-[#E2DED4]/70"
          >
            <div className="p-4 flex flex-col gap-3">
              {/* Card Header & Location */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-label-caps text-[10px] uppercase font-bold ${
                        item.badgeTag ? 'text-[#D9A441]' : 'text-[#223E26]'
                      }`}
                    >
                      {item.badgeTag || item.courseName.toUpperCase()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#6B7268]"></span>
                    <span className="font-micro-caption text-[9px] text-[#6B7268]">{item.date}</span>
                  </div>
                  <h4 className="font-title-md text-base text-[#1C1F1C] font-bold mt-0.5">
                    {item.subLocation}
                  </h4>
                  <span className="font-micro-caption text-[9px] text-[#6B7268]">
                    {item.courseName}
                  </span>
                </div>

                {/* Score Badge */}
                <div
                  className={`px-3 py-1 rounded-lg flex items-baseline gap-1 ${
                    item.badgeTag ? 'bg-[#F5E9D3]' : 'bg-[#F6F3EC]'
                  }`}
                >
                  <span className="font-headline-md text-xl text-[#223E26] font-extrabold">
                    {item.score}
                  </span>
                  <span className="font-label-pill text-xs text-[#6B7268] font-bold">
                    {item.toPar}
                  </span>
                </div>
              </div>

              {/* Highlight Row */}
              <div className="bg-[#F6F3EC] rounded-lg p-2 flex items-center gap-2 border border-[#E2DED4]/50">
                <span className="material-symbols-outlined text-[#D9A441] text-[20px] shrink-0">
                  {item.highlightIcon}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-caps text-[9px] text-[#223E26] font-bold">
                    {item.highlightTitle}
                  </span>
                  <span className="font-body-md text-xs text-[#1C1F1C] font-semibold truncate">
                    {item.highlightDesc}
                  </span>
                </div>
              </div>

              {/* Secondary Metrics */}
              <div className="flex items-center justify-between text-[#6B7268] font-body-md text-xs pt-0.5">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#2F5233]">
                    straighten
                  </span>
                  <span>{item.fairways}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#D9A441]">
                    speed
                  </span>
                  <span>{item.avgDriving}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-[#223E26]">
                    pin_drop
                  </span>
                  <span>{item.netScore}</span>
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="bg-[#F9F8F5] px-4 py-2 border-t border-[#E2DED4]/60 flex items-center justify-between">
              <button
                onClick={() => onOpenShareModal(item)}
                className="font-label-pill text-xs text-[#223E26] flex items-center gap-1 hover:text-[#D9A441] transition-colors cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">share</span>
                Share Card
              </button>
              <button
                onClick={() => onOpenScorecard(item)}
                className="font-label-pill text-xs text-[#1C1F1C] flex items-center gap-1 hover:text-[#2F5233] transition-colors cursor-pointer font-semibold"
              >
                <span>View Scorecard</span>
                <div className="w-5 h-5 rounded-full bg-[#F1EEE7] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nostalgic Club Quote / Heritage Stamp */}
      <div className="py-4 flex flex-col items-center justify-center text-center gap-1 opacity-75">
        <div className="w-12 h-px bg-[#E2DED4]"></div>
        <span className="font-label-caps text-[10px] text-[#6B7268] uppercase tracking-widest">
          “Golf is the closest game to the game we call life.”
        </span>
        <span className="font-micro-caption text-[9px] text-[#6B7268]">
          Bobby Jones • Fairway Club Archives
        </span>
      </div>
    </div>
  );
};
