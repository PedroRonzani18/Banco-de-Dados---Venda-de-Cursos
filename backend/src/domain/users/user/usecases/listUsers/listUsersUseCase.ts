import { Either, left, right } from "@/core/types/either"
import { User } from "../../../@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListUsersUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { users: User[] }
>

export class ListUsersUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute(): Promise<ListUsersUseCaseResponse> {

        const users = await this.usersRepository.list()

        if(users.length === 0)
            return left({ error: new ResourceNotFoundError('Users not found') })

        return right({ users })
    }
}