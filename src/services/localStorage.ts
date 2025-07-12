'use client';

import { PlaybackHistory, PlayerSettings, StorageData, SessionState, EpisodeInfo } from "../types";


// Storage keys
const STORAGE_KEYS = {
  PLAYBACK_HISTORY: 'hls-player-history',
  PLAYER_SETTINGS: 'hls-player-settings',
  CURRENT_SESSION: 'hls-player-session',
  DATA_VERSION: 'hls-player-version',
} as const;

// Current data version for migration
const CURRENT_VERSION = '1.0.0';

// Default player settings
const DEFAULT_SETTINGS: PlayerSettings = {
  autoPlay: false,
  defaultVolume: 0.8,
  preferredQuality: 'auto',
  autoNext: false,
  resumePlayback: true,
};

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// Safe JSON parsing with fallback
const safeJsonParse = <T>(jsonString: string | null, fallback: T): T => {
  if (!jsonString) return fallback;
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
};

// Handle localStorage quota exceeded
const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error('localStorage quota exceeded or unavailable:', error);
    // Try to clear some old history to make space
    try {
      clearOldHistory();
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }
};

// Clear old history entries (keep only last 50)
const clearOldHistory = (): void => {
  try {
    const history = getPlaybackHistory();
    if (history.length > 50) {
      const recent = history
        .sort((a, b) => new Date(b.lastWatched).getTime() - new Date(a.lastWatched).getTime())
        .slice(0, 50);

      localStorage.setItem(STORAGE_KEYS.PLAYBACK_HISTORY, JSON.stringify(recent));
    }
  } catch (error) {
    console.error('Failed to clear old history:', error);
  }
};

// Data migration utilities
const migrateData = (): void => {
  const currentVersion = localStorage.getItem(STORAGE_KEYS.DATA_VERSION);

  if (currentVersion !== CURRENT_VERSION) {
    // Perform migrations based on version
    console.log('Migrating localStorage data from', currentVersion, 'to', CURRENT_VERSION);

    // Example migration logic
    if (!currentVersion) {
      // First time user, no migration needed
    }

    // Update version
    localStorage.setItem(STORAGE_KEYS.DATA_VERSION, CURRENT_VERSION);
  }
};

// Playback History Functions
export const savePlaybackHistory = (history: PlaybackHistory): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const existingHistory = getPlaybackHistory();
    const existingIndex = existingHistory.findIndex(item => item.url === history.url);

    if (existingIndex >= 0) {
      // Update existing entry
      existingHistory[existingIndex] = {
        ...existingHistory[existingIndex],
        ...history,
        lastWatched: new Date(),
      };
    } else {
      // Add new entry
      existingHistory.unshift({
        ...history,
        lastWatched: new Date(),
      });
    }

    // Keep only last 100 entries
    const trimmedHistory = existingHistory.slice(0, 100);

    return safeSetItem(STORAGE_KEYS.PLAYBACK_HISTORY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Failed to save playback history:', error);
    return false;
  }
};

export const getPlaybackHistory = (): PlaybackHistory[] => {
  if (!isLocalStorageAvailable()) return [];

  migrateData();

  const historyJson = localStorage.getItem(STORAGE_KEYS.PLAYBACK_HISTORY);
  const history = safeJsonParse(historyJson, [] as PlaybackHistory[]);

  // Convert date strings back to Date objects
  return history.map(item => ({
    ...item,
    lastWatched: new Date(item.lastWatched),
  }));
};

export const getPlaybackHistoryItem = (url: string): PlaybackHistory | null => {
  const history = getPlaybackHistory();
  return history.find(item => item.url === url) || null;
};

export const removePlaybackHistoryItem = (id: string): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const history = getPlaybackHistory();
    const filteredHistory = history.filter(item => item.id !== id);

    return safeSetItem(STORAGE_KEYS.PLAYBACK_HISTORY, JSON.stringify(filteredHistory));
  } catch (error) {
    console.error('Failed to remove playback history item:', error);
    return false;
  }
};

export const clearPlaybackHistory = (): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(STORAGE_KEYS.PLAYBACK_HISTORY);
    return true;
  } catch (error) {
    console.error('Failed to clear playback history:', error);
    return false;
  }
};

// Player Settings Functions
export const savePlayerSettings = (settings: Partial<PlayerSettings>): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const currentSettings = getPlayerSettings();
    const newSettings = { ...currentSettings, ...settings };

    return safeSetItem(STORAGE_KEYS.PLAYER_SETTINGS, JSON.stringify(newSettings));
  } catch (error) {
    console.error('Failed to save player settings:', error);
    return false;
  }
};

export const getPlayerSettings = (): PlayerSettings => {
  if (!isLocalStorageAvailable()) return DEFAULT_SETTINGS;

  migrateData();

  const settingsJson = localStorage.getItem(STORAGE_KEYS.PLAYER_SETTINGS);
  const settings = safeJsonParse(settingsJson, DEFAULT_SETTINGS);

  // Merge with defaults to ensure all fields are present
  return { ...DEFAULT_SETTINGS, ...settings };
};

export const resetPlayerSettings = (): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    return safeSetItem(STORAGE_KEYS.PLAYER_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  } catch (error) {
    console.error('Failed to reset player settings:', error);
    return false;
  }
};

// Storage Statistics
export const getStorageStats = () => {
  if (!isLocalStorageAvailable()) {
    return {
      available: false,
      historyCount: 0,
      estimatedSize: 0,
    };
  }

  const history = getPlaybackHistory();
  const settings = getPlayerSettings();

  // Estimate storage size (rough calculation)
  const historySize = JSON.stringify(history).length;
  const settingsSize = JSON.stringify(settings).length;

  return {
    available: true,
    historyCount: history.length,
    estimatedSize: historySize + settingsSize,
    historySize,
    settingsSize,
  };
};

// Session State Functions
export const saveCurrentSession = (
  url: string | null,
  episode: EpisodeInfo | null,
  currentTime: number = 0
): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const sessionState: SessionState = {
      currentUrl: url,
      currentEpisode: episode,
      currentTime,
      lastUpdated: new Date(),
    };

    return safeSetItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(sessionState));
  } catch (error) {
    console.error('Failed to save current session:', error);
    return false;
  }
};

export const getCurrentSession = (): SessionState | null => {
  if (!isLocalStorageAvailable()) return null;

  try {
    const sessionJson = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (!sessionJson) return null;

    const session = safeJsonParse(sessionJson, null as SessionState | null);
    if (!session) return null;

    // Convert date string back to Date object
    session.lastUpdated = new Date(session.lastUpdated);

    // Check if session is not too old (e.g., more than 24 hours)
    const hoursSinceUpdate = (Date.now() - session.lastUpdated.getTime()) / (1000 * 60 * 60);
    if (hoursSinceUpdate > 24) {
      clearCurrentSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Failed to get current session:', error);
    return null;
  }
};

export const clearCurrentSession = (): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    return true;
  } catch (error) {
    console.error('Failed to clear current session:', error);
    return false;
  }
};

// Clear all data
export const clearAllData = (): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    localStorage.removeItem(STORAGE_KEYS.PLAYBACK_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.PLAYER_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    localStorage.removeItem(STORAGE_KEYS.DATA_VERSION);
    return true;
  } catch (error) {
    console.error('Failed to clear all data:', error);
    return false;
  }
};

// Export/Import functionality
export const exportData = (): string | null => {
  if (!isLocalStorageAvailable()) return null;

  try {
    const data: StorageData = {
      playbackHistory: getPlaybackHistory(),
      playerSettings: getPlayerSettings(),
      lastUpdated: new Date(),
      version: CURRENT_VERSION,
    };

    return JSON.stringify(data, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    return null;
  }
};

export const importData = (jsonData: string): boolean => {
  if (!isLocalStorageAvailable()) return false;

  try {
    const data: StorageData = JSON.parse(jsonData);

    // Validate data structure
    if (!data.playbackHistory || !data.playerSettings || !data.version) {
      throw new Error('Invalid data format');
    }

    // Import data
    if (data.playbackHistory.length > 0) {
      safeSetItem(STORAGE_KEYS.PLAYBACK_HISTORY, JSON.stringify(data.playbackHistory));
    }

    if (data.playerSettings) {
      safeSetItem(STORAGE_KEYS.PLAYER_SETTINGS, JSON.stringify(data.playerSettings));
    }

    return true;
  } catch (error) {
    console.error('Failed to import data:', error);
    return false;
  }
};