import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { User } from "../../../@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { FindUserByNameUseCase } from "../findUserByLogin/findUserByLoginUseCase"

interface CreateUserUseCaseRequest {
    email: string
    login: string
    nome: string
    senha: string
    telefone: string
}

type CreateUserUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { user: User }
>

export class CreateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute(data: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const findUserByNameUseCase = new FindUserByNameUseCase(this.usersRepository)

        const possibleUser = await findUserByNameUseCase.execute({ name: data.nome })

        if (possibleUser.isRight())
            return left({ error: new ResourceAlreadyExistsError(`User ${data.nome}`) })

        const user = await this.usersRepository.create(data)

        return right({ user })
    }
}