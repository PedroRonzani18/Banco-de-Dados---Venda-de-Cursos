import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Topico } from "@/domain/cursos/@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"

interface FindTopicoByIdUseCaseRequest {
    id: number
}

type FindTopicoByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topico: Topico }
>

export class FindTopicoByIdUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ id }: FindTopicoByIdUseCaseRequest): Promise<FindTopicoByIdUseCaseResponse> {

        const topico = await this.topicosRepository.findById(id)
        if (!topico)
            return left({error: new ResourceNotFoundError("Topico")})

        return right({ topico })
    }
}