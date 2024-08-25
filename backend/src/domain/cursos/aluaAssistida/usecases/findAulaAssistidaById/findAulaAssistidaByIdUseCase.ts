import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AulaAssistida } from "@/domain/cursos/@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"

interface FindAulaAssistidaByIdUseCaseRequest {
    id: number
}

type FindAulaAssistidaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aulaAssistida: AulaAssistida }
>

export class FindAulaAssistidaByIdUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ id }: FindAulaAssistidaByIdUseCaseRequest): Promise<FindAulaAssistidaByIdUseCaseResponse> {

        const aulaAssistida = await this.aulaAssistidasRepository.findById(id)
        if (!aulaAssistida)
            return left({error: new ResourceNotFoundError("AulaAssistida")})

        return right({ aulaAssistida })
    }
}