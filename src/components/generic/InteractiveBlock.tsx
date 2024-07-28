"use client";

import { useMousePosition } from "../../app/hoc/useMousePosition";

export const InteractiveBlock = () => {
  const mousePosition = useMousePosition();
  if (!mousePosition) return null;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-10 h-10 bg-primary rounded-full bg-secondary"
        style={{
          position: "relative",
          top: mousePosition.y as number,
          left: mousePosition.x as number,
        }}
      ></div>
    </div>
  );
};
