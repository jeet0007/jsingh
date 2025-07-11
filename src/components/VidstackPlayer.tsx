"use client";

import { useEffect, useRef, useState } from "react";
import { HLSPlayerProps } from "../types";
import classNames from "classnames";
import { FaSpinner } from "react-icons/fa";
import NextEpisodeButton from "./NextEpisodeButton";
import { optimizedHLSConfig } from "../config/hlsConfig";

const VidstackPlayer: React.FC<HLSPlayerProps> = ({
  url,
  autoPlay = false,
  className = "",
  onReady,
  onEpisodeEnd,
  onError,
  onTimeUpdate,
  startTime,
}) => {
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);
  const [VidstackComponents, setVidstackComponents] = useState<{
    MediaPlayer: any;
    MediaProvider: any;
    PlyrLayout: any;
    plyrLayoutIcons: any;
  } | null>(null);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Dynamic import of Vidstack components
  useEffect(() => {
    if (!isClient) return;

    const loadVidstack = async () => {
      try {
        const [
          { MediaPlayer, MediaProvider },
          { PlyrLayout, plyrLayoutIcons },
        ] = await Promise.all([
          import("@vidstack/react"),
          import("@vidstack/react/player/layouts/plyr"),
        ]);

        setVidstackComponents({
          MediaPlayer,
          MediaProvider,
          PlyrLayout,
          plyrLayoutIcons,
        });
      } catch (error) {
        console.error("Failed to load Vidstack:", error);
        onError?.({
          message: "Failed to load video player",
          timestamp: new Date(),
          code: "VIDSTACK_LOAD_ERROR",
        });
      }
    };

    loadVidstack();
  }, [isClient, onError]);

  // Configure HLS when player and URL are available
  useEffect(() => {
    if (!playerRef.current || !url) return;

    const configureHLS = () => {
      const player = playerRef.current;
      if (player?.provider?.type === 'hls' && player.provider.library?.config) {
        console.log('Configuring HLS with optimized settings...');
        Object.assign(player.provider.library.config, optimizedHLSConfig);
      }
    };

    // Try to configure immediately
    configureHLS();

    // Also try after a short delay to ensure provider is fully loaded
    const timeoutId = setTimeout(configureHLS, 100);

    return () => clearTimeout(timeoutId);
  }, [url, VidstackComponents]);

  // Loading state
  if (!isClient || !VidstackComponents) {
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

  // No URL provided
  if (!url) {
    return (
      <div
        className={classNames(
          "w-full aspect-video rounded-lg",
          "shadow-neumorphism bg-background",
          "flex items-center justify-center",
          className
        )}
      >
        <div className="text-gray-600 dark:text-gray-400">
          No video URL provided
        </div>
      </div>
    );
  }

  const { MediaPlayer, MediaProvider, PlyrLayout, plyrLayoutIcons } =
    VidstackComponents;

  return (
    <div
      className={classNames(
        "w-full relative rounded-lg overflow-hidden",
        "shadow-neumorphism bg-black",
        className
      )}
    >
      <MediaPlayer
        ref={playerRef}
        src={url}
        storage="vidstack-player"
        autoPlay={autoPlay}
        load="eager" // Use eager loading for immediate media loading
        preferNativeHLS={false} // Use HLS.js for better control over segment loading
        onLoadedMetadata={(_: any) => onReady?.()}
        onEnded={onEpisodeEnd}
        onTimeUpdate={(detail: any, _: any) => {
          onTimeUpdate?.(detail.currentTime, playerRef.current?.duration || 0);
        }}
        onError={(detail: any, _: any) =>
          onError?.({
            message: detail.message,
            timestamp: new Date(),
            code: `${detail.code}` || "unknown",
          })
        }
        currentTime={startTime || 0}
      >
        <MediaProvider />
        {/* Plyr Layout with custom icons and controls */}
        <PlyrLayout
          icons={plyrLayoutIcons}
          slots={{
            beforeFullscreenButton: <NextEpisodeButton />,
          }}
        />
      </MediaPlayer>
    </div>
  );
};

export default VidstackPlayer;
