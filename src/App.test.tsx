import { configureStore } from "@reduxjs/toolkit";
import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { scalesReducer } from "./store/scalesSlice";
import { getRandomItem } from "./utils/randomItem";

const docs = [
	{ id: "1", data: () => ({ name: "C", level: 1 }) },
	{ id: "2", data: () => ({ name: "G", level: 1 }) },
	{ id: "3", data: () => ({ name: "E♭m", level: 4 }) },
];

// Only the network call is faked; the rest of the Firebase SDK is real.
vi.mock("firebase/firestore/lite", async (importOriginal) => ({
	...(await importOriginal<typeof import("firebase/firestore/lite")>()),
	getDocs: vi.fn(async () => ({ docs })),
}));

vi.mock("./utils/randomItem", async (importOriginal) => {
	const actual = await importOriginal<typeof import("./utils/randomItem")>();
	return { getRandomItem: vi.fn(actual.getRandomItem) };
});

const heading = () => screen.getByRole("heading", { level: 1 }).textContent;

const renderApp = async () => {
	const store = configureStore({ reducer: { scales: scalesReducer } });
	render(
		<Provider store={store}>
			<App />
		</Provider>,
	);
	// Wait for fetchScales to resolve.
	await act(async () => {});
};

describe("App", () => {
	beforeEach(renderApp);
	afterEach(cleanup);

	it("renders the controls with MUI", () => {
		expect(screen.getByRole("button", { name: /new scale/i })).toBeTruthy();
		expect(screen.getByRole("slider", { name: "Level" })).toBeTruthy();
		expect(screen.getByText(/Level: A/)).toBeTruthy();
	});

	it("shows a level A scale when the button is clicked", () => {
		expect(heading()).toBe("");
		fireEvent.click(screen.getByRole("button", { name: /new scale/i }));
		expect(["C", "G"]).toContain(heading());
	});

	it("does not duplicate scales when they are fetched twice", async () => {
		cleanup();
		const store = configureStore({ reducer: { scales: scalesReducer } });
		const app = (
			<Provider store={store}>
				<App />
			</Provider>
		);
		render(<StrictMode>{app}</StrictMode>);
		await act(async () => {});
		expect(store.getState().scales.scales).toHaveLength(docs.length);
	});

	it("shows a different scale on each Space press", () => {
		fireEvent.keyDown(document, { code: "Space" });
		const first = heading();
		expect(["C", "G"]).toContain(first);
		fireEvent.keyDown(document, { code: "Space" });
		expect(heading()).not.toBe(first);
	});

	it("only reacts once per Space press after the level changes", () => {
		const slider = screen.getByRole("slider", { name: "Level" });
		fireEvent.change(slider, { target: { value: 4 } });
		fireEvent.change(slider, { target: { value: 1 } });
		expect(screen.getByText(/Level: A/)).toBeTruthy();
		vi.mocked(getRandomItem).mockClear();
		fireEvent.keyDown(document, { code: "Space" });
		expect(getRandomItem).toHaveBeenCalledTimes(1);
	});

	it("includes higher level scales when the level is raised", () => {
		fireEvent.change(screen.getByRole("slider", { name: "Level" }), {
			target: { value: 4 },
		});
		expect(screen.getByText(/Level: D/)).toBeTruthy();
		const seen = new Set<string | null>();
		for (let i = 0; i < 50; i++) {
			fireEvent.keyDown(document, { code: "Space" });
			seen.add(heading());
		}
		expect(seen).toContain("E♭m");
	});
});
