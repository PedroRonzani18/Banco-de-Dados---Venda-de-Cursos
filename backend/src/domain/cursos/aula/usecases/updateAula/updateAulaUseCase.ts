import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Aula } from "../../../@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateAulaUseCaseRequest {
    id: string
    enunciado: string
    titulo: string
}

type UpdateAulaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { aula: Aula }
>

export class UpdateAulaUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute({ id, ...data }: UpdateAulaUseCaseRequest): Promise<UpdateAulaUseCaseResponse> {

        const aula = await this.aulasRepository.update(id, data)

        if (!aula)
            return left({ error: new ResourceNotFoundError(`Aula ${id}`) })

        return right({ aula })
    }
}