import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Aula } from "../../../@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"
import { FindAulaByTituloUseCase } from "../findAulaByTitulo/findAulaByTituloUseCase"

interface CreateAulaUseCaseRequest {
    idTopico: string
    titulo: string
    descricao: string
    urlVideo?: string
    duracaoEstimada: number
}

type CreateAulaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { aula: Aula }
>

export class CreateAulaUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute({ descricao, duracaoEstimada, idTopico, titulo, urlVideo }: CreateAulaUseCaseRequest): Promise<CreateAulaUseCaseResponse> {

        const findAulaByTituloUseCase = new FindAulaByTituloUseCase(this.aulasRepository)

        const possibleAula = await findAulaByTituloUseCase.execute({ titulo, idTopico })

        if (possibleAula.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Aula ${titulo} no Topico ${idTopico}`) })

        const aula = await this.aulasRepository.create(idTopico, { atividades: [], descricao, duracaoEstimada, idTopico, titulo, urlVideo, index: 0 })

        return right({ aula })
    }
}