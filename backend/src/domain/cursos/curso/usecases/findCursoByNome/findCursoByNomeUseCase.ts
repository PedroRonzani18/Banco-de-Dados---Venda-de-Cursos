import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Curso } from "@/domain/cursos/@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"

interface FindCursoByNomeUseCaseRequest {
    nome: string
}

type FindCursoByNomeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { curso: Curso }
>

export class FindCursoByNomeUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ nome }: FindCursoByNomeUseCaseRequest): Promise<FindCursoByNomeUseCaseResponse> {

        const curso = await this.cursosRepository.findByNome(nome)
        if (!curso)
            return left({ error: new ResourceNotFoundError("Curso") })

        return right({ curso })
    }
}