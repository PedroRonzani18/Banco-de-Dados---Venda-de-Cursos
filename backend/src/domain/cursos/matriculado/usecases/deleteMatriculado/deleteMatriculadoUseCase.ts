import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Matriculado } from "@/domain/cursos/@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"

interface DeleteMatriculadoUseCaseRequest {
    id: string
}

type DeleteMatriculadoUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { matriculado: Matriculado }
>

export class DeleteMatriculadoUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute({ id }: DeleteMatriculadoUseCaseRequest): Promise<DeleteMatriculadoUseCaseResponse> {

        const matriculado = await this.matriculadosRepository.delete(id)
        if (!matriculado)
            return left({ error: new ResourceNotFoundError("Matriculado") })

        return right({ matriculado })
    }
}