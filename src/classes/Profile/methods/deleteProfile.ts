import { getObjectStore } from '@/database';
import type Profile from '@/classes/Profile';

// Delete profile instance from database
async function deleteProfile(profile: Profile): Promise<Profile> {
    // Get profile key
    const profileKey: number = await profile.getKey();

    // Ge profiles object store
    const objStore: IDBObjectStore = await getObjectStore(
        "profiles",
        "readwrite"
    );

    // Delete profile instance from db using key
    const req = objStore.delete(profileKey);

    req.onsuccess = (event) => {
        const targetReq = event.target as IDBRequest;
        console.log(`Successfully deleted profile ${ profileKey }`);
    };

    req.onerror = (event) => {
        console.error((event.target as IDBRequest).error);
    };

    // Return deleted profile instance from memory
    return profile;
}

export default deleteProfile