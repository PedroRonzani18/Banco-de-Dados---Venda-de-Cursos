import { Either, left, right } from "@/core/types/either"
import { AulaAssistida } from "../../../@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListAulaAssistidasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aulaAssistidas: AulaAssistida[] }
>

export class ListAulaAssistidasUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute(): Promise<ListAulaAssistidasUseCaseResponse> {

        const aulaAssistidas = await this.aulaAssistidasRepository.list()

        if(aulaAssistidas.length === 0)
            return left({ error: new ResourceNotFoundError('AulaAssistidas') })

        return right({ aulaAssistidas })
    }
}