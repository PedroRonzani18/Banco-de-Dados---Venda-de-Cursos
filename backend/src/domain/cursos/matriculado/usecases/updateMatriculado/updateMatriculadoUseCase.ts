import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Matriculado, UpdateMatriculadoProps } from "../../../@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateMatriculadoUseCaseRequest {
    id: number
    data: UpdateMatriculadoProps
}

type UpdateMatriculadoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { matriculado: Matriculado }
>

export class UpdateMatriculadoUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute({ id, data }: UpdateMatriculadoUseCaseRequest): Promise<UpdateMatriculadoUseCaseResponse> {

        const matriculado = await this.matriculadosRepository.update(id, data)

        if (!matriculado)
            return left({ error: new ResourceNotFoundError(`Matriculado ${id}`) })

        return right({ matriculado })
    }
}