import { AuthService } from './auth.service';
import { UserInput } from '../user/user.input';
import { UserEntity } from '../user/user.entity';
import { TokenDto } from './token-dto';
export declare class AuthResolver {
    private authService;
    constructor(authService: AuthService);
    login(user: UserInput): Promise<TokenDto>;
    register(user: UserInput): Promise<UserEntity>;
}
