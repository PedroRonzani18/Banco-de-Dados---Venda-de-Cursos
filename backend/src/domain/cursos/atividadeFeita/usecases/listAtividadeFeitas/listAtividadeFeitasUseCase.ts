import { Either, left, right } from "@/core/types/either"
import { AtividadeFeita } from "../../../@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListAtividadeFeitasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividadeFeitas: AtividadeFeita[] }
>

export class ListAtividadeFeitasUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute(): Promise<ListAtividadeFeitasUseCaseResponse> {

        const atividadeFeitas = await this.atividadeFeitasRepository.list()

        if(atividadeFeitas.length === 0)
            return left({ error: new ResourceNotFoundError('AtividadeFeitas') })

        return right({ atividadeFeitas })
    }
}