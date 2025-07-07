"use client";

import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import classNames from "classnames";
import { HLSPlayerProps, PlayerState } from "../types";

// Import HLS.js
let Hls: any = null;

// Dynamic import for client-side only
const loadHLS = async () => {
  if (typeof window !== "undefined") {
    const hlsModule = await import("hls.js");
    Hls = hlsModule.default;
  }
};

const VideoPlayer: React.FC<HLSPlayerProps> = ({
  url,
  autoPlay = false,
  startTime = 0,
  onTimeUpdate,
  onEpisodeEnd,
  onError,
  onReady,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<any>(null);
  const hasSoughtRef = useRef<boolean>(false);
  const lastStartTimeRef = useRef<number>(0);

  const [playerState, setPlayerState] = useState<PlayerState>("idle");
  const [isHLSLoaded, setIsHLSLoaded] = useState(false);

  // Load HLS library
  useEffect(() => {
    loadHLS().then(() => {
      setIsHLSLoaded(true);
    });
  }, []);

  // Load HLS stream
  useEffect(() => {
    if (!url || !isHLSLoaded || !videoRef.current || !Hls) return;

    const videoElement = videoRef.current;
    setPlayerState("loading");

    // Reset seek tracking for new URLs
    hasSoughtRef.current = false;
    lastStartTimeRef.current = startTime;

    // Clean up existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Check HLS support
    if (Hls.isSupported()) {
      // Use HLS.js for browsers that don't have native HLS support
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });

      hlsRef.current = hls;

      hls.loadSource(url);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setPlayerState("paused");
        onReady?.(); // Signal that video is ready

        // Seek to start time if specified (for resuming from history)
        if (startTime > 0 && !hasSoughtRef.current) {
          videoElement.currentTime = startTime;
          hasSoughtRef.current = true;
        }

        if (autoPlay) {
          videoElement.play().catch(console.error);
        }
      });

      hls.on(Hls.Events.ERROR, (event: any, data: any) => {
        if (data.fatal) {
          setPlayerState("error");
          onError?.({
            code: "HLS_ERROR",
            message: `HLS playback failed: ${data.type}`,
            details: data,
            timestamp: new Date(),
          });
        }
      });
    } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      // Native HLS support (Safari)
      videoElement.src = url;
      setPlayerState("paused");
      onReady?.(); // Signal that video is ready

      // Seek to start time if specified (for resuming from history)
      if (startTime > 0 && !hasSoughtRef.current) {
        videoElement.currentTime = startTime;
        hasSoughtRef.current = true;
      }

      if (autoPlay) {
        videoElement.play().catch(console.error);
      }
    } else {
      setPlayerState("error");
      onError?.({
        code: "HLS_NOT_SUPPORTED",
        message: "HLS is not supported in this browser",
        timestamp: new Date(),
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, isHLSLoaded, autoPlay, onError, onReady]);

  // Handle seeking when startTime changes
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || startTime <= 0) return;

    // Only seek if startTime has changed and we haven't sought yet for this startTime
    if (startTime !== lastStartTimeRef.current && !hasSoughtRef.current) {
      videoElement.currentTime = startTime;
      hasSoughtRef.current = true;
      lastStartTimeRef.current = startTime;
    }
  }, [startTime]);

  // Video event listeners
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setPlayerState("playing");
    const handlePause = () => setPlayerState("paused");
    const handleEnded = () => {
      setPlayerState("ended");
      onEpisodeEnd?.();
    };
    const handleTimeUpdate = () => {
      onTimeUpdate?.(videoElement.currentTime, videoElement.duration || 0);
    };
    const handleError = () => {
      setPlayerState("error");
      onError?.({
        code: "VIDEO_ERROR",
        message: "Video playback error",
        timestamp: new Date(),
      });
    };

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);
    videoElement.addEventListener("error", handleError);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("timeupdate", handleTimeUpdate);
      videoElement.removeEventListener("error", handleError);
    };
  }, [onTimeUpdate, onEpisodeEnd, onError]);

  if (!isHLSLoaded) {
    return (
      <div
        className={classNames(
          "w-full aspect-video rounded-lg",
          "shadow-neumorphism bg-background",
          "flex items-center justify-center",
          className
        )}
      >
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <FaSpinner className="w-6 h-6 animate-spin" />
          <span>Loading player...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "w-full relative rounded-lg overflow-hidden",
        "shadow-neumorphism bg-black",
        className
      )}
    >
      {/* Simple Video Element with native controls */}
      <video
        id={`${url}-video`}
        ref={videoRef}
        className="w-full h-full"
        controls
        playsInline
        crossOrigin="anonymous"
      />

      {/* Loading Overlay */}
      {playerState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="flex items-center space-x-2 text-white">
            <FaSpinner className="w-6 h-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {playerState === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-10">
          <div className="text-center text-white">
            <div className="text-xl mb-2">⚠️</div>
            <div>Playback Error</div>
            <div className="text-sm opacity-75 mt-1">
              Please try a different stream
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
