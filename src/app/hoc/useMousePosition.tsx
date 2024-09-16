"use client";
import React from "react";

export interface MousePosition {
  x: number | null;
  y: number | null;
}

export const useMousePosition = (handleMouseMovement: (position: MousePosition) => void) => {
  const [mousePosition, setMousePosition] = React.useState<MousePosition>({ x: null, y: null });

  const updateMousePosition = React.useCallback((ev: MouseEvent) => {
    const newPosition = { x: ev.clientX, y: ev.clientY };
    setMousePosition(newPosition);
    handleMouseMovement(newPosition);
  }, [handleMouseMovement]);

  React.useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  if (!mousePosition.x || !mousePosition.y) return null;
  return mousePosition;
};
