import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoTema } from "@/domain/cursos/@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"

interface DeleteTopicoTemaUseCaseRequest {
    id: number
}

type DeleteTopicoTemaUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoTema: TopicoTema }
>

export class DeleteTopicoTemaUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute({ id }: DeleteTopicoTemaUseCaseRequest): Promise<DeleteTopicoTemaUseCaseResponse> {

        const topicoTema = await this.topicoTemasRepository.delete(id)
        if (!topicoTema)
            return left({ error: new ResourceNotFoundError("TopicoTema") })

        return right({ topicoTema })
    }
}