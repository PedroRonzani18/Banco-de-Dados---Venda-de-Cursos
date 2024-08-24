import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { AtividadeFeita } from "../../../@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"
import { FindAtividadeFeitaByUsuarioAtividadeUseCase } from "../findAtividadeFeitaByUsuarioAtividade/findAtividadeFeitaByUsuarioAtividadeUseCase"

interface CreateAtividadeFeitaUseCaseRequest {
    usuarioId: string
    atividadeId: string
    dataFinzalizacao: Date
}

type CreateAtividadeFeitaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { atividadeFeita: AtividadeFeita }
>

export class CreateAtividadeFeitaUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute({ atividadeId, dataFinzalizacao, usuarioId, }: CreateAtividadeFeitaUseCaseRequest): Promise<CreateAtividadeFeitaUseCaseResponse> {

        const findAtividadeFeitaByUsuarioCursoUseCase = new FindAtividadeFeitaByUsuarioAtividadeUseCase(this.atividadeFeitasRepository)

        const possibleAtividadeFeita = await findAtividadeFeitaByUsuarioCursoUseCase.execute({ atividadeId, usuarioId })

        if (possibleAtividadeFeita.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Atividade ${atividadeId} do Usuario ${usuarioId}`) })

        const atividadeFeita = await this.atividadeFeitasRepository.create({ atividadeId, dataFinzalizacao, usuarioId })

        return right({ atividadeFeita })
    }
}