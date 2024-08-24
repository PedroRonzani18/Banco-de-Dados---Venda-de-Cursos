import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { Professor } from "@/domain/cursos/@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"

interface FindProfessorByNomeUseCaseRequest {
    nome: string
}

type FindProfessorByNomeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { professor: Professor }
>

export class FindProfessorByNomeUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute({ nome }: FindProfessorByNomeUseCaseRequest): Promise<FindProfessorByNomeUseCaseResponse> {

        const professor = await this.professorsRepository.findByNome(nome)
        if (!professor)
            return left({ error: new ResourceNotFoundError("Professor") })

        return right({ professor })
    }
}