import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Matriculado } from "@/domain/cursos/@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"

interface FindMatriculadoByUsuarioCursoUseCaseRequest {
    usuarioId: number
    cursoId: number
}

type FindMatriculadoByUsuarioCursoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { matriculado: Matriculado }
>

export class FindMatriculadoByUsuarioCursoUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute({ cursoId, usuarioId }: FindMatriculadoByUsuarioCursoUseCaseRequest): Promise<FindMatriculadoByUsuarioCursoUseCaseResponse> {

        const matriculado = await this.matriculadosRepository.findByUsuarioCurso(cursoId, usuarioId)
        if (!matriculado)
            return left({ error: new ResourceNotFoundError("Matriculado") })

        return right({ matriculado })
    }
}