"use client";

import { gsap } from "gsap";
import { type MutableRefObject, useCallback, useRef } from "react";
import {
	type Position,
	usePointerPosition,
} from "../../app/hoc/useMousePosition";

export const InteractiveBlock = () => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const circlesRef: MutableRefObject<(SVGCircleElement | null)[]> = useRef([]);

	const centerX = 50;
	const centerY = 50;
	const maxDistance = 20; // Reduced maximum distance for mobile
	const springStrength = 0.05; // Increased for faster response
	const connectionStrength = 0.8; // Slightly reduced for smoother movement

	const handlePositionChange = useCallback((position: Position) => {
		const animateCircles = () => {
			if (!position.x || !position.y) return;
			const circles = circlesRef.current;
			const svgRect = svgRef.current?.getBoundingClientRect();
			if (!svgRect) return;

			const dx = position.x - (svgRect.left + svgRect.width / 2);
			const dy = position.y - (svgRect.top + svgRect.height / 2);
			const distance = Math.sqrt(dx * dx + dy * dy);
			const angle = Math.atan2(dy, dx);

			const bottomCircleX =
				centerX + (Math.min(distance, maxDistance) * Math.cos(angle)) / 5;
			const bottomCircleY =
				centerY + (Math.min(distance, maxDistance) * Math.sin(angle)) / 5;

			circles.forEach((circle, index) => {
				if (!circle) return;

				if (index === circles.length - 1) {
					gsap.to(circle, {
						duration: 0.3,
						attr: { cx: bottomCircleX, cy: bottomCircleY },
						ease: "power2.out",
					});
				} else {
					const childCircle = circles[index + 1];
					if (!childCircle) return;

					const childX = Number.parseFloat(
						childCircle.getAttribute("cx") || "0",
					);
					const childY = Number.parseFloat(
						childCircle.getAttribute("cy") || "0",
					);
					const currentX = Number.parseFloat(circle.getAttribute("cx") || "0");
					const currentY = Number.parseFloat(circle.getAttribute("cy") || "0");

					const targetX = currentX + (childX - currentX) * connectionStrength;
					const targetY = currentY + (childY - currentY) * connectionStrength;

					gsap.to(circle, {
						duration: 0.3,
						attr: {
							cx: targetX + (centerX - targetX) * springStrength,
							cy: targetY + (centerY - targetY) * springStrength,
						},
						ease: "power2.out",
					});
				}
			});
		};

		requestAnimationFrame(animateCircles);
	}, []);

	usePointerPosition(handlePositionChange);

	const circles = [
		{ radius: 45, blur: 2, offset: 1, color: "#00000025" },
		{ radius: 30, blur: 1.5, offset: 0.75, color: "#b2acac44" },
		{ radius: 15, blur: 1, offset: 0.5, color: "#e0e0e0" },
	];

	return (
		<svg
			ref={svgRef}
			viewBox="0 0 100 100"
			className="w-full h-full max-w-[300px] max-h-[300px] mx-auto"
		>
			<title>Interactive Block</title>
			<defs>
				{circles.map((circle, index) => (
					<filter key={`filter-${circle.offset}`} id={`neumorphic-${index}`}>
						<feGaussianBlur
							in="SourceAlpha"
							stdDeviation={circle.blur}
							result="blur"
						/>
						<feOffset
							dx={circle.offset}
							dy={circle.offset}
							in="blur"
							result="offsetBlur1"
						/>
						<feOffset
							dx={-circle.offset}
							dy={-circle.offset}
							in="blur"
							result="offsetBlur2"
						/>
						<feFlood
							floodColor="white"
							floodOpacity="0.5"
							result="highlightColor"
						/>
						<feFlood
							floodColor="black"
							floodOpacity="0.1"
							result="shadowColor"
						/>
						<feComposite
							in="highlightColor"
							in2="offsetBlur1"
							operator="in"
							result="highlight"
						/>
						<feComposite
							in="shadowColor"
							in2="offsetBlur2"
							operator="in"
							result="shadow"
						/>
						<feMerge>
							<feMergeNode in="shadow" />
							<feMergeNode in="highlight" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				))}
				<radialGradient
					id="circleGradient"
					cx="50%"
					cy="50%"
					r="50%"
					fx="50%"
					fy="50%"
				>
					<stop offset="0%" style={{ stopColor: "#f2f2f2", stopOpacity: 0 }} />
					<stop
						offset="100%"
						style={{ stopColor: "#d9d9d9", stopOpacity: 10 }}
					/>
				</radialGradient>
			</defs>
			{circles.map((circle, index) => (
				<circle
					key={`${centerX}_${centerY}_${circle.radius}`}
					ref={(el) => {
						circlesRef.current[index] = el;
					}}
					cx={centerX}
					cy={centerY}
					r={circle.radius}
					fill={circle.color ?? "url(#circleGradient)"}
					stroke="#e0e0e0"
					strokeWidth="1"
					filter={`url(#neumorphic-${index})`}
				/>
			))}
		</svg>
	);
};
