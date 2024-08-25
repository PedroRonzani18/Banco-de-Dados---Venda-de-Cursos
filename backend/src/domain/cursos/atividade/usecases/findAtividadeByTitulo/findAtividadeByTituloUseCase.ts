import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Atividade } from "@/domain/cursos/@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"

interface FindAtividadeByTituloUseCaseRequest {
    titulo: string
    idAula: number
}

type FindAtividadeByTituloUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividade: Atividade }
>

export class FindAtividadeByTituloUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute({ titulo, idAula }: FindAtividadeByTituloUseCaseRequest): Promise<FindAtividadeByTituloUseCaseResponse> {

        const atividade = await this.atividadesRepository.findByTituloIdAula(titulo, idAula)
        if (!atividade)
            return left({ error: new ResourceNotFoundError("Atividade") })

        return right({ atividade })
    }
}