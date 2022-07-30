import type { profileField } from "@/types";
import {
    getAllProfiles,
    getProfileKey,
    newProfileDB,
    getProfileByUsername,
    updateProfile,
    deleteProfile
} from "./methods";
import type { InterfaceProfile } from "@/interfaces";

export default class Profile implements InterfaceProfile {
    // MAIN PROPERTIES FOR PROFILE INSTANCE
    username: string;
    firstName: string;
    lastName: string;

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    readonly dateCreated: Date;

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        appendToDB: boolean = false,
        dateCreated?: Date
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateCreated = dateCreated || new Date();

        // Add new profile to database
        if (appendToDB) newProfileDB(this);
    }

    // Get key of profile instance from database
    async getKey(): Promise<number> {
        return getProfileKey(this);
    }

    // ---------- INSTANCE METHODS ----------

    // Update fields on profile instance
    async update(
        field: profileField,
        value: string
    ): Promise<Profile> {
        return updateProfile(this, field, value);
    }

    // Delete profile instance from database
    async delete(): Promise<Profile> {
        return deleteProfile(this);
    }

    // ---------- STATIC METHODS ----------
    // Return all profiles from the database
    static async getAll(): Promise<Profile[]> {
        return getAllProfiles();
    }

    // Return profile instance by username
    static async getByUsername(username: string): Promise<Profile> {
        return getProfileByUsername(username);
    }
}