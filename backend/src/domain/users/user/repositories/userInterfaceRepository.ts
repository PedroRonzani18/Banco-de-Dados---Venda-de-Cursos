import { User, UserProps, UpdateUserProps } from "../../@entities/user"

export interface UsersRepository {
    create(data: UserProps): Promise<User>
    findById(id: number): Promise<User | null>
    findByName(name: string): Promise<User | null>
    findByWhereParams(params: Map<string, string>): Promise<User[]>
    list(): Promise<User[]>
    delete(id: number): Promise<User | null>
    update(id: number, data: UpdateUserProps): Promise<User | null>
}