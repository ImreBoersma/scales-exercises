import * as lite from "firebase/firestore/lite";
import { describe, expect, it } from "vitest";
import { db } from "./firebase.service";

describe("Firebase SDK", () => {
	it("still exports the Firestore Lite functions the app uses", () => {
		expect(lite.getFirestore).toBeTypeOf("function");
		expect(lite.collection).toBeTypeOf("function");
		expect(lite.getDocs).toBeTypeOf("function");
	});

	it("initialises a Firestore instance without network access", () => {
		expect(db).toBeInstanceOf(lite.Firestore);
		expect(lite.collection(db, "scales").path).toBe("scales");
	});
});
