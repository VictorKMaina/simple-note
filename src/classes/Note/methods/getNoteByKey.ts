import Note from "@/classes/Note"
import { getObjectStore } from "@/database"
import type { InterfaceNote } from "@/interfaces"

async function getNoteByKey(key: IDBValidKey | number): Promise<Note> {
    const objectStore: IDBObjectStore = await getObjectStore("notes")
    const req: IDBRequest = objectStore.get(key)

    const note = new Promise<Note>((resolve, reject) => {
        req.onsuccess = (event) => {
            const noteObj: InterfaceNote = (event.target as IDBRequest).result

            if (noteObj === undefined) {
                console.error(
                    `No match found for provided key ${key} in note object store.`
                )
            } else {
                const {
                    heading,
                    body,
                    dateCreated,
                    dateModified,
                    label,
                    owner,
                } = noteObj

                const newNote = new Note(heading, body, owner)
                newNote.key = key
                newNote.dateCreated = dateCreated
                newNote.dateModified = dateModified
                newNote.label = label

                resolve(newNote)
            }
        }

        req.onerror = (event) => {
            const error = (event.target as IDBRequest).error
            console.error(error)
            reject(error)
        }
    })

    return note
}

export default getNoteByKey
