"use client";

import { useCallback, useEffect, useId, useState } from "react";
import type { CropArea } from "@/types";

interface CropSelectorProps {
	containerWidth: number;
	containerHeight: number;
	cropArea: CropArea;
	onCropChange: (area: CropArea) => void;
}

type DragMode = "move" | "nw" | "ne" | "sw" | "se" | null;

export function CropSelector({
	containerWidth,
	containerHeight,
	cropArea,
	onCropChange,
}: CropSelectorProps) {
	const maskId = useId();
	const [dragMode, setDragMode] = useState<DragMode>(null);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [startCropArea, setStartCropArea] = useState<CropArea>(cropArea);

	// Convert percentage to pixels for rendering
	const pixelCrop = {
		x: (cropArea.x / 100) * containerWidth,
		y: (cropArea.y / 100) * containerHeight,
		width: (cropArea.width / 100) * containerWidth,
		height: (cropArea.height / 100) * containerHeight,
	};

	const handleMouseDown = useCallback(
		(e: React.MouseEvent, mode: DragMode) => {
			e.preventDefault();
			e.stopPropagation();
			setDragMode(mode);
			setDragStart({ x: e.clientX, y: e.clientY });
			setStartCropArea(cropArea);
		},
		[cropArea],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!dragMode) return;

			const deltaX = e.clientX - dragStart.x;
			const deltaY = e.clientY - dragStart.y;

			// Convert pixel delta to percentage
			const deltaXPercent = (deltaX / containerWidth) * 100;
			const deltaYPercent = (deltaY / containerHeight) * 100;

			const newCropArea = { ...startCropArea };

			if (dragMode === "move") {
				// Move the entire crop area
				newCropArea.x = startCropArea.x + deltaXPercent;
				newCropArea.y = startCropArea.y + deltaYPercent;

				// Constrain to bounds
				newCropArea.x = Math.max(
					0,
					Math.min(100 - newCropArea.width, newCropArea.x),
				);
				newCropArea.y = Math.max(
					0,
					Math.min(100 - newCropArea.height, newCropArea.y),
				);
			} else if (dragMode === "nw") {
				// Top-left corner
				newCropArea.x = startCropArea.x + deltaXPercent;
				newCropArea.y = startCropArea.y + deltaYPercent;
				newCropArea.width = startCropArea.width - deltaXPercent;
				newCropArea.height = startCropArea.height - deltaYPercent;
			} else if (dragMode === "ne") {
				// Top-right corner
				newCropArea.y = startCropArea.y + deltaYPercent;
				newCropArea.width = startCropArea.width + deltaXPercent;
				newCropArea.height = startCropArea.height - deltaYPercent;
			} else if (dragMode === "sw") {
				// Bottom-left corner
				newCropArea.x = startCropArea.x + deltaXPercent;
				newCropArea.width = startCropArea.width - deltaXPercent;
				newCropArea.height = startCropArea.height + deltaYPercent;
			} else if (dragMode === "se") {
				// Bottom-right corner
				newCropArea.width = startCropArea.width + deltaXPercent;
				newCropArea.height = startCropArea.height + deltaYPercent;
			}

			// Ensure minimum size (5% of container)
			newCropArea.width = Math.max(5, newCropArea.width);
			newCropArea.height = Math.max(5, newCropArea.height);

			// Constrain to bounds
			newCropArea.x = Math.max(
				0,
				Math.min(100 - newCropArea.width, newCropArea.x),
			);
			newCropArea.y = Math.max(
				0,
				Math.min(100 - newCropArea.height, newCropArea.y),
			);

			onCropChange(newCropArea);
		},
		[
			dragMode,
			dragStart,
			startCropArea,
			containerWidth,
			containerHeight,
			onCropChange,
		],
	);

	const handleMouseUp = useCallback(() => {
		setDragMode(null);
	}, []);

	useEffect(() => {
		if (dragMode) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleMouseUp);

			return () => {
				window.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [dragMode, handleMouseMove, handleMouseUp]);

	return (
		<button
			type="button"
			className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20 cursor-move select-none"
			style={{
				left: `${pixelCrop.x}px`,
				top: `${pixelCrop.y}px`,
				width: `${pixelCrop.width}px`,
				height: `${pixelCrop.height}px`,
			}}
			onMouseDown={(e) => handleMouseDown(e, "move")}
			aria-label="Drag to move crop area"
		>
			{/* Dimension overlay */}
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded pointer-events-none">
				{Math.round(cropArea.width)}% × {Math.round(cropArea.height)}%
			</div>

			{/* Corner handles - using div with role=button to avoid nested buttons */}
			<div
				role="button"
				tabIndex={0}
				className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-blue-600 border-2 border-white rounded-full cursor-nwse-resize"
				onMouseDown={(e) => handleMouseDown(e, "nw")}
				aria-label="Resize from top-left corner"
			/>
			<div
				role="button"
				tabIndex={0}
				className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-600 border-2 border-white rounded-full cursor-nesw-resize"
				onMouseDown={(e) => handleMouseDown(e, "ne")}
				aria-label="Resize from top-right corner"
			/>
			<div
				role="button"
				tabIndex={0}
				className="absolute -bottom-1.5 -left-1.5 w-4 h-4 bg-blue-600 border-2 border-white rounded-full cursor-nesw-resize"
				onMouseDown={(e) => handleMouseDown(e, "sw")}
				aria-label="Resize from bottom-left corner"
			/>
			<div
				role="button"
				tabIndex={0}
				className="absolute -bottom-1.5 -right-1.5 w-4 h-4 bg-blue-600 border-2 border-white rounded-full cursor-nwse-resize"
				onMouseDown={(e) => handleMouseDown(e, "se")}
				aria-label="Resize from bottom-right corner"
			/>

			{/* Dark overlay on non-cropped areas */}
			<svg
				className="absolute inset-0 w-full h-full pointer-events-none"
				style={{
					left: `-${pixelCrop.x}px`,
					top: `-${pixelCrop.y}px`,
					width: `${containerWidth}px`,
					height: `${containerHeight}px`,
				}}
			>
				<title>Crop area overlay</title>
				<defs>
					<mask id={maskId}>
						<rect width="100%" height="100%" fill="white" />
						<rect
							x={pixelCrop.x}
							y={pixelCrop.y}
							width={pixelCrop.width}
							height={pixelCrop.height}
							fill="black"
						/>
					</mask>
				</defs>
				<rect
					width="100%"
					height="100%"
					fill="black"
					opacity="0.5"
					mask={`url(#${maskId})`}
				/>
			</svg>
		</button>
	);
}
