import { Either, left, right } from "@/core/types/either"
import { Matriculado } from "../../../@entities/matriculado"
import { MatriculadosRepository } from "../../repositories/matriculadoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListMatriculadosUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { matriculados: Matriculado[] }
>

export class ListMatriculadosUseCase {

    constructor(private matriculadosRepository: MatriculadosRepository) { }

    async execute(): Promise<ListMatriculadosUseCaseResponse> {

        const matriculados = await this.matriculadosRepository.list()

        if(matriculados.length === 0)
            return left({ error: new ResourceNotFoundError('Matriculados') })

        return right({ matriculados })
    }
}