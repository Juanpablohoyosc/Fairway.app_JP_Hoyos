import React, { useState } from 'react';
import { BLESSINGS_HOLES, WAYPOINTS } from '../data/mockData';
import { HoleTacticalData, WaypointMarker } from '../types';

interface RoundPrepScreenProps {
  onSelectWaypoint: (wp: WaypointMarker) => void;
  onOpenDrill: () => void;
  onStartLiveRound: () => void;
  onToast: (msg: string) => void;
}

export const RoundPrepScreen: React.FC<RoundPrepScreenProps> = ({
  onSelectWaypoint,
  onOpenDrill,
  onStartLiveRound,
  onToast,
}) => {
  const [nine, setNine] = useState<'front' | 'back'>('front');
  const [isPrepComplete, setIsPrepComplete] = useState(false);
  const [bookmarkedHoles, setBookmarkedHoles] = useState<number[]>([1, 2]);

  const toggleBookmark = (holeNum: number) => {
    if (bookmarkedHoles.includes(holeNum)) {
      setBookmarkedHoles(bookmarkedHoles.filter((h) => h !== holeNum));
      onToast(`Hole ${holeNum} note removed`);
    } else {
      setBookmarkedHoles([...bookmarkedHoles, holeNum]);
      onToast(`Hole ${holeNum} bookmarked to course notes ✓`);
    }
  };

  const displayedHoles =
    nine === 'front'
      ? BLESSINGS_HOLES.slice(0, 9)
      : BLESSINGS_HOLES.slice(9, 18);

  const handleWaypointClickFromHole = (hole: HoleTacticalData) => {
    const matched = WAYPOINTS.find((wp) => wp.hole === hole.holeNumber) || {
      id: `wp-${hole.holeNumber}`,
      hole: hole.holeNumber,
      name: hole.targetPlotted.name,
      subtitle: hole.targetPlotted.notes || 'Fairway Target',
      yardage: parseInt(hole.targetPlotted.yardage, 10) || 240,
      type: 'safe' as const,
      gps: hole.targetPlotted.gpsCoords || '37.7951° N, 122.4578° W',
    };
    onSelectWaypoint(matched);
  };

  return (
    <div className="flex flex-col w-full px-3.5 sm:px-6 max-w-xl mx-auto gap-3.5 pb-24">
      {/* Upcoming Round Hero Card */}
      <div className="relative overflow-hidden rounded-xl bg-[#2F5233] text-white p-4.5 shadow-[0_4px_20px_rgba(34,62,38,0.18)]">
        {/* Subtle Watermark Graphic Layer */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none">
          <svg className="w-full h-full stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 100 100">
            <path d="M50 10 L50 90 M50 15 L82 30 L50 45" />
            <ellipse cx="50" cy="88" rx="20" ry="4" strokeDasharray="2 2" />
            <circle cx="50" cy="88" fill="currentColor" r="3" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {/* Course Location & Round Meta */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] uppercase tracking-wider text-white/70">
                Fayetteville, Arkansas
              </span>
              <h2 className="font-headline-md text-2xl text-white font-bold tracking-tight">
                Blessings Golf Club
              </h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="font-body-md text-xs text-white/80">Saturday, 9:10 AM</span>
                <span className="w-1 h-1 rounded-full bg-[#D9A441]"></span>
                <span className="font-label-pill text-[11px] text-white/90 bg-[#223E26] px-2 py-0.5 rounded-full font-semibold">
                  18 Holes
                </span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0 text-[#D9A441]">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
          </div>

          {/* Live Forecast & Atmospheric Conditions */}
          <div className="rounded-lg bg-[#223E26]/70 p-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-white">
                <span className="material-symbols-outlined text-[18px]">cloud</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-title-md text-sm text-white font-bold">68°F</span>
                  <span className="text-white/40">•</span>
                  <span className="font-body-md text-xs text-white/90 truncate">7mph SW Ozark Breeze</span>
                </div>
                <span className="font-micro-caption text-[9px] text-[#F5E9D3] uppercase tracking-wider truncate">
                  Clear Creek Valleys • High Slope (146)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 bg-[#D9A441]/20 text-[#D9A441] px-2 py-1 rounded-full">
              <span className="material-symbols-outlined text-[14px]">air</span>
              <span className="font-micro-caption text-[9px] uppercase font-bold">
                Firm Greens
              </span>
            </div>
          </div>

          {/* Preparation Progress Tracker */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between text-white/80 font-label-pill text-xs">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#D9A441]">checklist</span>
                Preparation Status
              </span>
              <span className="text-white font-bold">
                {isPrepComplete ? '18 of 18 holes plotted (100%)' : '6 of 18 holes plotted (33%)'}
              </span>
            </div>
            {/* Progress track with custom pine/amber accent */}
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-[#D9A441] rounded-full transition-all duration-500"
                style={{ width: isPrepComplete ? '100%' : '33.3%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tactical Strategy Summary Grid (3 Modular Tiles) */}
      <div className="grid grid-cols-3 gap-2 w-full">
        {/* Tile 1 */}
        <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E2DED4]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              Targets
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#2F5233]">pin_drop</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-2xl text-[#1C1F1C] leading-none font-bold">14</span>
            <span className="font-micro-caption text-[9px] text-[#223E26] mt-0.5 font-medium">
              Key GPS Points
            </span>
          </div>
        </div>

        {/* Tile 2 */}
        <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E2DED4]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              Tee Club
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#D9A441]">sports_golf</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-base text-[#1C1F1C] leading-tight font-bold">
              3-Wood
            </span>
            <span className="font-micro-caption text-[9px] text-[#D9A441] mt-0.5 font-bold">
              Wind Adjusted
            </span>
          </div>
        </div>

        {/* Tile 3 */}
        <div className="bg-white rounded-xl p-3 shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col justify-between border border-[#E2DED4]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              Target
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#2F5233]">speed</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-md text-2xl text-[#1C1F1C] leading-none font-bold">
              &lt; 80
            </span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] mt-0.5 font-medium">
              +8 Handicap Target
            </span>
          </div>
        </div>
      </div>

      {/* Front 9 vs Back 9 Interactive Segmented Filter */}
      <div className="flex items-center justify-between gap-2 mt-1">
        <div className="flex p-0.5 bg-[#F1EEE7] rounded-full w-full max-w-[280px]">
          <button
            onClick={() => setNine('front')}
            className={`flex-1 py-1.5 rounded-full font-label-pill text-xs transition-all text-center cursor-pointer ${
              nine === 'front'
                ? 'bg-[#2F5233] text-white shadow-sm font-semibold'
                : 'text-[#6B7268] hover:text-[#1C1F1C]'
            }`}
          >
            Front 9 (Holes 1–9)
          </button>
          <button
            onClick={() => setNine('back')}
            className={`flex-1 py-1.5 rounded-full font-label-pill text-xs transition-all text-center cursor-pointer ${
              nine === 'back'
                ? 'bg-[#2F5233] text-white shadow-sm font-semibold'
                : 'text-[#6B7268] hover:text-[#1C1F1C]'
            }`}
          >
            Back 9 (10–18)
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onToast('Tuned for 14.8 HCP tee placement')}
            className="w-8 h-8 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/60 flex items-center justify-center text-[#6B7268] hover:text-[#2F5233] cursor-pointer"
            title="Filter options"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
          <button
            onClick={() => onToast('Blessings GC satellite course map loaded')}
            className="w-8 h-8 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/60 flex items-center justify-center text-[#6B7268] hover:text-[#2F5233] cursor-pointer"
            title="Satellite Map"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
          </button>
        </div>
      </div>

      {/* Hole-by-Hole Tactical Cards Stream */}
      <div className="flex flex-col gap-3">
        {displayedHoles.map((hole) => {
          const isBookmarked = bookmarkedHoles.includes(hole.holeNumber);
          return (
            <div
              key={hole.holeNumber}
              className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex flex-col gap-3 transition-all hover:shadow-md"
            >
              {/* Hole Heading Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F6F3EC] flex items-center justify-center font-headline-md text-base text-[#223E26] font-bold">
                    {hole.holeNumber}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-md text-sm text-[#1C1F1C] font-bold">
                        Par {hole.par}
                      </span>
                      <span className="text-[#6B7268] text-xs">•</span>
                      <span className="font-body-md text-xs text-[#6B7268]">
                        {hole.yardage} Yds
                      </span>
                    </div>
                    <span
                      className={`font-micro-caption text-[9px] uppercase tracking-wider font-semibold ${
                        hole.isHardest ? 'text-[#BA1A1A] font-bold' : 'text-[#6B7268]'
                      }`}
                    >
                      {hole.isHardest
                        ? `Stroke Index ${hole.strokeIndex} (Hardest)`
                        : `Stroke Index ${hole.strokeIndex}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center gap-1 font-label-pill text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                      hole.windOrElevationTag.type === 'elevation'
                        ? 'bg-[#FFDAD6] text-[#93000A] font-bold'
                        : hole.windOrElevationTag.type === 'scoring'
                        ? 'bg-[#C4EDC3] text-[#05210C] font-bold'
                        : 'bg-[#F5E9D3] text-[#D9A441]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      {hole.windOrElevationTag.icon}
                    </span>
                    {hole.windOrElevationTag.label}
                  </span>

                  <button
                    onClick={() => toggleBookmark(hole.holeNumber)}
                    className={`w-7 h-7 rounded-full bg-[#F6F3EC] flex items-center justify-center transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'text-[#D9A441] bg-[#F5E9D3]'
                        : 'text-[#2F5233] hover:bg-[#E5E2DB]'
                    }`}
                    title="Bookmark Hole Note"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{
                        fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      {isBookmarked ? 'bookmark' : 'bookmark_add'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Tactical Advice Box */}
              <div className="bg-[#F9F8F5] rounded-lg p-3 flex flex-col gap-1.5 border border-[#E2DED4]/50">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#D9A441] shrink-0 mt-0.5">
                    {hole.iconName}
                  </span>
                  <p className="font-body-md text-xs text-[#1C1F1C] leading-snug">
                    <strong className="font-title-md text-xs text-[#223E26] font-bold">
                      {hole.tacticalDirectiveTitle}{' '}
                    </strong>
                    {hole.tacticalAdvice}
                  </p>
                </div>

                {/* Strategy Micro-Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {hole.chips.map((chip, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.03)] font-label-pill text-[11px] ${
                        chip.isHighlight
                          ? 'bg-white text-[#D9A441] font-bold border border-[#D9A441]/40'
                          : 'bg-white text-[#2F5233] border border-[#E2DED4]/60'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[12px]">{chip.icon}</span>
                      {chip.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Waypoint Interactive Drawer Trigger */}
              <button
                onClick={() => handleWaypointClickFromHole(hole)}
                className="flex items-center justify-between pt-0.5 text-[#6B7268] hover:text-[#2F5233] font-micro-caption text-[10px] text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2F5233]"></span>
                  <span>Target Plotted: {hole.targetPlotted.name}</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#2F5233]">
                  chevron_right
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Plotted Waypoints Quick Overview Card */}
      <div className="bg-white rounded-xl p-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-[#E2DED4]/70 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#2F5233]">
              location_searching
            </span>
            <div className="flex flex-col">
              <span className="font-title-md text-sm text-[#1C1F1C] font-bold">
                Active Waypoint Markers
              </span>
              <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase font-semibold">
                14 Target Coordinates Cached Offline
              </span>
            </div>
          </div>
          <span className="font-label-pill text-xs bg-[#F6F3EC] px-2 py-0.5 rounded-full text-[#223E26] font-bold border border-[#E2DED4]">
            GPS Ready
          </span>
        </div>

        {/* Waypoint Chips Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-2 px-2 no-scrollbar">
          {WAYPOINTS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => onSelectWaypoint(wp)}
              className="shrink-0 bg-[#F9F8F5] hover:bg-[#F1EEE7] border border-[#E2DED4] rounded-lg p-2 flex items-center gap-2 shadow-sm text-left cursor-pointer transition-all active:scale-95"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  wp.type === 'hinge' ? 'bg-[#D9A441]' : 'bg-[#2F5233]'
                }`}
              ></span>
              <div className="flex flex-col">
                <span className="font-label-pill text-[11px] text-[#1C1F1C] font-bold">
                  {wp.name}
                </span>
                <span className="font-micro-caption text-[9px] text-[#6B7268]">
                  {wp.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pre-Round Practice Drill Recommendation */}
      <div
        onClick={onOpenDrill}
        className="rounded-xl bg-[#F5E9D3]/70 p-4 flex items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.03)] border border-[#D9A441]/30 hover:bg-[#F5E9D3] transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#D9A441]/20 flex items-center justify-center shrink-0 text-[#D9A441]">
            <span className="material-symbols-outlined text-[20px]">sports_score</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-caps text-[10px] uppercase text-[#D9A441] tracking-wider font-bold">
              Suggested Warmup Drill
            </span>
            <span className="font-title-md text-sm text-[#1C1F1C] truncate font-bold">
              15 Putts: 20-to-30ft Speed Control
            </span>
            <span className="font-body-md text-xs text-[#6B7268] leading-tight">
              Blessings greens run at 12.5 Stimpmeter today.
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-[20px] text-[#6B7268] shrink-0">
          arrow_forward
        </span>
      </div>

      {/* Sticky Action Dock / Live Round Launch Control */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
          {/* Mark Prep Complete Secondary Pill Button */}
          <button
            onClick={() => {
              const next = !isPrepComplete;
              setIsPrepComplete(next);
              onToast(
                next
                  ? 'Prep status complete: 18 holes plotted ✓'
                  : 'Prep status reopened'
              );
            }}
            className={`h-12 w-full rounded-full font-label-pill text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all active:scale-[0.98] cursor-pointer ${
              isPrepComplete
                ? 'bg-[#C4EDC3] text-[#05210C] font-bold border border-[#05210C]/20'
                : 'bg-white text-[#223E26] hover:bg-[#F6F3EC] border border-[#E2DED4]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#2F5233]">
              {isPrepComplete ? 'task_alt' : 'check_circle'}
            </span>
            <span>{isPrepComplete ? 'Prep Ready ✓' : 'Mark Prep Complete'}</span>
          </button>

          {/* Primary Action: Start Live Round Mode with Gold Flag Icon */}
          <button
            onClick={onStartLiveRound}
            className="h-12 w-full rounded-full bg-[#2F5233] hover:bg-[#223E26] text-white font-label-pill text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(34,62,38,0.25)] transition-all active:scale-[0.98] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#D9A441]">
              golf_course
            </span>
            <span>Start Live Round Mode</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-center pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] animate-pulse"></span>
          <span className="font-micro-caption text-[10px] text-[#6B7268] uppercase tracking-wider">
            Syncing live with Blessings GC pin sheet &amp; wind telemetry
          </span>
        </div>
      </div>
    </div>
  );
};
