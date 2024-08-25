import { Either, left, right } from "@/core/types/either"
import { Alternativa } from "../../../@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListAlternativasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { alternativas: Alternativa[] }
>

export class ListAlternativasUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute(): Promise<ListAlternativasUseCaseResponse> {

        const alternativas = await this.alternativasRepository.list()

        if(alternativas.length === 0)
            return left({ error: new ResourceNotFoundError('Alternativas not found') })

        return right({ alternativas })
    }
}