import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Professor } from "@/domain/cursos/@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"

interface FindProfessorByIdUseCaseRequest {
    id: string
}

type FindProfessorByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { professor: Professor }
>

export class FindProfessorByIdUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute({ id }: FindProfessorByIdUseCaseRequest): Promise<FindProfessorByIdUseCaseResponse> {

        const professor = await this.professorsRepository.findById(id)
        if (!professor)
            return left({error: new ResourceNotFoundError("Professor")})

        return right({ professor })
    }
}