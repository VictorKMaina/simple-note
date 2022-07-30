import type { labelColor } from "@/types"
import Note from "@/classes/Note"
import { getObjectStore } from "@/database"
import type { InterfaceNote } from "@/interfaces"

async function getNotesByLabel(label: labelColor): Promise<Note[]> {
    const objectStore: IDBObjectStore = await getObjectStore("notes")
    const index: IDBIndex = objectStore.index("label")
    const req: IDBRequest = index.openCursor(label)

    const notes = new Promise<Note[]>((resolve, reject) => {
        const notesArr: Note[] = []

        req.onsuccess = (event) => {
            const cursor: IDBCursorWithValue = (event.target as IDBRequest)
                .result

            if (cursor) {
                const { key, value } = cursor
                const {
                    heading,
                    body,
                    dateCreated,
                    dateModified,
                    owner,
                    label,
                } = value as InterfaceNote

                const note = new Note(heading, body, owner, false, label)
                note.key = key
                note.dateCreated = dateCreated
                note.dateModified = dateModified
                notesArr.push(note)

                cursor.continue()
            } else resolve(notesArr)
        }
    })

    return notes
}

export default getNotesByLabel
