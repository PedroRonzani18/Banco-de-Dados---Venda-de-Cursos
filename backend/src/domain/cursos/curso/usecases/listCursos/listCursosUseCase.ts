import { Either, left, right } from "@/core/types/either"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListCursosUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { cursos: Curso[] }
>

export class ListCursosUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute(): Promise<ListCursosUseCaseResponse> {

        const cursos = await this.cursosRepository.list()

        if(cursos.length === 0)
            return left({ error: new ResourceNotFoundError('Cursos') })

        return right({ cursos })
    }
}