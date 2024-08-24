import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Matriculado } from "../../../@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"
import { FindMatriculadoByUsuarioCursoUseCase } from "../findMatriculadoByUsuarioCurso/findMatriculadoByUsuarioCursoUseCase"

interface CreateMatriculadoUseCaseRequest {
    usuarioId: string
    cursoId: string
    dataMatricula: Date
}

type CreateMatriculadoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { matriculado: Matriculado }
>

export class CreateMatriculadoUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute({ cursoId, usuarioId, dataMatricula }: CreateMatriculadoUseCaseRequest): Promise<CreateMatriculadoUseCaseResponse> {

        const findMatriculadoByUsuarioCursoUseCase = new FindMatriculadoByUsuarioCursoUseCase(this.matriculadosRepository)

        const possibleMatriculado = await findMatriculadoByUsuarioCursoUseCase.execute({ cursoId, usuarioId })

        if (possibleMatriculado.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Usuario ${usuarioId} matriculado no curso ${cursoId}`) })

        const matriculado = await this.matriculadosRepository.create({cursoId, dataMatricula ,usuarioId})

        return right({ matriculado })
    }
}