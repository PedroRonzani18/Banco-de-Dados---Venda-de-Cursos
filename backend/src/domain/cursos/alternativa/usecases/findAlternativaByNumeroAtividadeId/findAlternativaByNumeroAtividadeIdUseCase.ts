import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Alternativa } from "@/domain/cursos/@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"

interface FindAlternativaByNumeroAtividadeIdUseCaseUseCaseRequest {
    idAtividade: number
    numAtividade: number
}

type FindAlternativaByNumeroAtividadeIdUseCaseUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { alternativa: Alternativa }
>

export class FindAlternativaByNumeroAtividadeIdUseCaseUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute({ idAtividade, numAtividade }: FindAlternativaByNumeroAtividadeIdUseCaseUseCaseRequest): Promise<FindAlternativaByNumeroAtividadeIdUseCaseUseCaseResponse> {

        const alternativa = await this.alternativasRepository.findByNumeroAtividadeId(numAtividade, idAtividade)

        if (!alternativa)
            return left({ error: new ResourceNotFoundError("Alternativa") })

        return right({ alternativa })
    }
}