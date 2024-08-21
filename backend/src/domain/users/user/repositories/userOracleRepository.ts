import { UserProps, User, UpdateUserProps } from "../../@entities/user";
import { UsersRepository } from "./userInterfaceRepository";

export class UsersOracleRepository implements UsersRepository {

    create(data: UserProps): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: UpdateUserProps): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}

