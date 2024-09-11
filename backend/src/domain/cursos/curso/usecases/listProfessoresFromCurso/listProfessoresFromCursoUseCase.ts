import { Either, left, right } from "@/core/types/either"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListProfessoresFromCursoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { professores: string[] }
>

interface ListProfessoresFromCursoUseCaseRequest {
    id: number
}

export class ListProfessoresFromCursoUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id } : ListProfessoresFromCursoUseCaseRequest): Promise<ListProfessoresFromCursoUseCaseResponse> {

        const professores = await this.cursosRepository.listProfessoresFromCurso(id)

        if(professores.length === 0)
            return left({ error: new ResourceNotFoundError('Cursos') })

        return right({ professores })
    }
}