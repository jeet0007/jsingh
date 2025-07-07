"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaHistory, FaArrowLeft, FaArrowRight, FaCog } from "react-icons/fa";
import classNames from "classnames";
import URLInput from "../../../components/URLInput";
import VideoPlayer from "../../../components/VideoPlayer";
import PlaybackHistory from "../../../components/PlaybackHistory";
import { usePlayerStore } from "../../../stores/playerStore";
import { detectEpisodeFromURL } from "../../../utils/episodeDetection";
import {
  EpisodeInfo,
  PlaybackHistory as PlaybackHistoryType,
} from "../../../types/index";

export default function HLSPlayerPage() {
  const {
    currentUrl,
    playerState,
    currentTime,
    currentEpisode,
    autoNext,
    settings,
    isHistoryVisible,
    isLoading,
    error,
    setCurrentUrl,
    setPlayerState,
    setCurrentTime,
    setDuration,
    setCurrentEpisode,
    setAutoNext,
    updateSettings,
    setHistoryVisible,
    setLoading,
    setError,
    saveProgress,
    playNextEpisode,
    playPreviousEpisode,
  } = usePlayerStore();

  const [showSettings, setShowSettings] = useState(false);
  const [resumeTime, setResumeTime] = useState<number>(0);
  const hasInitialSaveRef = useRef<string | null>(null);

  // Handle URL submission
  const handleUrlSubmit = useCallback(
    (url: string, detectedEpisode?: EpisodeInfo) => {
      setLoading(true);
      setCurrentUrl(url);
      setResumeTime(0); // Reset resume time for new URLs
      hasInitialSaveRef.current = null; // Reset initial save tracking

      // Use detected episode or try to detect from URL
      const episodeInfo = detectedEpisode || detectEpisodeFromURL(url);
      setCurrentEpisode(episodeInfo);

      setError(null);
    },
    [setLoading, setCurrentUrl, setCurrentEpisode, setError]
  );

  // Handle history item selection
  const handleHistorySelect = useCallback(
    (item: PlaybackHistoryType) => {
      const episodeInfo = item.series
        ? {
            series: item.series,
            episode: item.episode || 1,
            title: item.title,
            baseUrl: item.url.substring(0, item.url.lastIndexOf("/") + 1),
            urlPattern: item.url,
          }
        : detectEpisodeFromURL(item.url);

      setLoading(true); // Set loading when resuming from history
      setCurrentUrl(item.url);
      setCurrentEpisode(episodeInfo);
      setCurrentTime(item.currentTime);
      setResumeTime(item.currentTime); // Set the time to resume from
      setHistoryVisible(false);
      setError(null); // Clear any previous errors
    },
    [
      setLoading,
      setCurrentUrl,
      setCurrentEpisode,
      setCurrentTime,
      setHistoryVisible,
      setError,
    ]
  );

  // Memoized video player callbacks
  const handleTimeUpdate = useCallback(
    (time: number, total: number) => {
      setCurrentTime(time);
      setDuration(total);
      // Clear loading state when we get meaningful time updates
      if (isLoading && time > 0) {
        setLoading(false);
      }
    },
    [setCurrentTime, setDuration, isLoading, setLoading]
  );

  const handleEpisodeEnd = useCallback(() => {
    setPlayerState("ended");
    // Save final progress when episode ends
    saveProgress();
  }, [setPlayerState, saveProgress]);

  const handleVideoError = useCallback(
    (error: { message: string }) => {
      setError(error.message);
    },
    [setError]
  );

  const handleVideoReady = useCallback(() => {
    // Clear loading state when video is ready to play
    setLoading(false);
  }, [setLoading]);

  // Save progress periodically and on key events
  useEffect(() => {
    if (playerState === "playing" && currentTime > 0) {
      const interval = setInterval(() => {
        saveProgress();
      }, 10000); // Save every 10 seconds

      return () => clearInterval(interval);
    }
  }, [playerState, currentTime, saveProgress]);

  // Save initial progress when user starts watching (only once per URL)
  useEffect(() => {
    if (
      playerState === "playing" &&
      currentTime > 1 &&
      currentUrl &&
      hasInitialSaveRef.current !== currentUrl
    ) {
      // Save initial progress when user has watched at least 1 second
      hasInitialSaveRef.current = currentUrl;
      saveProgress();
    }
  }, [playerState, currentTime, currentUrl, saveProgress]);

  // Clear loading state when video is ready (paused or playing)
  useEffect(() => {
    if ((playerState === "paused" || playerState === "playing") && isLoading) {
      setLoading(false);
    }
  }, [playerState, isLoading, setLoading]);

  // Auto-next episode when video ends
  useEffect(() => {
    if (playerState === "ended" && autoNext && currentEpisode) {
      // Wait 3 seconds then play next episode
      const timeout = setTimeout(() => {
        playNextEpisode();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [playerState, autoNext, currentEpisode, playNextEpisode]);

  // Save progress when video first starts (for history recording)
  useEffect(() => {
    if (currentUrl && currentTime > 1) {
      // Save progress when user has watched at least 1 second
      saveProgress();
    }
  }, [currentUrl, currentTime, saveProgress]);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            HLS Player
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stream HLS videos with episode tracking and history
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div
            className={classNames(
              "lg:col-span-3 space-y-6",
              isHistoryVisible ? "lg:col-span-2" : "lg:col-span-3"
            )}
          >
            {/* URL Input */}
            <div
              className={classNames(
                "p-6 rounded-lg",
                "shadow-neumorphism bg-background"
              )}
            >
              <URLInput
                onSubmit={handleUrlSubmit}
                isLoading={isLoading}
                disabled={playerState === "loading"}
                initialUrl={currentUrl || ""}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div
                className={classNames(
                  "p-4 rounded-lg border border-red-200 dark:border-red-800",
                  "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"
                )}
              >
                <h4 className="font-medium mb-1">Playback Error</h4>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Video Player */}
            {currentUrl && (
              <div className="space-y-4">
                <VideoPlayer
                  url={currentUrl}
                  autoPlay={settings.autoPlay}
                  startTime={resumeTime}
                  onTimeUpdate={handleTimeUpdate}
                  onEpisodeEnd={handleEpisodeEnd}
                  onError={handleVideoError}
                  onReady={handleVideoReady}
                  className="w-full"
                />

                {/* Episode Controls */}
                {currentEpisode && (
                  <div
                    className={classNames(
                      "p-4 rounded-lg",
                      "shadow-neumorphism bg-background"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">
                          {currentEpisode.series}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Episode {currentEpisode.episode}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={playPreviousEpisode}
                          disabled={currentEpisode.episode <= 1}
                          className={classNames(
                            "p-2 rounded",
                            "shadow-neumorphism active:shadow-neumorphismActive",
                            "text-gray-600 dark:text-gray-400",
                            "transition-colors duration-200",
                            currentEpisode.episode <= 1
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:text-gray-800 dark:hover:text-gray-200"
                          )}
                          title="Previous Episode"
                        >
                          <FaArrowLeft className="w-4 h-4" />
                        </button>

                        <button
                          onClick={playNextEpisode}
                          className={classNames(
                            "p-2 rounded",
                            "shadow-neumorphism active:shadow-neumorphismActive",
                            "text-gray-600 dark:text-gray-400",
                            "hover:text-gray-800 dark:hover:text-gray-200",
                            "transition-colors duration-200"
                          )}
                          title="Next Episode"
                        >
                          <FaArrowRight className="w-4 h-4" />
                        </button>

                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={autoNext}
                            onChange={(e) => setAutoNext(e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            Auto-next
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Controls */}
          <div
            className={classNames(
              "lg:col-span-1 space-y-4",
              isHistoryVisible ? "lg:col-span-2" : "lg:col-span-1"
            )}
          >
            {/* Control Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={() => setHistoryVisible(!isHistoryVisible)}
                className={classNames(
                  "flex-1 p-3 rounded-lg flex items-center justify-center space-x-2",
                  "shadow-neumorphism active:shadow-neumorphismActive",
                  "text-gray-700 dark:text-gray-300",
                  "transition-colors duration-200",
                  isHistoryVisible ? "bg-blue-50 dark:bg-blue-900/20" : ""
                )}
              >
                <FaHistory className="w-4 h-4" />
                <span className="text-sm">History</span>
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className={classNames(
                  "p-3 rounded-lg",
                  "shadow-neumorphism active:shadow-neumorphismActive",
                  "text-gray-700 dark:text-gray-300",
                  "transition-colors duration-200"
                )}
              >
                <FaCog className="w-4 h-4" />
              </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div
                className={classNames(
                  "p-4 rounded-lg space-y-4",
                  "shadow-neumorphism bg-background"
                )}
              >
                <h3 className="font-medium text-gray-800 dark:text-gray-200">
                  Settings
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Auto-play
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.autoPlay}
                      onChange={(e) =>
                        updateSettings({ autoPlay: e.target.checked })
                      }
                      className="rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Resume playback
                    </span>
                    <input
                      type="checkbox"
                      checked={settings.resumePlayback}
                      onChange={(e) =>
                        updateSettings({ resumePlayback: e.target.checked })
                      }
                      className="rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Keyboard Shortcuts Help */}
            <div
              className={classNames(
                "p-4 rounded-lg",
                "shadow-neumorphism bg-background"
              )}
            >
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                Keyboard Shortcuts
              </h3>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div>Space/K: Play/Pause</div>
                <div>F: Fullscreen</div>
                <div>M: Mute</div>
                <div>←/→: Seek ±10s</div>
                <div>↑/↓: Volume</div>
                <div>0-9: Jump to %</div>
                <div className="text-blue-600 dark:text-blue-400 mt-2">
                  Built-in video controls
                </div>
              </div>
            </div>
          </div>

          {/* History Sidebar */}
          {isHistoryVisible && (
            <div className="lg:col-span-4 lg:col-start-1">
              <PlaybackHistory
                onSelect={handleHistorySelect}
                onDelete={(_id) => {
                  // Handle delete - could implement actual deletion here
                }}
                onClear={() => {
                  // Handle clear all - could implement actual clearing here
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
