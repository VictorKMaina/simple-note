import { getObjectStore } from "@/database";
import Profile from '@/classes/Profile'

// Return array of all profiles from the database
async function getAllProfiles(): Promise<Profile[]> {
    const objStore: IDBObjectStore = await getObjectStore("profiles");

    const profiles = new Promise<Profile[]>((resolve) => {
        objStore.getAll().onsuccess = (event) => {
            const targetReq = event.target as IDBRequest;
            const arr: Profile[] = targetReq.result.map((obj: Profile) => {
                const { username, firstName, lastName, dateCreated } = obj;
                return new Profile(
                    username,
                    firstName,
                    lastName,
                    dateCreated,
                    false
                );
            });
            resolve(arr);
        };
    });

    return profiles;
}

export default getAllProfiles;
