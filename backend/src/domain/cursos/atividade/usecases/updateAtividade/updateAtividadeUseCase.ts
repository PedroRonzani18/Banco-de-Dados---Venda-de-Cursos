import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Atividade } from "../../../@entities/alternativa"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAtividadeUseCaseRequest {
    id: string
    certa?: boolean
    descricao?: string
    numAtividade?: number
}

type UpdateAtividadeUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { alternativa: Atividade }
>

export class UpdateAtividadeUseCase {

    constructor(private alternativasRepository: AtividadesRepository) { }

    async execute({ certa, descricao, numAtividade, id }: UpdateAtividadeUseCaseRequest): Promise<UpdateAtividadeUseCaseResponse> {

        const alternativa = await this.alternativasRepository.update(id, { certa, descricao, numAtividade })

        if (!alternativa)
            return left({ error: new ResourceNotFoundError(`Atividade ${id}`) })

        return right({ alternativa })
    }
}