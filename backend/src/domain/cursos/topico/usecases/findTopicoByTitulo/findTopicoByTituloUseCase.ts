import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Topico } from "@/domain/cursos/@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"

interface FindTopicoByTituloUseCaseRequest {
    titulo: string
    cursoId: number
}

type FindTopicoByTituloUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topico: Topico }
>

export class FindTopicoByTituloUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ titulo, cursoId }: FindTopicoByTituloUseCaseRequest): Promise<FindTopicoByTituloUseCaseResponse> {

        const topico = await this.topicosRepository.findByTituloIdCurso(titulo, cursoId)
        if (!topico)
            return left({ error: new ResourceNotFoundError("Topico") })

        return right({ topico })
    }
}