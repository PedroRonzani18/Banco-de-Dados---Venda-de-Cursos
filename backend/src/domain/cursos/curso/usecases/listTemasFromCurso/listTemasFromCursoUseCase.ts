import { Either, left, right } from "@/core/types/either"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTemasFromCursoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { temas: string[] }
>

interface ListTemasFromCursoUseCaseRequest {
    id: number
}

export class ListTemasFromCursoUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id } : ListTemasFromCursoUseCaseRequest): Promise<ListTemasFromCursoUseCaseResponse> {

        const temas = await this.cursosRepository.listTemasFromCurso(id)

        if(temas.length === 0)
            return left({ error: new ResourceNotFoundError('Cursos') })

        return right({ temas })
    }
}