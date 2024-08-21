import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { User } from "../../../@entities/user"
import { UsersRepository } from "../../repositories/userInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateUserUseCaseRequest {
    id: string
    email?: string
    login?: string
    nome?: string
    senha?: string
    telefone?: string
}

type UpdateUserUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { user: User }
>

export class UpdateUserUseCase {

    constructor(private usersRepository: UsersRepository) { }

    async execute({ id, email, login, nome, senha, telefone }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {

        const user = await this.usersRepository.update(id, { email, login, nome, senha, telefone })

        if (!user)
            return left({ error: new ResourceNotFoundError(`User ${id}`) })

        return right({ user })
    }
}