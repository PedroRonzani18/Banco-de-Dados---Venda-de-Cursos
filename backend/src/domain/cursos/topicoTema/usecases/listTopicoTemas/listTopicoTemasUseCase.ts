import { Either, left, right } from "@/core/types/either"
import { TopicoTema } from "../../../@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTopicoTemasUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoTemas: TopicoTema[] }
>

export class ListTopicoTemasUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute(): Promise<ListTopicoTemasUseCaseResponse> {

        const topicoTemas = await this.topicoTemasRepository.list()

        if(topicoTemas.length === 0)
            return left({ error: new ResourceNotFoundError('TopicoTemas') })

        return right({ topicoTemas })
    }
}