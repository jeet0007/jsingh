"use client";

import { useEffect, useRef } from "react";
import { HLSPlayerProps } from "../types";
import classNames from "classnames";
import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
} from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

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
  const playerRef = useRef<MediaPlayerInstance>(null);

  useEffect(() => {
    if (!playerRef.current) return;
  }, [playerRef]);
  return (
    <div
      className={classNames(
        "w-full relative rounded-lg overflow-hidden",
        "shadow-neumorphism bg-black",
        className
      )}
    >
      {url && (
        <MediaPlayer
          ref={playerRef}
          src={url}
          storage="vidstack-player"
          autoPlay={autoPlay}
          onLoadedMetadata={(_) => onReady?.()}
          onEnded={onEpisodeEnd}
          onTimeUpdate={(detail, _) => {
            onTimeUpdate?.(
              detail.currentTime,
              playerRef.current?.duration || 0
            );
          }}
          onError={(detail, _) =>
            onError?.({
              message: detail.message,
              timestamp: new Date(),
              code: `${detail.code}` || "unknown",
            })
          }
          currentTime={startTime || 0}
        >
          <MediaProvider />
          <PlyrLayout icons={plyrLayoutIcons} />
        </MediaPlayer>
      )}
    </div>
  );
};

export default VidstackPlayer;
