import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AulaAssistida } from "@/domain/cursos/@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"

interface DeleteAulaAssistidaUseCaseRequest {
    id: number
}

type DeleteAulaAssistidaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aulaAssistida: AulaAssistida }
>

export class DeleteAulaAssistidaUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ id }: DeleteAulaAssistidaUseCaseRequest): Promise<DeleteAulaAssistidaUseCaseResponse> {

        const aulaAssistida = await this.aulaAssistidasRepository.delete(id)
        if (!aulaAssistida)
            return left({ error: new ResourceNotFoundError("AulaAssistida") })

        return right({ aulaAssistida })
    }
}