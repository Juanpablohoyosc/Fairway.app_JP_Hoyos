import { useState, useEffect } from 'react';
import { TabType, WaypointMarker, ClubDispersionItem, RoundRecapItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { RoundPrepScreen } from './components/RoundPrepScreen';
import { PerformanceScreen } from './components/PerformanceScreen';
import { RecapsScreen } from './components/RecapsScreen';
import { ScorecardModal } from './components/ScorecardModal';
import { ShareStoryModal } from './components/ShareStoryModal';
import { WaypointModal } from './components/WaypointModal';
import { ClubModal } from './components/ClubModal';
import { DrillModal, DrillType } from './components/DrillModal';
import { LiveRoundModal } from './components/LiveRoundModal';
import { HandicapModal } from './components/HandicapModal';
import { BLESSINGS_HOLES, RECAP_ITEMS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [selectedScorecardRecap, setSelectedScorecardRecap] = useState<RoundRecapItem | null>(null);
  const [selectedShareRecap, setSelectedShareRecap] = useState<RoundRecapItem | null>(null);
  const [selectedWaypoint, setSelectedWaypoint] = useState<WaypointMarker | null>(null);
  const [selectedClub, setSelectedClub] = useState<ClubDispersionItem | null>(null);
  const [activeDrill, setActiveDrill] = useState<DrillType | null>(null);
  const [isLiveRoundOpen, setIsLiveRoundOpen] = useState(false);
  const [isHandicapModalOpen, setIsHandicapModalOpen] = useState(false);

  // Toast trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="bg-[#F6F3EC] text-[#1C1F1C] min-h-screen flex flex-col font-sans relative selection:bg-[#2F5233] selection:text-white">
      {/* Toast Notification */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#223E26] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 transition-all duration-300 pointer-events-none ${
          toastMessage
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-[#D9A441] text-[18px]">verified</span>
        <span className="font-label-pill text-xs text-[#F9F8F5] whitespace-nowrap">
          {toastMessage}
        </span>
      </div>

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onOpenProfile={() => setIsHandicapModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-safe">
        {activeTab === 'home' ? (
          <HomeScreen
            onNavigateTab={(tab) => setActiveTab(tab)}
            onStartLiveRound={() => setIsLiveRoundOpen(true)}
            onOpenDrill={(drill) => setActiveDrill(drill)}
            onOpenScorecard={(recap) => setSelectedScorecardRecap(recap)}
            onOpenShareModal={(recap) => setSelectedShareRecap(recap)}
            onOpenHandicap={() => setIsHandicapModalOpen(true)}
            onToast={showToast}
          />
        ) : activeTab === 'round-prep' ? (
          <RoundPrepScreen
            onSelectWaypoint={(wp) => setSelectedWaypoint(wp)}
            onOpenDrill={() => setActiveDrill('putting-speed')}
            onStartLiveRound={() => setIsLiveRoundOpen(true)}
            onToast={showToast}
          />
        ) : activeTab === 'performance' ? (
          <PerformanceScreen
            onOpenDrill={() => setActiveDrill('approach-leak')}
            onSelectClub={(club) => setSelectedClub(club)}
            onToast={showToast}
          />
        ) : (
          <RecapsScreen
            onOpenScorecard={(recap) => setSelectedScorecardRecap(recap)}
            onOpenShareModal={(recap) => setSelectedShareRecap(recap)}
            onToast={showToast}
          />
        )}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />

      {/* Modals & Dialogs */}
      <ScorecardModal
        recap={selectedScorecardRecap}
        onClose={() => setSelectedScorecardRecap(null)}
        onShare={(recap) => {
          setSelectedScorecardRecap(null);
          setSelectedShareRecap(recap);
        }}
      />

      <ShareStoryModal
        isOpen={!!selectedShareRecap}
        recap={selectedShareRecap}
        onClose={() => setSelectedShareRecap(null)}
        onTriggerToast={showToast}
      />

      <WaypointModal
        waypoint={selectedWaypoint}
        onClose={() => setSelectedWaypoint(null)}
        onToast={showToast}
      />

      <ClubModal
        club={selectedClub}
        onClose={() => setSelectedClub(null)}
        onOpenDrill={() => {
          setSelectedClub(null);
          setActiveDrill('approach-leak');
        }}
      />

      <DrillModal
        drillType={activeDrill}
        onClose={() => setActiveDrill(null)}
        onToast={showToast}
      />

      <LiveRoundModal
        isOpen={isLiveRoundOpen}
        holes={BLESSINGS_HOLES}
        onClose={() => setIsLiveRoundOpen(false)}
        onToast={showToast}
      />

      <HandicapModal
        isOpen={isHandicapModalOpen}
        onClose={() => setIsHandicapModalOpen(false)}
      />
    </div>
  );
}
