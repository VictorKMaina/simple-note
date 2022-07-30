import { getObjectStore } from "@/database"
import Profile from "@/classes/Profile"

// Return profile instance from database using username
async function getProfileByUsername(username: string): Promise<Profile> {
    const objStore: IDBObjectStore = await getObjectStore(
        "profiles",
        "readwrite"
    )

    const index: IDBIndex = objStore.index("username")

    const profile = new Promise<Profile>(async (resolve, reject) => {
        // Get profile instance
        const req = index.get(username)

        req.onsuccess = (event) => {
            const profileObj = (event.target as IDBRequest).result

            // Return profile instance from DB if result is not undefined.
            if (profileObj !== undefined) {
                const { username, firstName, lastName, dateCreated } =
                    profileObj as Profile

                const newProfile = new Profile(
                    username,
                    firstName,
                    lastName,
                    false,
                    dateCreated
                )

                resolve(newProfile)
            }
            // Else, reject promise and throw exception if result is undefined.
            else {
                reject(new Error(`No profile match found for ${username}`))
            }
        }

        req.onerror = (event) => {
            const error = (event.target as IDBRequest).error
            console.error(error)
        }
    })

    return profile
}

export default getProfileByUsername
