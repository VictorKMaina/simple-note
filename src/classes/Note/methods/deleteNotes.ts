import type Note from '@/classes/Note'

async function deleteNotes(notes: Note[]){
    return notes.map(async note => await note.delete())
}

export default deleteNotes