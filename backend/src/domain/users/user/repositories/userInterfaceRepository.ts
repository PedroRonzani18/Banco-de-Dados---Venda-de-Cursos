import { User, UserProps, UpdateUserProps } from "../../@entities/user"

export interface UsersRepository {
    create(data: UserProps): Promise<User>
    findById(id: string): Promise<User | null>
    findByName(name: string): Promise<User | null>
    list(): Promise<User[]>
    delete(id: string): Promise<User | null>
    update(id: string, data: UpdateUserProps): Promise<User | null>
}