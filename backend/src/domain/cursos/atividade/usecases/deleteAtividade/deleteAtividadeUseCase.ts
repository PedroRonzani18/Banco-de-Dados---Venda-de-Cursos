import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Atividade } from "@/domain/cursos/@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"

interface DeleteAtividadeUseCaseRequest {
    id: number
}

type DeleteAtividadeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividade: Atividade }
>

export class DeleteAtividadeUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute({ id }: DeleteAtividadeUseCaseRequest): Promise<DeleteAtividadeUseCaseResponse> {

        const atividade = await this.atividadesRepository.delete(id)
        if (!atividade)
            return left({ error: new ResourceNotFoundError("Atividade") })

        return right({ atividade })
    }
}