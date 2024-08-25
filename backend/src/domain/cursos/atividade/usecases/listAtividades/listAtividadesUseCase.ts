import { Either, left, right } from "@/core/types/either"
import { Atividade } from "../../../@entities/atividade"
import { AtividadesRepository } from "../../repositories/atividadeInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListAtividadesUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { atividades: Atividade[] }
>

export class ListAtividadesUseCase {

    constructor(private atividadesRepository: AtividadesRepository) { }

    async execute(): Promise<ListAtividadesUseCaseResponse> {

        const atividades = await this.atividadesRepository.list()

        if(atividades.length === 0)
            return left({ error: new ResourceNotFoundError('Atividades') })

        return right({ atividades })
    }
}