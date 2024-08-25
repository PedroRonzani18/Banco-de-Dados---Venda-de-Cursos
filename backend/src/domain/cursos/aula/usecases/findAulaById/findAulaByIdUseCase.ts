import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Aula } from "@/domain/cursos/@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"

interface FindAulaByIdUseCaseRequest {
    id: number
}

type FindAulaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aula: Aula }
>

export class FindAulaByIdUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute({ id }: FindAulaByIdUseCaseRequest): Promise<FindAulaByIdUseCaseResponse> {

        const aula = await this.aulasRepository.findById(id)
        if (!aula)
            return left({error: new ResourceNotFoundError("Aula")})

        return right({ aula })
    }
}