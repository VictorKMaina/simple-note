import { getObjectStore } from "@/database";
import Profile from '@/classes/Profile'

// Return profile instance from database using username
async function getProfileByUsername(username: string): Promise<Profile> {
    const objStore: IDBObjectStore = await getObjectStore(
        "profiles",
        "readwrite"
    );

    const index: IDBIndex = objStore.index("username");

    const profile = new Promise<Profile>(async (resolve, reject) => {
        // Get profile instance
        const req = index.get(username);
        req.onsuccess = (event) => {
            const targetReq = event.target as IDBRequest;

            // Return profile instance from DB if result is not undefined.
            if (targetReq.result !== undefined) {
                const { username, firstName, lastName, dateCreated } =
                    targetReq.result as Profile;

                const newProfile = new Profile(
                    username,
                    firstName,
                    lastName,
                    dateCreated,
                    false
                );

                resolve(newProfile);
            }
            // Else, reject promise and throw exception if result is undefined.
            else {
                reject(new ReferenceError(`No profile match found for ${username}`));
            }
        };
    });

    return profile;
}

export default getProfileByUsername;