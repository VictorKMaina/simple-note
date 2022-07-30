import { ref } from "vue";
import upgradeDatabase from "./upgrade";
import type { storeField } from "@/types"

export const dbName: string = "simpleNote";
export const dbVersion: number = 2;

// Open database
export const dbRequest = ref<IDBOpenDBRequest>(
    window.indexedDB.open(dbName, dbVersion)
);

// Handle errors
dbRequest.value.onerror = (event) => {
    const target = event.target as IDBOpenDBRequest;
    console.error(`Database Error: ${target.error}`);
};

// Handle upgrades
dbRequest.value.onupgradeneeded = (event) => {
    const target = event.target as IDBOpenDBRequest;
    const db: IDBDatabase = target.result;

    upgradeDatabase(db);
};

// Get database object and return it as a promise
export async function getDB(): Promise<IDBDatabase> {
    const req = window.indexedDB.open(dbName, dbVersion)

    return new Promise((resolve) => {
        req.onsuccess = (event) => {
            const targetRequest = event.target as IDBOpenDBRequest;
            const db = targetRequest.result;
            resolve(db);
        };
    });
}

// Get object store and return it as promise
export async function getObjectStore(
    store: storeField,
    mode: IDBTransactionMode = 'readonly',
    storeNames?: string | string[]
): Promise<IDBObjectStore> {
    const db: IDBDatabase = await getDB();
    const objectStore = new Promise<IDBObjectStore>(resolve => {
        const transaction: IDBTransaction = db.transaction(storeNames || store, mode)
        const objStore: IDBObjectStore = transaction.objectStore(store)
        resolve(objStore)
    })
    return objectStore
}
