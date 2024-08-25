import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { Professor } from "../../../@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"
import { FindProfessorByNomeUseCase } from "../findProfessorByNome/findProfessorByNomeUseCase"

interface CreateProfessorUseCaseRequest {
    nome: string
}

type CreateProfessorUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { professor: Professor }
>

export class CreateProfessorUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute({ nome }: CreateProfessorUseCaseRequest): Promise<CreateProfessorUseCaseResponse> {

        const findProfessorByNomeUseCase = new FindProfessorByNomeUseCase(this.professorsRepository)

        const possibleProfessor = await findProfessorByNomeUseCase.execute({ nome })

        if (possibleProfessor.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Professor ${nome}`) })

        const professor = await this.professorsRepository.create({ nome })

        return right({ professor })
    }
}