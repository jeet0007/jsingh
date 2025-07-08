'use client';

import { create } from 'zustand';
import { PlayerState, EpisodeInfo, PlaybackHistory, PlayerSettings } from '../types';
import { getPlayerSettings, savePlayerSettings, savePlaybackHistory } from '../services/localStorage';

interface PlayerStore {
  // Player state (simplified - Vidstack handles media state)
  currentUrl: string | null;
  playerState: PlayerState;
  
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
  setCurrentEpisode: (episode: EpisodeInfo | null) => void;
  setAutoNext: (autoNext: boolean) => void;
  updateSettings: (settings: Partial<PlayerSettings>) => void;
  setHistoryVisible: (visible: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Episode navigation
  playNextEpisode: () => void;
  playPreviousEpisode: () => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Initial state
  currentUrl: null,
  playerState: 'idle',
  currentEpisode: null,
  autoNext: getPlayerSettings().autoNext,
  settings: getPlayerSettings(),
  isHistoryVisible: false,
  isLoading: false,
  error: null,

  // Simple setters
  setCurrentUrl: (url) => set({ currentUrl: url, error: null }),
  setPlayerState: (playerState) => set({ playerState }),
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
      playerState: 'loading',
      isLoading: true,
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
      playerState: 'loading',
      isLoading: true,
    });
  },

  // Reset all state
  reset: () => set({
    currentUrl: null,
    playerState: 'idle',
    currentEpisode: null,
    isLoading: false,
    error: null,
  }),
}));