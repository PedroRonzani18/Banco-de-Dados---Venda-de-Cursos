import { Either, left, right } from "@/core/types/either"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { InvalidInputError } from "@/core/errors/invalid-input-error"
import { User } from "@/domain/users/@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { FindUserByWhereParamsUseCase } from "../findByWhereParams/findByWhereParamsUseCase"
import { FindUserByLoginUseCase } from "../findUserByLogin/findUserByLoginUseCase"

interface LoginUserUseCaseRequest {
    login: string,
    password: string,
}

export type LoginUserUseCaseResponse = Either<
    ResourceNotFoundError,
    { user: User }
>

export class LoginUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ login, password }: LoginUserUseCaseRequest): Promise<LoginUserUseCaseResponse> {

        const findUserByEmailUseCase = new FindUserByLoginUseCase(this.usersRepository)
        const possibleUser = await findUserByEmailUseCase.execute({ login})

        if (possibleUser.isLeft())
            return left(new ResourceNotFoundError("User Email or password"))

        if (possibleUser.value.user.senha !== password)
            return left(new InvalidInputError("User Email or password"))
       
        return right({ user: possibleUser.value.user})
    }
}