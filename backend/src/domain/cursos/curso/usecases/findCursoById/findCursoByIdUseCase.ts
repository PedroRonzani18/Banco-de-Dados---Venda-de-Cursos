import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Curso } from "@/domain/cursos/@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"

interface FindCursoByIdUseCaseRequest {
    id: number
}

type FindCursoByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { curso: Curso }
>

export class FindCursoByIdUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id }: FindCursoByIdUseCaseRequest): Promise<FindCursoByIdUseCaseResponse> {

        const curso = await this.cursosRepository.findById(id)
        if (!curso)
            return left({error: new ResourceNotFoundError("Curso")})

        return right({ curso })
    }
}