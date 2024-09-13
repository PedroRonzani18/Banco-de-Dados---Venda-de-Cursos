import { Either, left, right } from "@/core/types/either"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListCursosByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { cursos: Curso[] }
>

interface ListCursosByIdUseCaseRequest {
    id: number
}

export class ListCursosByIdUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ id } : ListCursosByIdUseCaseRequest): Promise<ListCursosByIdUseCaseResponse> {

        const cursos = await this.cursosRepository.listById(id)

        if(cursos.length === 0)
            return left({ error: new ResourceNotFoundError('Cursos') })

        return right({ cursos })
    }
}