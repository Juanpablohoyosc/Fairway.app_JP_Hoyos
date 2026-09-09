import React, { useState } from 'react';
import { CLUB_DISPERSIONS } from '../data/mockData';
import { ClubDispersionItem } from '../types';

interface PerformanceScreenProps {
  onOpenDrill: () => void;
  onSelectClub: (club: ClubDispersionItem) => void;
  onToast: (msg: string) => void;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({
  onOpenDrill,
  onSelectClub,
  onToast,
}) => {
  const [filterRange, setFilterRange] = useState<'last-5' | 'last-10' | 'season'>('last-5');

  const getBenchmarkStats = () => {
    switch (filterRange) {
      case 'last-10':
        return {
          net: '-1.4 Net',
          tee: { val: '+0.3', h: 62 },
          appr: { val: '-1.5', h: 72 },
          short: { val: '+0.1', h: 40 },
          putt: { val: '-0.3', h: 45 },
          leakText: 'Approach accuracy is costing you 1.5 strokes/round across 10 outings.',
          trendSubtitle: 'Last 10 Rounds Progression',
        };
      case 'season':
        return {
          net: '-1.1 Net',
          tee: { val: '+0.6', h: 78 },
          appr: { val: '-1.2', h: 60 },
          short: { val: '+0.3', h: 52 },
          putt: { val: '-0.8', h: 65 },
          leakText: 'Season-long trend indicates scoring leakage on mid-iron approach shots.',
          trendSubtitle: '2024 Season Progression',
        };
      case 'last-5':
      default:
        return {
          net: '-1.7 Net',
          tee: { val: '+0.4', h: 68 },
          appr: { val: '-1.8', h: 84 },
          short: { val: '+0.2', h: 48 },
          putt: { val: '-0.5', h: 55 },
          leakText: 'Approach accuracy is costing you 1.6 strokes/round over your last 5 outings. 4 of 6 primary misses leaked right into greenside bunkers.',
          trendSubtitle: 'Last 5 Rounds Progression',
        };
    }
  };

  const stats = getBenchmarkStats();

  return (
    <div className="flex flex-col w-full px-3.5 sm:px-6 space-y-3.5 max-w-[440px] mx-auto pb-24">
      {/* Course Context & Range Segmented Filter */}
      <section className="flex flex-col space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
              BENCHMARK COMPARISON
            </span>
            <span className="font-title-md text-base text-[#1C1F1C] font-bold">
              Pasatiempo Baseline vs 14.8 HCP
            </span>
          </div>
          <button
            onClick={() => onToast('Baseline calibrated against USGA scratch rating')}
            className="w-7 h-7 rounded-full bg-[#F6F3EC] flex items-center justify-center text-[#2F5233] shadow-sm border border-[#E2DED4] cursor-pointer hover:bg-[#E5E2DB]"
            title="Calibrate Baseline"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Segmented Filter Control */}
        <div className="grid grid-cols-3 p-1 bg-[#F1EEE7] rounded-full">
          <button
            onClick={() => setFilterRange('last-5')}
            className={`py-1.5 rounded-full font-label-pill text-xs transition-all cursor-pointer ${
              filterRange === 'last-5'
                ? 'bg-white text-[#223E26] shadow-sm font-bold'
                : 'text-[#6B7268] hover:text-[#1C1F1C]'
            }`}
          >
            Last 5 Rounds
          </button>
          <button
            onClick={() => setFilterRange('last-10')}
            className={`py-1.5 rounded-full font-label-pill text-xs transition-all cursor-pointer ${
              filterRange === 'last-10'
                ? 'bg-white text-[#223E26] shadow-sm font-bold'
                : 'text-[#6B7268] hover:text-[#1C1F1C]'
            }`}
          >
            Last 10
          </button>
          <button
            onClick={() => setFilterRange('season')}
            className={`py-1.5 rounded-full font-label-pill text-xs transition-all cursor-pointer ${
              filterRange === 'season'
                ? 'bg-white text-[#223E26] shadow-sm font-bold'
                : 'text-[#6B7268] hover:text-[#1C1F1C]'
            }`}
          >
            2024 Season
          </button>
        </div>
      </section>

      {/* Section 2: Strokes Gained / Lost Summary */}
      <section className="bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#E2DED4]/70">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
              STROKES GAINED / LOST
            </span>
            <p className="font-micro-caption text-[9px] text-[#6B7268]">
              5-Round Moving Avg vs 14.8 HCP Baseline
            </p>
          </div>
          <span className="font-label-pill text-xs px-2 py-0.5 rounded-full bg-[#F1EEE7] text-[#1C1F1C] font-bold border border-[#E2DED4]">
            {stats.net}
          </span>
        </div>

        {/* 4-Column Track & Readout Architecture */}
        <div className="grid grid-cols-4 gap-2">
          {/* TEE */}
          <div className="flex flex-col items-center p-2 bg-[#F9F8F5] rounded-lg border border-[#E2DED4]/50">
            <div className="w-full h-14 bg-[#EEEEEE] rounded-lg flex flex-col justify-end p-1 overflow-hidden relative">
              <div
                className="w-full bg-[#2F5233] rounded-md transition-all duration-500"
                style={{ height: `${stats.tee.h}%` }}
              ></div>
              <div className="absolute top-1.5 inset-x-0 flex justify-center">
                <span className="material-symbols-outlined text-[#223E26] text-[14px]">
                  arrow_upward
                </span>
              </div>
            </div>
            <span className="font-metric-stat text-xs text-[#223E26] font-bold mt-1.5">
              {stats.tee.val}
            </span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              TEE
            </span>
          </div>

          {/* APPROACH */}
          <div className="flex flex-col items-center p-2 bg-[#F9F8F5] rounded-lg border border-[#E2DED4]/50">
            <div className="w-full h-14 bg-[#EEEEEE] rounded-lg flex flex-col justify-end p-1 overflow-hidden relative">
              <div
                className="w-full bg-[#D9A441] rounded-md transition-all duration-500"
                style={{ height: `${stats.appr.h}%` }}
              ></div>
              <div className="absolute top-1.5 inset-x-0 flex justify-center">
                <span className="material-symbols-outlined text-[#D9A441] text-[14px]">
                  arrow_downward
                </span>
              </div>
            </div>
            <span className="font-metric-stat text-xs text-[#7D5700] font-bold mt-1.5">
              {stats.appr.val}
            </span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              APPR
            </span>
          </div>

          {/* SHORT GAME */}
          <div className="flex flex-col items-center p-2 bg-[#F9F8F5] rounded-lg border border-[#E2DED4]/50">
            <div className="w-full h-14 bg-[#EEEEEE] rounded-lg flex flex-col justify-end p-1 overflow-hidden relative">
              <div
                className="w-full bg-[#2F5233] rounded-md transition-all duration-500"
                style={{ height: `${stats.short.h}%` }}
              ></div>
              <div className="absolute top-1.5 inset-x-0 flex justify-center">
                <span className="material-symbols-outlined text-[#223E26] text-[14px]">
                  arrow_upward
                </span>
              </div>
            </div>
            <span className="font-metric-stat text-xs text-[#223E26] font-bold mt-1.5">
              {stats.short.val}
            </span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              SHORT
            </span>
          </div>

          {/* PUTTING */}
          <div className="flex flex-col items-center p-2 bg-[#F9F8F5] rounded-lg border border-[#E2DED4]/50">
            <div className="w-full h-14 bg-[#EEEEEE] rounded-lg flex flex-col justify-end p-1 overflow-hidden relative">
              <div
                className="w-full bg-[#D9A441] rounded-md transition-all duration-500"
                style={{ height: `${stats.putt.h}%` }}
              ></div>
              <div className="absolute top-1.5 inset-x-0 flex justify-center">
                <span className="material-symbols-outlined text-[#D9A441] text-[14px]">
                  arrow_downward
                </span>
              </div>
            </div>
            <span className="font-metric-stat text-xs text-[#7D5700] font-bold mt-1.5">
              {stats.putt.val}
            </span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase tracking-wider font-semibold">
              PUTT
            </span>
          </div>
        </div>
      </section>

      {/* Section 3: Key Stroke Leak Insight Callout */}
      <section className="bg-[#F5E9D3] rounded-xl p-4 flex items-start gap-3 shadow-sm border border-[#D9A441]/40">
        <div className="w-9 h-9 rounded-full bg-[#D9A441]/20 text-[#7D5700] flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
        </div>
        <div className="flex-1 flex flex-col space-y-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-sm text-[#1C1F1C] font-bold truncate">
              Stroke Leak: 140–170y Approach
            </span>
          </div>
          <p className="font-body-md text-xs text-[#6B7268] leading-relaxed">
            Approach accuracy is costing you <strong className="text-[#1C1F1C] font-bold">1.6 strokes/round</strong> over your last 5 outings. 4 of 6 primary misses leaked right into greenside bunkers.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenDrill}
              className="inline-flex items-center gap-1 font-label-pill text-xs text-[#223E26] hover:underline font-bold cursor-pointer"
            >
              <span>See range drill recommendations</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 4: Multi-Round Strokes Gained Trend Chart */}
      <section className="bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#E2DED4]/70">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
              STROKES GAINED TREND
            </span>
            <span className="font-title-md text-sm text-[#1C1F1C] font-bold">
              {stats.trendSubtitle}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#2F5233]"></span>
            <span className="font-micro-caption text-[9px] text-[#6B7268] mr-2">+ Gain</span>
            <span className="w-2 h-2 rounded-full bg-[#D9A441]"></span>
            <span className="font-micro-caption text-[9px] text-[#6B7268]">- Loss</span>
          </div>
        </div>

        {/* Visual Bi-directional Bar Visualizer */}
        <div className="w-full bg-[#F9F8F5] rounded-lg p-3 space-y-2 border border-[#E2DED4]/50">
          {/* Zero baseline reference line */}
          <div className="relative h-32 flex items-end justify-between px-2 pt-4 pb-2">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E2DED4] z-0"></div>
            <span className="absolute top-[46%] right-1 font-micro-caption text-[9px] text-[#6B7268]">
              0.0 BASE
            </span>

            {/* Round 1: Blessings (+0.2) */}
            <div className="relative z-10 flex flex-col items-center h-full justify-center w-1/5 group">
              <div className="flex flex-col items-center justify-end h-1/2 w-full">
                <span className="font-micro-caption text-[9px] text-[#223E26] font-bold mb-0.5">
                  +0.2
                </span>
                <div className="w-5 bg-[#2F5233] rounded-t-sm" style={{ height: '15%' }}></div>
              </div>
              <div className="h-1/2 w-full"></div>
            </div>

            {/* Round 2: Half Moon Bay (-1.1) */}
            <div className="relative z-10 flex flex-col items-center h-full justify-center w-1/5 group">
              <div className="h-1/2 w-full"></div>
              <div className="flex flex-col items-center justify-start h-1/2 w-full">
                <div className="w-5 bg-[#D9A441] rounded-b-sm" style={{ height: '45%' }}></div>
                <span className="font-micro-caption text-[9px] text-[#7D5700] font-bold mt-0.5">
                  -1.1
                </span>
              </div>
            </div>

            {/* Round 3: TPC Harding (-2.4) */}
            <div className="relative z-10 flex flex-col items-center h-full justify-center w-1/5 group">
              <div className="h-1/2 w-full"></div>
              <div className="flex flex-col items-center justify-start h-1/2 w-full">
                <div className="w-5 bg-[#D9A441] rounded-b-sm" style={{ height: '82%' }}></div>
                <span className="font-micro-caption text-[9px] text-[#7D5700] font-bold mt-0.5">
                  -2.4
                </span>
              </div>
            </div>

            {/* Round 4: Spyglass (+0.8) */}
            <div className="relative z-10 flex flex-col items-center h-full justify-center w-1/5 group">
              <div className="flex flex-col items-center justify-end h-1/2 w-full">
                <span className="font-micro-caption text-[9px] text-[#223E26] font-bold mb-0.5">
                  +0.8
                </span>
                <div className="w-5 bg-[#2F5233] rounded-t-sm" style={{ height: '48%' }}></div>
              </div>
              <div className="h-1/2 w-full"></div>
            </div>

            {/* Round 5: Pasatiempo (-1.7) */}
            <div className="relative z-10 flex flex-col items-center h-full justify-center w-1/5 group">
              <div className="h-1/2 w-full"></div>
              <div className="flex flex-col items-center justify-start h-1/2 w-full">
                <div className="w-5 bg-[#D9A441] rounded-b-sm" style={{ height: '65%' }}></div>
                <span className="font-micro-caption text-[9px] text-[#7D5700] font-bold mt-0.5">
                  -1.7
                </span>
              </div>
            </div>
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between px-1 pt-1">
            <div className="w-1/5 flex flex-col items-center text-center">
              <span className="font-micro-caption text-[9px] text-[#1C1F1C] font-bold">R1: 83</span>
              <span className="font-micro-caption text-[8px] text-[#6B7268] truncate w-full">
                Blessings
              </span>
            </div>
            <div className="w-1/5 flex flex-col items-center text-center">
              <span className="font-micro-caption text-[9px] text-[#1C1F1C] font-bold">R2: 81</span>
              <span className="font-micro-caption text-[8px] text-[#6B7268] truncate w-full">
                H. Moon
              </span>
            </div>
            <div className="w-1/5 flex flex-col items-center text-center">
              <span className="font-micro-caption text-[9px] text-[#1C1F1C] font-bold">R3: 85</span>
              <span className="font-micro-caption text-[8px] text-[#6B7268] truncate w-full">
                Harding
              </span>
            </div>
            <div className="w-1/5 flex flex-col items-center text-center">
              <span className="font-micro-caption text-[9px] text-[#1C1F1C] font-bold">R4: 86</span>
              <span className="font-micro-caption text-[8px] text-[#6B7268] truncate w-full">
                Spyglass
              </span>
            </div>
            <div className="w-1/5 flex flex-col items-center text-center">
              <span className="font-micro-caption text-[9px] text-[#1C1F1C] font-bold">R5: 82</span>
              <span className="font-micro-caption text-[8px] text-[#6B7268] truncate w-full">
                Pasatiempo
              </span>
            </div>
          </div>
        </div>

        {/* Trend Caption Banner */}
        <div className="flex items-center gap-2 bg-[#F6F3EC] px-3 py-2 rounded-lg border border-[#E2DED4]/60">
          <span className="material-symbols-outlined text-[#2F5233] text-[18px]">trending_up</span>
          <p className="font-body-md text-xs text-[#6B7268]">
            Overall trending <strong className="text-[#223E26] font-bold">+0.4 strokes improvement</strong> per round over the last 30 days.
          </p>
        </div>
      </section>

      {/* Section 5: Supporting Stats & Dispersion Grid (2x2) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
            SUPPORTING STATS &amp; DISPERSION
          </span>
          <span className="font-micro-caption text-[9px] text-[#6B7268]">DETAIL VIEW</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* 1. Off the Tee */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col justify-between space-y-2 border border-[#E2DED4]/70">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase">DRIVING</span>
                <span className="material-symbols-outlined text-[#223E26] text-[16px]">
                  sports_golf
                </span>
              </div>
              <span className="font-title-lg text-lg text-[#1C1F1C] font-bold block mt-0.5">
                268 yds
              </span>
              <p className="font-micro-caption text-[9px] text-[#6B7268]">9/14 Fairways (64.3%)</p>
            </div>
            {/* Dispersion mini indicator */}
            <div className="space-y-1">
              <div className="flex justify-between font-micro-caption text-[8px] text-[#6B7268]">
                <span>2L</span>
                <span className="font-bold text-[#223E26]">9 CTR</span>
                <span>3R</span>
              </div>
              <div className="grid grid-cols-3 h-1.5 gap-1 rounded-full overflow-hidden bg-[#EEEEEE] p-0.5">
                <div className="bg-[#D9A441]/60 rounded-full"></div>
                <div className="bg-[#2F5233] rounded-full"></div>
                <div className="bg-[#D9A441]/60 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 2. Greens in Regulation */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col justify-between space-y-2 border border-[#E2DED4]/70">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase">APPROACH GIR</span>
                <span className="material-symbols-outlined text-[#7D5700] text-[16px]">flag</span>
              </div>
              <span className="font-title-lg text-lg text-[#1C1F1C] font-bold block mt-0.5">
                55.6%
              </span>
              <p className="font-micro-caption text-[9px] text-[#6B7268]">10 of 18 Greens Hit</p>
            </div>
            <div className="bg-[#F6F3EC] px-2 py-1 rounded-md border border-[#E2DED4]/50">
              <div className="flex justify-between items-center font-micro-caption text-[9px]">
                <span className="text-[#6B7268]">Proximity:</span>
                <span className="text-[#1C1F1C] font-bold">28.4 ft avg</span>
              </div>
            </div>
          </div>

          {/* 3. Scrambling & Short Game */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col justify-between space-y-2 border border-[#E2DED4]/70">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase">SCRAMBLING</span>
                <span className="material-symbols-outlined text-[#223E26] text-[16px]">
                  golf_course
                </span>
              </div>
              <span className="font-title-lg text-lg text-[#1C1F1C] font-bold block mt-0.5">
                62.5%
              </span>
              <p className="font-micro-caption text-[9px] text-[#6B7268]">5 of 8 Up &amp; Down</p>
            </div>
            <div className="flex items-center justify-between font-micro-caption text-[9px] text-[#6B7268] border-t-0 pt-0.5">
              <span>Sand: 2/3 (67%)</span>
              <span className="text-[#223E26] font-bold">7.2 ft chip</span>
            </div>
          </div>

          {/* 4. Putting Efficiency */}
          <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col justify-between space-y-2 border border-[#E2DED4]/70">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-micro-caption text-[9px] text-[#6B7268] uppercase">PUTTING</span>
                <span className="material-symbols-outlined text-[#223E26] text-[16px]">
                  fiber_manual_record
                </span>
              </div>
              <span className="font-title-lg text-lg text-[#1C1F1C] font-bold block mt-0.5">
                29.4
              </span>
              <p className="font-micro-caption text-[9px] text-[#6B7268]">Putts/Round (1.63/GIR)</p>
            </div>
            <div className="bg-[#F6F3EC] px-2 py-1 rounded-md border border-[#E2DED4]/50">
              <div className="flex justify-between items-center font-micro-caption text-[9px]">
                <span className="text-[#6B7268]">&lt;6ft Make:</span>
                <span className="text-[#223E26] font-bold">88.0%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Club Performance & Dispersion Breakdown */}
      <section className="bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#E2DED4]/70">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-[11px] text-[#6B7268] uppercase font-bold">
              CLUB DISPERSION
            </span>
            <h2 className="font-title-md text-base text-[#1C1F1C] font-bold">Key Bag Trajectories</h2>
          </div>
          <button
            onClick={() => onToast('All 14 bag club dispersion profiles ready')}
            className="w-8 h-8 rounded-full bg-[#F6F3EC] text-[#2F5233] flex items-center justify-center hover:bg-[#E2DED4] transition-colors cursor-pointer border border-[#E2DED4]"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        {/* Club Stat Table Row Items */}
        <div className="space-y-2">
          {CLUB_DISPERSIONS.slice(0, 4).map((club) => (
            <div
              key={club.code}
              onClick={() => onSelectClub(club)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all hover:bg-[#F1EEE7] border ${
                club.isLeak
                  ? 'bg-[#F5E9D3]/40 border-[#D9A441]/40'
                  : 'bg-[#F9F8F5] border-[#E2DED4]/60'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-md font-label-pill text-xs flex items-center justify-center font-bold ${
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
                  <div className="flex items-center gap-1">
                    <span className="font-title-md text-xs text-[#1C1F1C] font-bold leading-tight">
                      {club.name}
                    </span>
                    {club.isLeak && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441]"></span>
                    )}
                  </div>
                  <span className="font-micro-caption text-[9px] text-[#6B7268]">
                    Carry {club.carry}y • Total {club.total}y
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-metric-stat text-xs font-bold block ${
                    club.isLeak ? 'text-[#7D5700]' : 'text-[#223E26]'
                  }`}
                >
                  {club.statLabel}
                </span>
                <span
                  className={`font-micro-caption text-[9px] ${
                    club.isLeak ? 'text-[#7D5700] font-bold' : 'text-[#6B7268]'
                  }`}
                >
                  {club.bias}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
