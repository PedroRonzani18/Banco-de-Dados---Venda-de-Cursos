import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoTema } from "@/domain/cursos/@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"

interface FindTopicoTemaByTituloUseCaseRequest {
    idTema: number
    idTopico: number
}

type FindTopicoTemaByTituloUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoTema: TopicoTema }
>

export class FindTopicoTemaByTituloUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute({ idTema, idTopico }: FindTopicoTemaByTituloUseCaseRequest): Promise<FindTopicoTemaByTituloUseCaseResponse> {

        const topicoTema = await this.topicoTemasRepository.findByIdTopicoTema(idTema, idTopico)
        if (!topicoTema)
            return left({ error: new ResourceNotFoundError("TopicoTema") })

        return right({ topicoTema })
    }
}