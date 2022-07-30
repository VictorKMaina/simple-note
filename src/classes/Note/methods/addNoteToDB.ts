import type Note from "@/classes/Note"
import Profile from "@/classes/Profile"
import { getObjectStore } from "@/database"
import type { InterfaceNote } from "@/interfaces"

async function addNoteToDB(note: Note): Promise<IDBValidKey | null> {
    
    // Create new object without ID field
    const { heading, body, dateCreated, dateModified, owner, label } = note
    
    const noteObj: InterfaceNote = {
        heading,
        body,
        dateCreated,
        dateModified,
        owner,
        label,
    }
    
    const objStore: IDBObjectStore = await getObjectStore("notes", "readwrite")

    // Verify that user exists. Abort transaction if profile isn't found.
    Profile.getByUsername(note.owner).then((profile) => {
        console.log(`Profile ${profile.username} found successfully.`)
    }).catch(err => {
        objStore.transaction.abort()
        console.error(err)
    })

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

export default addNoteToDB
