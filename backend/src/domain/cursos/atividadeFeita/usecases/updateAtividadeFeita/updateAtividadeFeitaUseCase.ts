import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { AtividadeFeita, UpdateAtividadeFeitaProps } from "../../../@entities/atividadeFeita"
import { AtividadeFeitasRepository } from "../../repositories/atividadeFeitaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAtividadeFeitaUseCaseRequest {
    id: number
    data: UpdateAtividadeFeitaProps
}

type UpdateAtividadeFeitaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { atividadeFeita: AtividadeFeita }
>

export class UpdateAtividadeFeitaUseCase {

    constructor(private atividadeFeitasRepository: AtividadeFeitasRepository) { }

    async execute({ id, data }: UpdateAtividadeFeitaUseCaseRequest): Promise<UpdateAtividadeFeitaUseCaseResponse> {

        const atividadeFeita = await this.atividadeFeitasRepository.update(id, data)

        if (!atividadeFeita)
            return left({ error: new ResourceNotFoundError(`AtividadeFeita ${id}`) })

        return right({ atividadeFeita })
    }
}