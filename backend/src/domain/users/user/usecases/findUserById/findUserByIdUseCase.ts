import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { User } from "@/domain/users/@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"

interface FindUserByIdUseCaseRequest {
    id: number
}

type FindUserByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class FindUserByIdUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ id }: FindUserByIdUseCaseRequest): Promise<FindUserByIdUseCaseResponse> {

        const user = await this.usersRepository.findById(id)

        if (!user)
            return left({error: new ResourceNotFoundError("User")})

        return right({ user })
    }
}