import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserService {
    private readonly userEntityRepository;
    constructor(userEntityRepository: Repository<UserEntity>);
    create(user: Partial<UserEntity>): Promise<UserEntity>;
    getById(id: number): Promise<UserEntity>;
    getByEmail(email: string): Promise<UserEntity>;
    delete(id: number): Promise<boolean>;
    update(user: Partial<UserEntity>): Promise<boolean>;
}
