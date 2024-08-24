import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Atividade } from "../../../@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAtividadeUseCaseRequest {
    id: number
    enunciado: string
    titulo: string
}

type UpdateAtividadeUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { atividade: Atividade }
>

export class UpdateAtividadeUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute({ id, ...data }: UpdateAtividadeUseCaseRequest): Promise<UpdateAtividadeUseCaseResponse> {

        const atividade = await this.atividadesRepository.update(id, data)

        if (!atividade)
            return left({ error: new ResourceNotFoundError(`Atividade ${id}`) })

        return right({ atividade })
    }
}