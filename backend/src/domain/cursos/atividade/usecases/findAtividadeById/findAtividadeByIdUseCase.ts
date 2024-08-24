import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Atividade } from "@/domain/cursos/@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"

interface FindAtividadeByIdUseCaseRequest {
    id: number
}

type FindAtividadeByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividade: Atividade }
>

export class FindAtividadeByIdUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute({ id }: FindAtividadeByIdUseCaseRequest): Promise<FindAtividadeByIdUseCaseResponse> {

        const atividade = await this.atividadesRepository.findById(id)
        if (!atividade)
            return left({error: new ResourceNotFoundError("Atividade")})

        return right({ atividade })
    }
}