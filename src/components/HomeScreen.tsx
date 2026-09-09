import React from 'react';
import { USER_PROFILE, RECAP_ITEMS } from '../data/mockData';
import { TabType, RoundRecapItem } from '../types';

interface HomeScreenProps {
  onNavigateTab: (tab: TabType) => void;
  onStartLiveRound: () => void;
  onOpenDrill: (drill: 'putting-speed' | 'approach-leak') => void;
  onOpenScorecard: (recap: RoundRecapItem) => void;
  onOpenShareModal: (recap: RoundRecapItem) => void;
  onOpenHandicap: () => void;
  onToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onStartLiveRound,
  onOpenDrill,
  onOpenScorecard,
  onOpenShareModal,
  onOpenHandicap,
  onToast,
}) => {
  const latestRound = RECAP_ITEMS[0]; // Pasatiempo (82)

  return (
    <div className="flex flex-col w-full px-3.5 sm:px-6 max-w-xl mx-auto gap-4 pb-24">
      {/* 1. Golfer Welcome & Status Card */}
      <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenHandicap}
            className="relative cursor-pointer group shrink-0"
            title="View Handicap Details"
          >
            <img
              alt={USER_PROFILE.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#2F5233] group-hover:scale-105 transition-transform"
              src={USER_PROFILE.avatarUrl}
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2F5233] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
              ✓
            </span>
          </button>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-caps text-[10px] text-[#6B7268] uppercase font-bold tracking-wider">
                BLESSINGS GC MEMBER
              </span>
              <span className="w-1 h-1 rounded-full bg-[#6B7268]"></span>
              <span className="font-micro-caption text-[10px] text-[#223E26] font-semibold">
                Fayetteville, AR
              </span>
            </div>
            <h2 className="font-title-lg text-lg text-[#1C1F1C] font-bold truncate">
              Welcome, {USER_PROFILE.name}
            </h2>
            <span className="font-body-md text-xs text-[#6B7268]">
              Ready for Saturday morning tee off
            </span>
          </div>
        </div>

        <button
          onClick={onOpenHandicap}
          className="flex flex-col items-end bg-[#F6F3EC] hover:bg-[#EAE6DD] px-3 py-1.5 rounded-lg border border-[#E2DED4] transition-colors cursor-pointer shrink-0 text-right"
        >
          <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
            WHS INDEX
          </span>
          <span className="font-headline-md text-base text-[#223E26] font-extrabold leading-tight">
            14.8
          </span>
          <span className="font-micro-caption text-[9px] text-[#223E26] font-medium flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[10px]">trending_down</span>
            -0.4 (30d)
          </span>
        </button>
      </div>

      {/* 2. On Deck: Next Round Hero Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#223E26] text-white p-4.5 shadow-[0_4px_20px_rgba(34,62,38,0.2)]">
        {/* Subtle Decorative Geometry */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none">
          <svg className="w-full h-full stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 100 100">
            <path d="M50 10 L50 90 M50 15 L82 30 L50 45" />
            <ellipse cx="50" cy="88" rx="20" ry="4" strokeDasharray="2 2" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-label-caps text-[10px] text-[#D9A441] font-bold uppercase tracking-wider">
                  NEXT ROUND ON DECK
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]"></span>
                <span className="font-micro-caption text-[10px] text-white/80">
                  Sat, 9:10 AM
                </span>
              </div>
              <h3 className="font-headline-md text-2xl font-bold text-white mt-0.5">
                Blessings Golf Club
              </h3>
              <span className="font-body-md text-xs text-white/80">
                Member Tees • 6,680 Yds • Par 72 • 74.8 / 146
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#D9A441] shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
          </div>

          {/* Micro Conditions Bar */}
          <div className="bg-[#2F5233]/70 rounded-lg p-2.5 flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-white text-[20px]">cloud</span>
              <div className="flex flex-col">
                <span className="font-title-md text-xs text-white font-bold">
                  68°F • 7mph SW Ozark Valley Breeze
                </span>
                <span className="font-micro-caption text-[9px] text-[#F5E9D3] uppercase">
                  Clear Creek Valleys • Firm Undulating Greens
                </span>
              </div>
            </div>
            <span className="font-label-pill text-[11px] bg-[#D9A441] text-[#1C1F1C] px-2 py-0.5 rounded-full font-bold">
              Pin Sheet In Sync
            </span>
          </div>

          {/* Action CTAs: Prep Strategy vs Start Live */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => onNavigateTab('round-prep')}
              className="py-2.5 px-3 rounded-full bg-white/15 hover:bg-white/25 text-white font-label-pill text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/20"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              <span>Open Prep Plan</span>
            </button>
            <button
              onClick={onStartLiveRound}
              className="py-2.5 px-3 rounded-full bg-[#D9A441] hover:bg-[#F5E9D3] text-[#1C1F1C] font-label-pill text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Start Live Round</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Quick Action Hub (4 Interactive Buttons) */}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={onStartLiveRound}
          className="bg-white hover:bg-[#F9F8F5] rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#223E26]">
            <span className="material-symbols-outlined text-[18px]">golf_course</span>
          </div>
          <span className="font-label-pill text-[11px] text-[#1C1F1C] font-bold leading-tight">
            Live GPS
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('round-prep')}
          className="bg-white hover:bg-[#F9F8F5] rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#2F5233]">
            <span className="material-symbols-outlined text-[18px]">map</span>
          </div>
          <span className="font-label-pill text-[11px] text-[#1C1F1C] font-bold leading-tight">
            18 Holes
          </span>
        </button>

        <button
          onClick={() => onOpenDrill('putting-speed')}
          className="bg-white hover:bg-[#F9F8F5] rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#F5E9D3] flex items-center justify-center text-[#7D5700]">
            <span className="material-symbols-outlined text-[18px]">sports_score</span>
          </div>
          <span className="font-label-pill text-[11px] text-[#1C1F1C] font-bold leading-tight">
            Warmup
          </span>
        </button>

        <button
          onClick={() => onNavigateTab('performance')}
          className="bg-white hover:bg-[#F9F8F5] rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 text-center shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 cursor-pointer transition-all active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#2F5233]">
            <span className="material-symbols-outlined text-[18px]">insights</span>
          </div>
          <span className="font-label-pill text-[11px] text-[#1C1F1C] font-bold leading-tight">
            Analytics
          </span>
        </button>
      </div>

      {/* 4. Focus Area: Approach Leak & Training Drill Banner */}
      <div className="bg-[#F5E9D3] rounded-xl p-4 flex items-start gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#D9A441]/40">
        <div className="w-9 h-9 rounded-full bg-[#D9A441]/25 text-[#7D5700] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            target
          </span>
        </div>
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-sm text-[#1C1F1C] font-bold">
              Current Focus: 140–170y Approach Leak
            </span>
            <span className="font-micro-caption text-[10px] text-[#93000A] font-bold bg-[#FFDAD6] px-1.5 py-0.5 rounded">
              -1.6 Strokes
            </span>
          </div>
          <p className="font-body-md text-xs text-[#6B7268] leading-relaxed">
            Mid-irons are pushing right into greenside sand. Complete the 3-ball gate warmup before teeing off at Blessings.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onOpenDrill('approach-leak')}
              className="inline-flex items-center gap-1 font-label-pill text-xs text-[#223E26] hover:underline font-bold cursor-pointer"
            >
              <span>Practice Range Drill</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
            <span className="text-[#6B7268] text-xs">•</span>
            <button
              onClick={() => onNavigateTab('performance')}
              className="font-micro-caption text-[10px] text-[#6B7268] hover:text-[#1C1F1C] cursor-pointer"
            >
              View Dispersion
            </button>
          </div>
        </div>
      </div>

      {/* 5. Season Barometer (3 Stat Tiles) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
            SEASON AT A GLANCE
          </span>
          <button
            onClick={() => onNavigateTab('performance')}
            className="font-label-pill text-xs text-[#2F5233] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            <span>Full Stats</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex flex-col justify-between">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              Season Low
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#223E26]">79</span>
              <span className="font-micro-caption text-[10px] text-[#D9A441] font-bold">+7</span>
            </div>
            <span className="font-micro-caption text-[9px] text-[#6B7268]">Spyglass Hill</span>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex flex-col justify-between">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              Scoring Avg
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#1C1F1C]">83.4</span>
            </div>
            <span className="font-micro-caption text-[9px] text-[#223E26] font-medium">14 Outings</span>
          </div>

          <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex flex-col justify-between">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
              Fairway Hit
            </span>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#1C1F1C]">64%</span>
            </div>
            <span className="font-micro-caption text-[9px] text-[#6B7268]">9/14 Driver Avg</span>
          </div>
        </div>
      </div>

      {/* 6. Most Recent Round Highlight Card */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
            LAST OUTING
          </span>
          <button
            onClick={() => onNavigateTab('recaps')}
            className="font-label-pill text-xs text-[#2F5233] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
          >
            <span>All Recaps (14)</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 overflow-hidden flex flex-col">
          <div className="p-4 flex flex-col gap-2.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-label-caps text-[10px] text-[#D9A441] font-bold uppercase">
                    PASATIEMPO GOLF CLUB
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#6B7268]"></span>
                  <span className="font-micro-caption text-[9px] text-[#6B7268]">
                    {latestRound.date}
                  </span>
                </div>
                <h4 className="font-title-md text-base text-[#1C1F1C] font-bold mt-0.5">
                  Santa Cruz, CA
                </h4>
              </div>

              <div className="flex items-baseline gap-1 bg-[#F6F3EC] px-3 py-1 rounded-lg">
                <span className="font-headline-md text-xl text-[#223E26] font-extrabold">
                  {latestRound.score}
                </span>
                <span className="font-label-pill text-xs text-[#6B7268] font-bold">
                  {latestRound.toPar}
                </span>
              </div>
            </div>

            {/* Standout Round Highlight */}
            <div className="bg-[#F6F3EC] rounded-lg p-2 flex items-center gap-2 border border-[#E2DED4]/50">
              <span className="material-symbols-outlined text-[#D9A441] text-[20px] shrink-0">
                {latestRound.highlightIcon}
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-caps text-[9px] text-[#223E26] font-bold">
                  {latestRound.highlightTitle}
                </span>
                <span className="font-body-md text-xs text-[#1C1F1C] font-semibold truncate">
                  {latestRound.highlightDesc}
                </span>
              </div>
            </div>
          </div>

          {/* Card Footer Actions */}
          <div className="bg-[#F9F8F5] px-4 py-2.5 border-t border-[#E2DED4]/60 flex items-center justify-between">
            <button
              onClick={() => onOpenShareModal(latestRound)}
              className="font-label-pill text-xs text-[#223E26] flex items-center gap-1 hover:text-[#D9A441] transition-colors cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">ios_share</span>
              Share Story
            </button>
            <button
              onClick={() => onOpenScorecard(latestRound)}
              className="font-label-pill text-xs text-[#1C1F1C] flex items-center gap-1 hover:text-[#2F5233] transition-colors cursor-pointer font-bold"
            >
              <span>View Scorecard</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* 7. Quick Tips / Offline Sync Banner */}
      <div className="flex items-center justify-between px-2 text-[#6B7268] text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2F5233]"></span>
          <span className="font-micro-caption text-[10px] uppercase">
            All 18 Hole GPS Offline Cached
          </span>
        </div>
        <button
          onClick={() => onToast('Telemetry refreshed with Blessings GC pin sheet ✓')}
          className="font-micro-caption text-[10px] text-[#2F5233] hover:underline cursor-pointer flex items-center gap-0.5 font-bold"
        >
          <span className="material-symbols-outlined text-[12px]">sync</span>
          Sync
        </button>
      </div>
    </div>
  );
};
