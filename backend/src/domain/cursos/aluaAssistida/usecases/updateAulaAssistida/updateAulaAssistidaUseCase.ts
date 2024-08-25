import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { AulaAssistida, UpdateAulaAssistidaProps } from "../../../@entities/aulaAssistida"
import { AulaAssistidasRepository } from "../../repositories/aulaAssistidaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAulaAssistidaUseCaseRequest {
    id: number
    data: UpdateAulaAssistidaProps
}

type UpdateAulaAssistidaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { aulaAssistida: AulaAssistida }
>

export class UpdateAulaAssistidaUseCase {

    constructor(private aulaAssistidasRepository: AulaAssistidasRepository) { }

    async execute({ id, data }: UpdateAulaAssistidaUseCaseRequest): Promise<UpdateAulaAssistidaUseCaseResponse> {

        const aulaAssistida = await this.aulaAssistidasRepository.update(id, data)

        if (!aulaAssistida)
            return left({ error: new ResourceNotFoundError(`AulaAssistida ${id}`) })

        return right({ aulaAssistida })
    }
}