import { Either, left, right } from "@/core/types/either"
import { Professor } from "../../../@entities/professor"
import { ProfessorsRepository } from "../../repositories/professorInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListProfessorsUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { professors: Professor[] }
>

export class ListProfessorsUseCase {

    constructor(private professorsRepository: ProfessorsRepository) { }

    async execute(): Promise<ListProfessorsUseCaseResponse> {

        const professors = await this.professorsRepository.list()

        if(professors.length === 0)
            return left({ error: new ResourceNotFoundError('Professors') })

        return right({ professors })
    }
}