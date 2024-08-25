import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Alternativa } from "../../../@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAlternativaUseCaseRequest {
    id: number
    certa?: boolean
    descricao?: string
    numAtividade?: number
}

type UpdateAlternativaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { alternativa: Alternativa }
>

export class UpdateAlternativaUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute({ certa, descricao, numAtividade, id }: UpdateAlternativaUseCaseRequest): Promise<UpdateAlternativaUseCaseResponse> {

        const alternativa = await this.alternativasRepository.update(id, { certa, descricao, numAtividade })

        if (!alternativa)
            return left({ error: new ResourceNotFoundError(`Alternativa ${id}`) })

        return right({ alternativa })
    }
}