import type Note from "@/classes/Note"
import { getObjectStore } from "@/database"
import type { InterfaceNote } from "@/interfaces"

async function newNoteDB(note: Note): Promise<IDBValidKey> {
    const objStore: IDBObjectStore = await getObjectStore("notes", "readwrite")

    // Create new object withou ID field
    const { heading, body, dateCreated, dateModified, owner, label } = note

    const noteObj: InterfaceNote = {
        heading,
        body,
        dateCreated,
        dateModified,
        owner,
        label,
    }

    const req: IDBRequest = objStore.add(noteObj)

    const newNoteKey = new Promise<IDBValidKey>((resolve, reject) => {
        req.onsuccess = (event) => {
            const key = (event.target as IDBRequest).result
            note.key = key
            console.log("Successfully created note", key)
        }

        req.onerror = (event) => {
            const targetReq = event.target as IDBRequest
            reject(targetReq.error)
        }
    })

    return newNoteKey
}

export default newNoteDB
