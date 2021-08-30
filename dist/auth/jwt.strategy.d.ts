import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserInput } from '../user/user.input';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: UserInput): Promise<import("../user/user.entity").UserEntity>;
}
export {};
