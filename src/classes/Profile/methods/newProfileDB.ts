import { getObjectStore } from "@/database";
import type Profile from "@/classes/Profile";

// Adds profile instance to the database
async function newProfileDB(profile: Profile): Promise<number> {
    const objStore: IDBObjectStore = await getObjectStore(
        "profiles",
        "readwrite"
    );

    const req = objStore.add(profile);

    const profileKey = new Promise<number>((resolve, reject) => {
        req.onsuccess = (event) => {
            const targetReq = event.target as IDBRequest;
            console.info(
                `Successfully create new profile`,
                `ID: ${targetReq.result}`
            );
            resolve(targetReq.result)
        };
        req.onerror = (event) => {
            const targetReq = event.target as IDBRequest;
            reject(targetReq.error)
        };
    });

    return profileKey;
}

export default newProfileDB
