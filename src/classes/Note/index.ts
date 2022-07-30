import Profile from "@/classes/Profile"
import type { InterfaceNote } from "@/interfaces"
import type { labelColor, noteField } from "@/types"
import {
    getAllNotes,
    addNoteToDB,
    getNoteByOwner,
    getNoteByKey,
    getNotesByLabel,
    deleteNotes,
    deleteNote,
    updateNote
} from "./methods"

export default class Note implements InterfaceNote {
    key?: IDBValidKey
    heading: string
    body: string
    dateCreated: Date = new Date()
    dateModified: Date = new Date()
    owner: string // Should be the owner's username
    label: labelColor

    constructor(
        // Required parameters
        heading: string,
        body: string,
        owner: string,

        // Optional parameters
        addToDB: boolean = false,
        label: labelColor = "magenta"
    ) {
        if (heading === undefined) {
            throw new Error(
                "Missing field during initialization: heading is undefined."
            )
        } else if (body === undefined) {
            throw new Error(
                "Missing field during initialization: body is undefined."
            )
        } else if (owner === undefined) {
            throw new Error(
                "Missing field during initialization: owner is undefined."
            )
        }

        this.heading = heading
        this.body = body
        this.owner = owner
        this.label = label

        if (addToDB) this.addToDB()
    }

    async addToDB(): Promise<IDBValidKey | null> {
        return addNoteToDB(this)
    }

    // Delete note instance
    async delete() {
        return deleteNote(this)
    }

    async update(
        field: noteField,
        value: string | Date | labelColor
    ): Promise<Note> {
        return updateNote(this, field, value)
    }

    // ---------- STATIC METHODS ----------
    static async getAll(): Promise<Note[]> {
        return getAllNotes()
    }

    static async getByOwner(username: string): Promise<Note[]> {
        return getNoteByOwner(username)
    }

    static async getByKey(key: IDBValidKey | number): Promise<Note> {
        return getNoteByKey(key)
    }

    static async getByLabel(label: labelColor): Promise<Note[]> {
        return getNotesByLabel(label)
    }

    // Delete multiple notes
    static async delete(notes: Note[]) {
        return deleteNotes(notes)
    }
}