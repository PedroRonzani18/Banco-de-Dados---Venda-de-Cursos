import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { FindTopicoByTituloUseCase } from "../findTopicoByTitulo/findTopicoByTituloUseCase"

interface CountTopicoUseCaseRequest {
    cursoId: number
}

type CountTopicoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topico: number }
>

export class CountTopicoUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ cursoId }: CountTopicoUseCaseRequest): Promise<CountTopicoUseCaseResponse> {

        const topico = await this.topicosRepository.countTopicosFromCurso(cursoId)

        return right({ topico })
    }
}