import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Curso } from "@/domain/cursos/@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"

interface DeleteCursoUseCaseRequest {
    id: string
}

type DeleteCursoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { curso: Curso }
>

export class DeleteCursoUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id }: DeleteCursoUseCaseRequest): Promise<DeleteCursoUseCaseResponse> {

        const curso = await this.cursosRepository.delete(id)
        if (!curso)
            return left({ error: new ResourceNotFoundError("Curso") })

        return right({ curso })
    }
}