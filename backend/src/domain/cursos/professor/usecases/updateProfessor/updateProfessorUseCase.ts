import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Professor } from "../../../@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateProfessorUseCaseRequest {
    id: string
    nome: string
}

type UpdateProfessorUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { professor: Professor }
>

export class UpdateProfessorUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute({ id, ...data }: UpdateProfessorUseCaseRequest): Promise<UpdateProfessorUseCaseResponse> {

        const professor = await this.professorsRepository.update(id, data)

        if (!professor)
            return left({ error: new ResourceNotFoundError(`Professor ${id}`) })

        return right({ professor })
    }
}