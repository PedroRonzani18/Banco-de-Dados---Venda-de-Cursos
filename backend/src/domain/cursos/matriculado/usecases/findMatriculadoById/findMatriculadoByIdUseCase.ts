import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Matriculado } from "@/domain/cursos/@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"

interface FindMatriculadoByIdUseCaseRequest {
    id: number
}

type FindMatriculadoByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { matriculado: Matriculado }
>

export class FindMatriculadoByIdUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute({ id }: FindMatriculadoByIdUseCaseRequest): Promise<FindMatriculadoByIdUseCaseResponse> {

        const matriculado = await this.matriculadosRepository.findById(id)
        if (!matriculado)
            return left({error: new ResourceNotFoundError("Matriculado")})

        return right({ matriculado })
    }
}