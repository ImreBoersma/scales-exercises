// @vitest-environment node
import { mkdtempSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { beforeAll, describe, expect, it } from "vitest";

const outDir = mkdtempSync(join(tmpdir(), "scales-build-"));
let html = "";
let css = "";

beforeAll(async () => {
	await build({ logLevel: "silent", build: { outDir } });
	html = readFileSync(join(outDir, "index.html"), "utf8");
	const assets = readdirSync(join(outDir, "assets"));
	css = assets
		.filter((f) => f.endsWith(".css"))
		.map((f) => readFileSync(join(outDir, "assets", f), "utf8"))
		.join("");
}, 60_000);

describe("production build", () => {
	it("loads only same-origin scripts and styles", () => {
		expect(html).toMatch(/<script type="module" crossorigin src="\/assets\//);
		expect(html).not.toMatch(/(src|href)="https?:/);
	});

	it("bundles the Roboto subset that contains ♭ and ♯", () => {
		// U+266D/U+266F live in Roboto's symbols subset (U+25A0-27BF).
		expect(css).toMatch(/font-family:\s*"?Roboto"?/);
		expect(css).toContain("U+25A0-27BF");
	});
});
