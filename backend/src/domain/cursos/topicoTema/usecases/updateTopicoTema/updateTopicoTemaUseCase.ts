import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { TopicoTema, UpdateTopicoTemaProps } from "../../../@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateTopicoTemaUseCaseRequest {
    id: number
    data: UpdateTopicoTemaProps
}

type UpdateTopicoTemaUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topicoTema: TopicoTema }
>

export class UpdateTopicoTemaUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute({ id, data }: UpdateTopicoTemaUseCaseRequest): Promise<UpdateTopicoTemaUseCaseResponse> {

        const topicoTema = await this.topicoTemasRepository.update(id, data)

        if (!topicoTema)
            return left({ error: new ResourceNotFoundError(`TopicoTema ${id}`) })

        return right({ topicoTema })
    }
}