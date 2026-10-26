import type { Scale } from "./types";

export const getRandomItem = (
	array: Scale[],
	level: number,
	current?: Scale,
) => {
	let filtered = array.filter((i) => i.level <= level);
	if (filtered.length < 1) filtered = array;
	if (filtered.length > 1) filtered = filtered.filter((i) => i !== current);
	return filtered[Math.floor(Math.random() * filtered.length)];
};
