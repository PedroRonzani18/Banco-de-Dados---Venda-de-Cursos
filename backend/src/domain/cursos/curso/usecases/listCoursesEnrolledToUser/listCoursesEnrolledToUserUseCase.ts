import { Either, left, right } from "@/core/types/either"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListCoursesEnrolledToUserUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { cursos: Curso[] }
>

interface ListCoursesEnrolledToUserUseCaseRequest {
    userid: number
}

export class ListCoursesEnrolledToUserUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ userid } : ListCoursesEnrolledToUserUseCaseRequest): Promise<ListCoursesEnrolledToUserUseCaseResponse> {

        const cursos = await this.cursosRepository.listCoursesEnrolledToUser(userid)
        if(cursos.length === 0)
            return left({ error: new ResourceNotFoundError(`Cursos com ${userid} matriculado`) })

        return right({ cursos })
    }
}