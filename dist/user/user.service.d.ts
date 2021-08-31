import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserInput } from './user.input';
export declare class UserService {
    private readonly userEntityRepository;
    constructor(userEntityRepository: Repository<UserEntity>);
    create(user: Partial<UserEntity>): Promise<UserEntity>;
    getById(id: number): Promise<UserEntity>;
    getByEmail(email: string): Promise<UserEntity>;
    delete(id: number): Promise<boolean>;
    update(id: number, user: UserInput): Promise<void>;
}
