import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Aula } from "@/domain/cursos/@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"

interface DeleteAulaUseCaseRequest {
    id: number
}

type DeleteAulaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aula: Aula }
>

export class DeleteAulaUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute({ id }: DeleteAulaUseCaseRequest): Promise<DeleteAulaUseCaseResponse> {

        const aula = await this.aulasRepository.delete(id)
        if (!aula)
            return left({ error: new ResourceNotFoundError("Aula") })

        return right({ aula })
    }
}