"use client";

import { FaStepForward } from "react-icons/fa";
import { usePlayerStore } from "../stores/playerStore";
import { Tooltip } from "@vidstack/react";

const NextEpisodeButton = () => {
  const { currentEpisode, playNextEpisode } = usePlayerStore();

  if (!currentEpisode) return null;

  const handleNextEpisode = () => {
    playNextEpisode();
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          data-tooltip="Next Episode"
          onClick={handleNextEpisode}
          aria-label="Next Episode"
        >
          <FaStepForward className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content">
        Next Episode
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

export default NextEpisodeButton;
