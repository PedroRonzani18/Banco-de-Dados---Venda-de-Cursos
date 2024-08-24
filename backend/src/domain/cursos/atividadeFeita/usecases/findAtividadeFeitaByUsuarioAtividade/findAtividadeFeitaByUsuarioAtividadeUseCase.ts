import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AtividadeFeita } from "@/domain/cursos/@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"

interface FindAtividadeFeitaByUsuarioAtividadeUseCaseRequest {
    usuarioId: number
    atividadeId: number
}

type FindAtividadeFeitaByUsuarioAtividadeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividadeFeita: AtividadeFeita }
>

export class FindAtividadeFeitaByUsuarioAtividadeUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute({ atividadeId, usuarioId }: FindAtividadeFeitaByUsuarioAtividadeUseCaseRequest): Promise<FindAtividadeFeitaByUsuarioAtividadeUseCaseResponse> {

        const atividadeFeita = await this.atividadeFeitasRepository.findByUsuarioAtividade(atividadeId, usuarioId)
        if (!atividadeFeita)
            return left({ error: new ResourceNotFoundError("AtividadeFeita") })

        return right({ atividadeFeita })
    }
}