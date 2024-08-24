import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AtividadeFeita } from "@/domain/cursos/@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"

interface DeleteAtividadeFeitaUseCaseRequest {
    id: string
}

type DeleteAtividadeFeitaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividadeFeita: AtividadeFeita }
>

export class DeleteAtividadeFeitaUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute({ id }: DeleteAtividadeFeitaUseCaseRequest): Promise<DeleteAtividadeFeitaUseCaseResponse> {

        const atividadeFeita = await this.atividadeFeitasRepository.delete(id)
        if (!atividadeFeita)
            return left({ error: new ResourceNotFoundError("AtividadeFeita") })

        return right({ atividadeFeita })
    }
}