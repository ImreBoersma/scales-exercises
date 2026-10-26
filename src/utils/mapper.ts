import type { DocumentData } from "firebase/firestore";
import type { Scale } from "./types";

export const mapToScale = (entry: { doc: DocumentData; id: string }): Scale => {
	return {
		id: entry.id,
		level: entry.doc.level,
		name: entry.doc.name,
		notation: entry.doc.notation,
	};
};

export const mapLevel = (level: number) => ["A", "B", "C", "D"][level - 1];
