import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Curso, UpdateCursoProps } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateCursoUseCaseRequest {
    id: string
    data: UpdateCursoProps
}

type UpdateCursoUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { curso: Curso }
>

export class UpdateCursoUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id, data }: UpdateCursoUseCaseRequest): Promise<UpdateCursoUseCaseResponse> {

        const curso = await this.cursosRepository.update(id, data)

        if (!curso)
            return left({ error: new ResourceNotFoundError(`Curso ${id}`) })

        return right({ curso })
    }
}