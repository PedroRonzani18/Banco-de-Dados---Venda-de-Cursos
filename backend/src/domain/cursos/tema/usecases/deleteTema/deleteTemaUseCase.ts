import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Tema } from "@/domain/cursos/@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"

interface DeleteTemaUseCaseRequest {
    id: string
}

type DeleteTemaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { tema: Tema }
>

export class DeleteTemaUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute({ id }: DeleteTemaUseCaseRequest): Promise<DeleteTemaUseCaseResponse> {

        const tema = await this.temasRepository.delete(id)
        if (!tema)
            return left({ error: new ResourceNotFoundError("Tema") })

        return right({ tema })
    }
}