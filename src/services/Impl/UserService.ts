import { DatabaseProvider } from '../../database/DatabaseConfiguration';
import { User } from '../../models/User';

export class UserService {

    public async list(): Promise<User[]> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).find();
    }

    public async getById(id: number): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).findOneOrFail(id);
    }

    public async create(user: User): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        return await connection.getRepository(User).save(user);
    }

    public async update(user: User): Promise<User> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(User);
        const entity = await repo.findOneOrFail(user.id);
        entity.firstName = user.firstName;
        entity.lastName = user.lastName;
        return repo.save(entity);
    }

    public async delete(id: number): Promise<void> {
        const connection = await DatabaseProvider.getConnection();
        const repo = connection.getRepository(User);
        const entity = await repo.findOneOrFail(id);
        await repo.delete(entity);
    }
}

export const userService = new UserService();