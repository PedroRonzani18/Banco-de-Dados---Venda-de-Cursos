import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { User } from "@/domain/users/@entities/user"

interface FindUserByWhereParamsUseCaseRequest {
    params: {
        key: string
        value: string
    }[]
}

type FindUserByWhereParamsUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { users: User[] }
>

export class FindUserByWhereParamsUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ params }: FindUserByWhereParamsUseCaseRequest): Promise<FindUserByWhereParamsUseCaseResponse> {

        const mapParams = new Map<string, string>(params.map(param => [param.key, param.value]));

        const users = await this.usersRepository.findByWhereParams(mapParams)

        if (!users.length)
            return left({error: new ResourceNotFoundError("Users")})

        return right({ users })
    }
}