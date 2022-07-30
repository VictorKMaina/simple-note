// This function should be changed when the database schema is updated. Don't add object stores that are already there, and don't remove object stores that don't exist.

export default function upgradeDatabase(db: IDBDatabase):void {
    let status = []

    // Create Profile object store
    const profileObjectStore: IDBObjectStore = db.createObjectStore("profiles", { autoIncrement: true });
    profileObjectStore.createIndex('username', 'username', { unique: true })

    // Create Note object store
    const noteObjectStore: IDBObjectStore = db.createObjectStore('notes', { autoIncrement: true })

    noteObjectStore.createIndex('heading', 'heading', { unique: false })
    noteObjectStore.createIndex('owner', 'owner', { unique: false })
    noteObjectStore.createIndex('label', 'label', { unique: false })
}