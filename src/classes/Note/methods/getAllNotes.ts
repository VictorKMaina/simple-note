import Note from "@/classes/Note";
import { getObjectStore } from "@/database";


// Return array of notes from database
async function getAllNotes(): Promise<Note[]> {
    // Get object store and request
    const objStore = await getObjectStore("notes", "readonly");
    const req: IDBRequest = objStore.openCursor();

    const notes = new Promise<Note[]>((resolve, reject) => {
        let notesArr: Note[] = [];

        req.onsuccess = (event) => {
            const cursor: IDBCursorWithValue = (event.target as IDBRequest)
                .result;

            if (cursor) {
                // Create new note instance from key and value of cursor
                const {
                    heading,
                    body,
                    owner,
                    dateCreated,
                    dateModified,
                    label
                } = cursor.value as Note;

                const newNote: Note = new Note(heading, body, owner);
                newNote.key = cursor.key;
                newNote.dateCreated = dateCreated;
                newNote.dateModified = dateModified;
                newNote.label = label;

                notesArr.push(newNote);
                cursor.continue();
            } else resolve(notesArr)
        };
    });

    return notes;
}

export default getAllNotes;
