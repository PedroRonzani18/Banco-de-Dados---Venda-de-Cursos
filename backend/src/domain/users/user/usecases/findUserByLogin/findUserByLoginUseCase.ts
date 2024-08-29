import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { User } from "@/domain/users/@entities/user"

interface FindUserByloginUseCaseRequest {
    login: string
}

type FindUserByloginUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { user: User }
>

export class FindUserByLoginUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ login }: FindUserByloginUseCaseRequest): Promise<FindUserByloginUseCaseResponse> {

        const user = await this.usersRepository.findByLogin(login)

        if (!user)
            return left({error: new ResourceNotFoundError("User")})

        return right({ user })
    }
}