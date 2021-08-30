import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './user.input';
export declare class UserResolver {
    private userService;
    constructor(userService: UserService);
    getUserById(id: number): Promise<UserEntity>;
    getUserByEmail(email: string): Promise<UserEntity>;
    createUser(user: UserInput): Promise<UserEntity>;
    deleteUser(id: number): Promise<boolean>;
}
