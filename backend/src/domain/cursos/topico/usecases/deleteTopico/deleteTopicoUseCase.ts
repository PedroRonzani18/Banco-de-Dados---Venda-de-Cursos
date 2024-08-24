import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Topico } from "@/domain/cursos/@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"

interface DeleteTopicoUseCaseRequest {
    id: string
}

type DeleteTopicoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topico: Topico }
>

export class DeleteTopicoUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ id }: DeleteTopicoUseCaseRequest): Promise<DeleteTopicoUseCaseResponse> {

        const topico = await this.topicosRepository.delete(id)
        if (!topico)
            return left({ error: new ResourceNotFoundError("Topico") })

        return right({ topico })
    }
}