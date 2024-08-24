import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Topico } from "../../../@entities/topico"
import { TopicosRepository } from "../../repositories/topicoInterfaceRepository"
import { FindTopicoByTituloUseCase } from "../findTopicoByTitulo/findTopicoByTituloUseCase"

interface CreateTopicoUseCaseRequest {
    idCurso: string
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

    async execute({ descricao, idCurso, index, titulo }: CreateTopicoUseCaseRequest): Promise<CreateTopicoUseCaseResponse> {

        const findTopicoByTituloUseCase = new FindTopicoByTituloUseCase(this.topicosRepository)

        const possibleTopico = await findTopicoByTituloUseCase.execute({ titulo, idCurso })

        if (possibleTopico.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Topico ${titulo} no Cursp ${idCurso}`) })

        const topico = await this.topicosRepository.create(idCurso, { descricao, index, professores: [], temas: [], titulo, })

        return right({ topico })
    }
}