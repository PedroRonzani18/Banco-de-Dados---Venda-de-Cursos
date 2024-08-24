import { Either, left, right } from "@/core/types/either"
import { Aula } from "../../../@entities/aula"
import { AulasRepository } from "../../repositories/aulaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListAulasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { aulas: Aula[] }
>

export class ListAulasUseCase {

    constructor(private aulasRepository: AulasRepository) { }

    async execute(): Promise<ListAulasUseCaseResponse> {

        const aulas = await this.aulasRepository.list()

        if(aulas.length === 0)
            return left({ error: new ResourceNotFoundError('Aulas') })

        return right({ aulas })
    }
}