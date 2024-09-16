"use client";

import { useCallback, useRef, MutableRefObject, useEffect } from "react";
import { MousePosition, useMousePosition } from "../../app/hoc/useMousePosition";
import { gsap } from "gsap";
import { throttle } from "lodash";

export const InteractiveBlock = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const circlesRef: MutableRefObject<(SVGCircleElement | null)[]> = useRef([]);

  const centerX = 100;
  const centerY = 100;
  const maxDistance = 40; // Maximum distance the top circle can move
  const springStrength = 0.01; // Adjusts how quickly circles return to center
  const connectionStrength = 0.9; // Adjusts how strongly circles pull on each other

  const handleMouseMovement = useCallback((position: MousePosition) => {
    throttle(() => {
      const circles = circlesRef.current;
      const { x: mouseX, y: mouseY } = position;
      if (!mouseX || !mouseY) return;

      // Calculate the movement for the bottom circle
      const dx = mouseX - window.innerWidth / 2;
      const dy = mouseY - window.innerHeight / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);

      const bottomCircleX = centerX + Math.min(distance, maxDistance) * Math.cos(angle) / 5;
      const bottomCircleY = centerY + Math.min(distance, maxDistance) * Math.sin(angle) / 5;

      // Animate each circle, influenced by the circle below it
      for (let index = circles.length - 1; index >= 0; index--) {
        const circle = circles[index];
        if (!circle) continue;

        if (index === circles.length - 1) {
          // Bottom circle follows the mouse directly
          gsap.to(circle, {
            duration: 0.5,
            attr: { cx: bottomCircleX, cy: bottomCircleY },
            ease: "power2.out"
          });
        } else {
          // Upper circles are pulled towards the circle below them
          const childCircle = circles[index + 1];
          if (!childCircle) continue;

          const childX = parseFloat(childCircle.getAttribute('cx') || '0');
          const childY = parseFloat(childCircle.getAttribute('cy') || '0');
          const currentX = parseFloat(circle.getAttribute('cx') || '0');
          const currentY = parseFloat(circle.getAttribute('cy') || '0');

          const targetX = currentX + (childX - currentX) * connectionStrength;
          const targetY = currentY + (childY - currentY) * connectionStrength;

          gsap.to(circle, {
            duration: 0.5,
            attr: {
              cx: targetX + (centerX - targetX) * springStrength,
              cy: targetY + (centerY - targetY) * springStrength
            },
            ease: "power2.out"
          });
        }
      }
    }, 100)();
  }, []);


  useMousePosition(handleMouseMovement);
  const circles = [
    { radius: 90, blur: 3, offset: 2, color: "#00000025" },
    { radius: 55, blur: 2.5, offset: 1.5, color: '#b2acac44' },
    { radius: 35, blur: 2, offset: 1, color: '#e0e0e0' },
    { radius: 15, blur: 1.5, offset: 0.5, color: '#00000063' },
  ];
  return (
    <svg ref={svgRef} viewBox="0 0 200 200" className="w-full h-full max-w-md mx-auto">
      <defs>
        {circles.map((circle, index) => (
          <filter key={`filter-${index}`} id={`neumorphic-${index}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation={circle.blur} result="blur" />
            <feOffset dx={circle.offset} dy={circle.offset} in="blur" result="offsetBlur1" />
            <feOffset dx={-circle.offset} dy={-circle.offset} in="blur" result="offsetBlur2" />
            <feFlood floodColor="white" floodOpacity="0.5" result="highlightColor" />
            <feFlood floodColor="black" floodOpacity="0.1" result="shadowColor" />
            <feComposite in="highlightColor" in2="offsetBlur1" operator="in" result="highlight" />
            <feComposite in="shadowColor" in2="offsetBlur2" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="highlight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
        <radialGradient id="circleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: '#f2f2f2', stopOpacity: 0 }} /> {/* Light inner color */}
          <stop offset="100%" style={{ stopColor: '#d9d9d9', stopOpacity: 10 }} /> {/* Slightly darker outer color */}
        </radialGradient>
      </defs>
      {circles.map((circle, index) => (
        <circle
          key={index}
          ref={el => { circlesRef.current[index] = el }}
          cx={centerX}
          cy={centerY}
          r={circle.radius}
          fill={circle.color ?? "url(#circleGradient)"}
          stroke="#e0e0e0"
          strokeWidth="2"
          filter={`url(#neumorphic-${index})`}
        />
      ))}
    </svg>
  );
};