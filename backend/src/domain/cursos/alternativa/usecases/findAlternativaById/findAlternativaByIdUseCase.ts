import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Alternativa } from "@/domain/cursos/@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"

interface FindAlternativaByIdUseCaseRequest {
    id: string
}

type FindAlternativaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { alternativa: Alternativa }
>

export class FindAlternativaByIdUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute({ id }: FindAlternativaByIdUseCaseRequest): Promise<FindAlternativaByIdUseCaseResponse> {

        const alternativa = await this.alternativasRepository.findById(id)
        if (!alternativa)
            return left({error: new ResourceNotFoundError("Alternativa")})

        return right({ alternativa })
    }
}