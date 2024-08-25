import { Either, left, right } from "@/core/types/either"
import { Tema } from "../../../@entities/tema"
import { TemasRepository } from "../../repositories/temaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTemasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { temas: Tema[] }
>

export class ListTemasUseCase {

    constructor(private temasRepository: TemasRepository) { }

    async execute(): Promise<ListTemasUseCaseResponse> {

        const temas = await this.temasRepository.list()

        if(temas.length === 0)
            return left({ error: new ResourceNotFoundError('Temas') })

        return right({ temas })
    }
}