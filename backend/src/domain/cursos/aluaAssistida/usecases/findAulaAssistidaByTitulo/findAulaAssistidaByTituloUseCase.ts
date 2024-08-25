import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { AulaAssistida } from "@/domain/cursos/@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"

interface FindAulaAssistidaByTituloUseCaseRequest {
    idAula: number
    idUsuario: number
}

type FindAulaAssistidaByTituloUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aulaAssistida: AulaAssistida }
>

export class FindAulaAssistidaByTituloUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ idAula, idUsuario }: FindAulaAssistidaByTituloUseCaseRequest): Promise<FindAulaAssistidaByTituloUseCaseResponse> {

        const aulaAssistida = await this.aulaAssistidasRepository.findByIdAulaAssistida(idAula, idUsuario)
        if (!aulaAssistida)
            return left({ error: new ResourceNotFoundError("AulaAssistida") })

        return right({ aulaAssistida })
    }
}