import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Professor } from "@/domain/cursos/@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"

interface DeleteProfessorUseCaseRequest {
    id: string
}

type DeleteProfessorUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { professor: Professor }
>

export class DeleteProfessorUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute({ id }: DeleteProfessorUseCaseRequest): Promise<DeleteProfessorUseCaseResponse> {

        const professor = await this.professorsRepository.delete(id)
        if (!professor)
            return left({ error: new ResourceNotFoundError("Professor") })

        return right({ professor })
    }
}