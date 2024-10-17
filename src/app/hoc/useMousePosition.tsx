import { useCallback, useEffect, useState } from "react";

export interface Position {
	x: number | null;
	y: number | null;
}

export const usePointerPosition = (
	handlePositionChange: (position: Position) => void,
) => {
	const [position, setPosition] = useState<Position>({ x: null, y: null });

	const updatePosition = useCallback(
		(ev: MouseEvent | TouchEvent) => {
			let newPosition: Position;
			if (ev instanceof MouseEvent) {
				newPosition = { x: ev.clientX, y: ev.clientY };
			} else {
				const touch = ev.touches[0];
				newPosition = { x: touch.clientX, y: touch.clientY };
			}
			setPosition(newPosition);
			handlePositionChange(newPosition);
		},
		[handlePositionChange],
	);

	useEffect(() => {
		window.addEventListener("mousemove", updatePosition);
		window.addEventListener("touchmove", updatePosition);

		return () => {
			window.removeEventListener("mousemove", updatePosition);
			window.removeEventListener("touchmove", updatePosition);
		};
	}, [updatePosition]);

	return position;
};
