export default interface InterfaceProfile {
    username: string
    firstName: string
    lastName: string
    readonly dateCreated: Date
    get fullName(): string
}