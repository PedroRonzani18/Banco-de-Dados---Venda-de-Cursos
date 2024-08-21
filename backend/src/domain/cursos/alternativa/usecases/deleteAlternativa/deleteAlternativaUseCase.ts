import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Alternativa } from "@/domain/cursos/@entities/alternativa"
import { AlternativasRepository } from "../../repositories/alternativaInterfaceRepository"

interface DeleteAlternativaUseCaseRequest {
    id: string
}

type DeleteAlternativaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { alternativa: Alternativa }
>

export class DeleteAlternativaUseCase {

    constructor(private alternativasRepository: AlternativasRepository) { }

    async execute({ id }: DeleteAlternativaUseCaseRequest): Promise<DeleteAlternativaUseCaseResponse> {

        const alternativa = await this.alternativasRepository.delete(id)
        if (!alternativa)
            return left({ error: new ResourceNotFoundError("Alternativa") })

        return right({ alternativa })
    }
}