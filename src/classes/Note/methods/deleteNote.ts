import type Note from "@/classes/Note";
import { getObjectStore } from "@/database";

async function deleteNote(note: Note) {
    const { key } = note
    const objectStore = await getObjectStore('notes', 'readwrite')
    const req = objectStore.delete(key as IDBValidKey)

    req.onsuccess = event => {
        const res = (event.target as IDBRequest).result
        console.log(res)
    }

    req.onerror = event => {
        const error = (event.target as IDBRequest).error
        console.error(error)
    }

    return `Successfully delete note ${ key }`
}

export default deleteNote