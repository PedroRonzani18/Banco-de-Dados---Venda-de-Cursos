import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { FindTopicoByTituloUseCase } from "../findTopicoByTitulo/findTopicoByTituloUseCase"

interface CreateTopicoUseCaseRequest {
    cursoId: number
    index: number
    titulo: string
    descricao: string
}

type CreateTopicoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topico: Topico }
>

export class CreateTopicoUseCase {

    constructor(private topicosRepository: TopicosRepository) { }

    async execute({ descricao, cursoId, index, titulo }: CreateTopicoUseCaseRequest): Promise<CreateTopicoUseCaseResponse> {

        // const findTopicoByTituloUseCase = new FindTopicoByTituloUseCase(this.topicosRepository)

        // const possibleTopico = await findTopicoByTituloUseCase.execute({ titulo, cursoId })

        // if (possibleTopico.isRight())
        //     return left({ error: new ResourceAlreadyExistsError(`Topico ${titulo} no Cursp ${cursoId}`) })

        const topico = await this.topicosRepository.create(cursoId, { descricao, index, titulo, cursoId })

        return right({ topico })
    }
}