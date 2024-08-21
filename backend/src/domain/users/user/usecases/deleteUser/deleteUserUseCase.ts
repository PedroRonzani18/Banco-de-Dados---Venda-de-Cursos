import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { User } from "@/domain/users/@entities/user"

interface DeleteUserUseCaseRequest {
    id: string
}

type DeleteUserUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class DeleteUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ id }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {

        const user = await this.usersRepository.delete(id)
        if (!user)
            return left({ error: new ResourceNotFoundError("User") })

        return right({ user })
    }
}