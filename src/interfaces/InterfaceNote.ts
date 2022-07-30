import type { labelColor } from "@/types";

// Schema for database
export default interface InterfaceNote {
    heading: string;
    body: string;
    owner: string;
    label: labelColor;
    dateModified: Date;
    readonly dateCreated: Date
}
