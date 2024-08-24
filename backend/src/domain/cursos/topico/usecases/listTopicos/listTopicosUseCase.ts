import { Either, left, right } from "@/core/types/either"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTopicosUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicos: Topico[] }
>

export class ListTopicosUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute(): Promise<ListTopicosUseCaseResponse> {

        const topicos = await this.topicosRepository.list()

        if(topicos.length === 0)
            return left({ error: new ResourceNotFoundError('Topicos') })

        return right({ topicos })
    }
}