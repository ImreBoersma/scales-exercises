import { describe, expect, it } from "vitest";
import { mapLevel, mapToScale } from "./mapper";

describe("mapLevel", () => {
	it("maps slider values 1-4 to KNMO levels A-D", () => {
		expect([1, 2, 3, 4].map(mapLevel)).toEqual(["A", "B", "C", "D"]);
	});
});

describe("mapToScale", () => {
	it("maps a Firestore document to a Scale", () => {
		expect(
			mapToScale({ id: "abc", doc: { name: "F♯", level: 3, notation: "x" } }),
		).toEqual({ id: "abc", name: "F♯", level: 3, notation: "x" });
	});
});
