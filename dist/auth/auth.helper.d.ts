export declare class AuthHelper {
    static validate(password: string, hashedPassword: string): Promise<boolean>;
    static hash(password: string): Promise<string>;
}
