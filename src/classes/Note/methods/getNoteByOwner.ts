import { getObjectStore } from "@/database";
import Note from "@/classes/Note";
import Profile from "@/classes/Profile";

async function getNoteByOwner(username: string): Promise<Note[]> {
    
    try {
        // Log exception if user does not exist.
        const profile = await Profile.getByUsername(username)
    } catch (error) {
        console.error(error)
    }

    const objStore: IDBObjectStore = await getObjectStore('notes')
    const index: IDBIndex = objStore.index('owner')
    const req: IDBRequest = index.openCursor(username)

    const notes = new Promise<Note[]>((resolve, reject) => {
        let notesArr: Note[] = []

        req.onsuccess = event => {
            const targetReq = event.target as IDBRequest
            const cursor:IDBCursorWithValue = targetReq.result

            if(cursor){
                const { primaryKey, value } = cursor
                const { heading, body, dateCreated, dateModified, owner, label } = value as Note;

                const note = new Note(heading, body, owner)
                note.key = primaryKey
                note.dateCreated = dateCreated
                note.dateModified = dateModified
                note.owner = owner
                note.label = label

                notesArr.push(note)

                cursor.continue()
            }
            else resolve(notesArr)
        }
    })

    return notes
}

export default getNoteByOwner