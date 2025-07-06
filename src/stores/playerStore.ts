'use client';

import { create } from 'zustand';
import { PlayerState, EpisodeInfo, PlaybackHistory, PlayerSettings } from '../types';
import { getPlayerSettings, savePlayerSettings, savePlaybackHistory } from '../services/localStorage';

interface PlayerStore {
  // Player state
  currentUrl: string | null;
  playerState: PlayerState;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  
  // Episode info
  currentEpisode: EpisodeInfo | null;
  autoNext: boolean;
  
  // Settings
  settings: PlayerSettings;
  
  // History
  isHistoryVisible: boolean;
  
  // Loading states
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUrl: (url: string | null) => void;
  setPlayerState: (state: PlayerState) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setFullscreen: (isFullscreen: boolean) => void;
  setCurrentEpisode: (episode: EpisodeInfo | null) => void;
  setAutoNext: (autoNext: boolean) => void;
  updateSettings: (settings: Partial<PlayerSettings>) => void;
  setHistoryVisible: (visible: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Complex actions
  saveProgress: () => void;
  playNextEpisode: () => void;
  playPreviousEpisode: () => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  currentUrl: null,
  playerState: 'idle',
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  isFullscreen: false,
  currentEpisode: null,
  autoNext: getPlayerSettings().autoNext,
  settings: getPlayerSettings(),
  isHistoryVisible: false,
  isLoading: false,
  error: null,

  // Simple setters
  setCurrentUrl: (url) => set({ currentUrl: url, error: null }),
  setPlayerState: (playerState) => set({ playerState }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => {
    set({ volume });
    get().updateSettings({ defaultVolume: volume });
  },
  setFullscreen: (isFullscreen) => set({ isFullscreen }),
  setCurrentEpisode: (currentEpisode) => set({ currentEpisode }),
  setAutoNext: (autoNext) => {
    set({ autoNext });
    // Update settings without triggering re-render
    const currentSettings = get().settings;
    const updatedSettings = { ...currentSettings, autoNext };
    savePlayerSettings(updatedSettings);
    set({ settings: updatedSettings });
  },
  setHistoryVisible: (isHistoryVisible) => set({ isHistoryVisible }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Settings management
  updateSettings: (newSettings) => {
    const currentSettings = get().settings;
    const updatedSettings = { ...currentSettings, ...newSettings };
    set({ settings: updatedSettings });
    savePlayerSettings(updatedSettings);
  },

  // Save progress to localStorage
  saveProgress: () => {
    const state = get();
    if (!state.currentUrl || state.duration === 0) return;

    const historyItem: PlaybackHistory = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      url: state.currentUrl,
      title: state.currentEpisode?.title,
      series: state.currentEpisode?.series,
      episode: state.currentEpisode?.episode,
      currentTime: state.currentTime,
      duration: state.duration,
      watchProgress: (state.currentTime / state.duration) * 100,
      lastWatched: new Date(),
    };

    savePlaybackHistory(historyItem);
  },

  // Episode navigation
  playNextEpisode: () => {
    const state = get();
    if (!state.currentEpisode) return;

    const nextEpisode = state.currentEpisode.episode + 1;
    const nextUrl = state.currentEpisode.urlPattern.replace('{episode}', nextEpisode.toString());
    
    const nextEpisodeInfo: EpisodeInfo = {
      ...state.currentEpisode,
      episode: nextEpisode,
    };

    set({
      currentUrl: nextUrl,
      currentEpisode: nextEpisodeInfo,
      currentTime: 0,
      playerState: 'loading',
    });
  },

  playPreviousEpisode: () => {
    const state = get();
    if (!state.currentEpisode || state.currentEpisode.episode <= 1) return;

    const prevEpisode = state.currentEpisode.episode - 1;
    const prevUrl = state.currentEpisode.urlPattern.replace('{episode}', prevEpisode.toString());
    
    const prevEpisodeInfo: EpisodeInfo = {
      ...state.currentEpisode,
      episode: prevEpisode,
    };

    set({
      currentUrl: prevUrl,
      currentEpisode: prevEpisodeInfo,
      currentTime: 0,
      playerState: 'loading',
    });
  },

  // Reset all state
  reset: () => set({
    currentUrl: null,
    playerState: 'idle',
    currentTime: 0,
    duration: 0,
    currentEpisode: null,
    isLoading: false,
    error: null,
  }),
}));