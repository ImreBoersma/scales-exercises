import { DocumentData } from "firebase/firestore"
import { Scale } from "./types"

export const mapToScale = (entry: { doc: DocumentData, id: string }): Scale => {
    return {
        id: entry.id,
        level: entry.doc.level,
        name: entry.doc.name,
        notation: entry.doc.notation
    }
}