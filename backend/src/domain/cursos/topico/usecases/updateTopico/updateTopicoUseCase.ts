import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateTopicoUseCaseRequest {
    id: string
    enunciado: string
    titulo: string
}

type UpdateTopicoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topico: Topico }
>

export class UpdateTopicoUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ id, ...data }: UpdateTopicoUseCaseRequest): Promise<UpdateTopicoUseCaseResponse> {

        const topico = await this.topicosRepository.update(id, data)

        if (!topico)
            return left({ error: new ResourceNotFoundError(`Topico ${id}`) })

        return right({ topico })
    }
}