import { Either, left, right } from "@/core/types/either"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTopicosByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicos: Topico[] }
>

interface ListTopicosByIdUseCaseRequest {
    id: number
}

export class ListTopicosByIdUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ id } : ListTopicosByIdUseCaseRequest): Promise<ListTopicosByIdUseCaseResponse> {

        const topicos = await this.topicosRepository.listById(id)

        if(topicos.length === 0)
            return left({ error: new ResourceNotFoundError('Topicos') })

        return right({ topicos })
    }
}