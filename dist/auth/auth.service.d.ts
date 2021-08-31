import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';
import { TokenDto } from './token-dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: Partial<UserEntity>): Promise<TokenDto>;
    validateUser(user: Partial<UserEntity>, candidate: UserEntity): Promise<boolean>;
    register(user: Partial<UserEntity>): Promise<UserEntity>;
}
