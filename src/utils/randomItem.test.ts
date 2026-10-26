import { describe, expect, it } from "vitest";
import { getRandomItem } from "./randomItem";
import type { Scale } from "./types";

const scale = (id: string, level: number): Scale => ({
	id,
	level,
	name: id,
	notation: null,
});

const scales = [scale("C", 1), scale("G", 1), scale("D", 2), scale("E♭m", 4)];

describe("getRandomItem", () => {
	it("only returns scales up to the selected level", () => {
		for (let i = 0; i < 100; i++) {
			expect(getRandomItem(scales, 1).level).toBe(1);
		}
	});

	it("never repeats the current scale when there is an alternative", () => {
		for (let i = 0; i < 100; i++) {
			expect(getRandomItem(scales, 1, scales[0])).toBe(scales[1]);
		}
	});

	it("returns the only scale at a level even if it is the current one", () => {
		const only = [scale("C", 1)];
		expect(getRandomItem(only, 1, only[0])).toBe(only[0]);
	});

	it("falls back to all scales when none match the level", () => {
		const high = [scale("D", 2)];
		expect(getRandomItem(high, 1)).toBe(high[0]);
	});

	it("returns undefined when there are no scales", () => {
		expect(getRandomItem([], 1)).toBeUndefined();
	});
});
