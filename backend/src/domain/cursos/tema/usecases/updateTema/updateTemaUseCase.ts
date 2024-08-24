import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Tema } from "../../../@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateTemaUseCaseRequest {
    id: string
    nome: string
}

type UpdateTemaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { tema: Tema }
>

export class UpdateTemaUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute({ id, ...data }: UpdateTemaUseCaseRequest): Promise<UpdateTemaUseCaseResponse> {

        const tema = await this.temasRepository.update(id, data)

        if (!tema)
            return left({ error: new ResourceNotFoundError(`Tema ${id}`) })

        return right({ tema })
    }
}