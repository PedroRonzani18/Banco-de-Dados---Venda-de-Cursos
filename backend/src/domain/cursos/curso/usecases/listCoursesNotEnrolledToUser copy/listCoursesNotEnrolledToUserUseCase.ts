import { Either, left, right } from "@/core/types/either"
import { Curso } from "../../../@entities/curso"
import { CursosRepository } from "../../repositories/cursoInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListCoursesNotEnrolledToUserUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { cursos: Curso[] }
>

interface ListCoursesNotEnrolledToUserUseCaseRequest {
    userid: number
}

export class ListCoursesNotEnrolledToUserUseCase {

    constructor(private cursosRepository: CursosRepository) { }

    async execute({ userid } : ListCoursesNotEnrolledToUserUseCaseRequest): Promise<ListCoursesNotEnrolledToUserUseCaseResponse> {

        const cursos = await this.cursosRepository.listCoursesNotEnrolledToUser(userid)
        if(cursos.length === 0)
            return left({ error: new ResourceNotFoundError(`Cursos com ${userid} matriculado`) })

        return right({ cursos })
    }
}