import { UserProps, User, UpdateUserProps } from "../../@entities/user";
import { UsersRepository } from "./userInterfaceRepository";

export class UsersOracleRepository implements UsersRepository {

    create(data: UserProps): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateUserProps): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}

