import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { TokenDto } from './token-dto';
import { UserInput } from '../user/user.input';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: Partial<UserEntity>): Promise<TokenDto>;
    register(user: Partial<UserEntity>): Promise<UserEntity>;
    validateUser(payload: UserInput): Promise<UserEntity>;
}
