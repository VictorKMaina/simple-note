import type Profile from "@/classes/Profile";
import { getObjectStore } from "@/database";

// Get key of profile instance from database
async function getProfileKey(profile: Profile): Promise<number> {
    const objStore = await getObjectStore("profiles", "readonly");
    const index = objStore.index("username");

    // Get the key of profile from DB
    const key = new Promise<number>((resolve) => {
        index.getKey(profile.username).onsuccess = (event) => {
            const targetReq = event.target as IDBRequest;
            resolve(targetReq.result);
        };
    });

    return key;
}

export default getProfileKey;
