// Core data models for HLS Player

export interface PlaybackHistory {
  id: string;
  url: string;
  title?: string;
  series?: string;
  episode?: number;
  currentTime: number;
  duration: number;
  watchProgress: number; // 0-100%
  lastWatched: Date;
  thumbnail?: string;
}

export interface EpisodeInfo {
  series: string;
  episode: number;
  title?: string;
  baseUrl: string;
  urlPattern: string;
  totalEpisodes?: number;
}

export interface PlayerSettings {
  autoPlay: boolean;
  defaultVolume: number; // 0-1
  preferredQuality: string;
  autoNext: boolean;
  resumePlayback: boolean;
}

// Player state management types
export type PlayerState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';

export type PlaybackSpeed = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;

export type VideoQuality = {
  height: number;
  width: number;
  bitrate: number;
  label: string;
};

// Player action types
export interface PlayerAction {
  type: 'PLAY' | 'PAUSE' | 'SEEK' | 'SET_VOLUME' | 'SET_SPEED' | 'SET_QUALITY' | 'TOGGLE_FULLSCREEN' | 'LOAD_VIDEO' | 'SET_ERROR';
  payload?: any;
}

// URL validation and episode detection
export interface URLValidationResult {
  isValid: boolean;
  isHLS: boolean;
  detectedEpisode?: EpisodeInfo;
  error?: string;
}


// Storage data structures
export interface StorageData {
  playbackHistory: PlaybackHistory[];
  playerSettings: PlayerSettings;
  lastUpdated: Date;
  version: string; // For data migration
}

// Error types
export interface PlayerError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Component prop types
export interface HLSPlayerProps {
  url?: string;
  autoPlay?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEpisodeEnd?: () => void;
  onError?: (error: PlayerError) => void;
  onReady?: () => void;
  className?: string;
}

export interface HistoryListProps {
  history: PlaybackHistory[];
  onSelect: (item: PlaybackHistory) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
}

export interface EpisodeControlsProps {
  currentEpisode?: EpisodeInfo;
  onPrevious?: () => void;
  onNext?: () => void;
  onEpisodeSelect?: (episode: number) => void;
  autoNext: boolean;
  onAutoNextToggle: (enabled: boolean) => void;
}

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Prettify<Omit<T, K> & Partial<Pick<T, K>>>;

export type RequiredFields<T, K extends keyof T> = Prettify<T & Required<Pick<T, K>>>;