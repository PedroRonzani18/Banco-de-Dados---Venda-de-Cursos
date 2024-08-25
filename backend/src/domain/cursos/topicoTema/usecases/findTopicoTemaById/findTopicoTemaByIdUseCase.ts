import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoTema } from "@/domain/cursos/@entities/topicoTema"
import { TopicoTemasRepository } from "../../repositories/topicoTemaInterfaceRepository"

interface FindTopicoTemaByIdUseCaseRequest {
    id: number
}

type FindTopicoTemaByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoTema: TopicoTema }
>

export class FindTopicoTemaByIdUseCase {

    constructor(private topicoTemasRepository: TopicoTemasRepository) { }

    async execute({ id }: FindTopicoTemaByIdUseCaseRequest): Promise<FindTopicoTemaByIdUseCaseResponse> {

        const topicoTema = await this.topicoTemasRepository.findById(id)
        if (!topicoTema)
            return left({error: new ResourceNotFoundError("TopicoTema")})

        return right({ topicoTema })
    }
}