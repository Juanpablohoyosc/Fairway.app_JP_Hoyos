export type TabType = 'home' | 'round-prep' | 'performance' | 'recaps';

export interface HoleTacticalData {
  holeNumber: number;
  par: number;
  yardage: number;
  strokeIndex: number;
  isHardest?: boolean;
  windOrElevationTag: {
    label: string;
    type: 'headwind' | 'crosswind' | 'tailwind' | 'elevation' | 'scoring';
    icon: string;
  };
  bookmarked?: boolean;
  tacticalDirectiveTitle: string;
  tacticalAdvice: string;
  iconName: string;
  chips: Array<{
    label: string;
    icon: string;
    isHighlight?: boolean;
  }>;
  targetPlotted: {
    name: string;
    yardage: string;
    gpsCoords?: string;
    notes?: string;
  };
}

export interface WaypointMarker {
  id: string;
  hole: number;
  name: string;
  subtitle: string;
  yardage: number;
  type: 'safe' | 'hinge' | 'carry' | 'pin';
  gps: string;
}

export interface ClubDispersionItem {
  code: string;
  name: string;
  carry: number;
  total: number;
  statLabel: string;
  bias: string;
  isLeak?: boolean;
  leakPenalty?: string;
}

export interface RoundRecapItem {
  id: string;
  courseName: string;
  subLocation: string;
  date: string;
  score: number;
  toPar: string;
  netScore: string;
  courseDetails: string;
  highlightTitle: string;
  highlightDesc: string;
  highlightIcon: string;
  badgeTag?: string;
  fairways: string;
  avgDriving: string;
  putts: string;
  gir: string;
  tagFilter: 'pasatiempo' | 'blessings' | 'coast' | 'harding';
  frontScore?: number;
  backScore?: number;
  holeScores?: number[];
  holePars?: number[];
}
