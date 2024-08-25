import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Aula } from "@/domain/cursos/@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"

interface FindAulaByTituloUseCaseRequest {
    titulo: string
    idTopico: number
}

type FindAulaByTituloUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aula: Aula }
>

export class FindAulaByTituloUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute({ titulo, idTopico }: FindAulaByTituloUseCaseRequest): Promise<FindAulaByTituloUseCaseResponse> {

        const aula = await this.aulasRepository.findByTituloIdCurso(titulo, idTopico)
        if (!aula)
            return left({ error: new ResourceNotFoundError("Aula") })

        return right({ aula })
    }
}