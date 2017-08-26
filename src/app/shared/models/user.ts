export class User {
    public id: string;
    public userName: string;
    public gravatar: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public emailConfirmed: boolean;
    public phoneNumber: string;
    public lockoutEndDateUtc: string;
    public address: string;
    public lockedOut: boolean;
    public accessFailedCount: number;
    public role: string;
    public isDeleted: boolean;
    public companyId: string;
    public companyName: string;
    public preferredLanguage: string;
}
