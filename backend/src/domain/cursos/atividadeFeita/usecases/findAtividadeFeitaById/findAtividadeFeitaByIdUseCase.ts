import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AtividadeFeita } from "@/domain/cursos/@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"

interface FindAtividadeFeitaByIdUseCaseRequest {
    id: string
}

type FindAtividadeFeitaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividadeFeita: AtividadeFeita }
>

export class FindAtividadeFeitaByIdUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute({ id }: FindAtividadeFeitaByIdUseCaseRequest): Promise<FindAtividadeFeitaByIdUseCaseResponse> {

        const atividadeFeita = await this.atividadeFeitasRepository.findById(id)
        if (!atividadeFeita)
            return left({error: new ResourceNotFoundError("AtividadeFeita")})

        return right({ atividadeFeita })
    }
}