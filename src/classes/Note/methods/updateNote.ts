import type { noteField } from "@/types"
import type Note from "@/classes/Note"
import type { labelColor } from "@/types"
import { getObjectStore } from "@/database"
import type { InterfaceNote } from "@/interfaces"

async function updateNote(
    note: Note,
    field: noteField,
    value: string | Date | labelColor
): Promise<Note> {
    note[field] = value
    const { key, heading, body, dateCreated, dateModified, owner, label } = note

    const newObj: InterfaceNote = {
        heading,
        body,
        dateCreated,
        dateModified,
        owner,
        label,
    }

    const objectStore = await getObjectStore('notes', 'readwrite')
    const req = objectStore.put(newObj, key)

    req.onerror = event => {
        const error = (event.target as IDBRequest).error
        console.error(error)
    }

    // return updated note
    return note
}

export default updateNote
