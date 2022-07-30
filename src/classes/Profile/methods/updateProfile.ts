import type Profile from '@/classes/Profile'
import { getObjectStore } from "@/database"
import type { profileField } from '@/types';

// Update fields on profile instance
async function updateProfile(
    profile: Profile,
    field: profileField,
    value: string
): Promise<Profile> {
    // Get profile key and update profile instance
    const profileKey: number = await profile.getKey();
    profile[field] = value;

    // Get object store
    const objStore: IDBObjectStore = await getObjectStore(
        "profiles",
        "readwrite"
    );

    // Save updated profile instance to db
    const req = objStore.put(profile, profileKey);

    req.onsuccess = (event) => {
        const targetReq = event.target as IDBRequest;
        console.log(`Successfully updated profile ${ profileKey }`);
    };

    req.onerror = (event) => {
        console.error((event.target as IDBRequest).error);
    };

    // Return updated profile instance from memory
    return profile;
}

export default updateProfile