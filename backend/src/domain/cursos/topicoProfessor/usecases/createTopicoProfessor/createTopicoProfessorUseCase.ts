import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { TopicoProfessor } from "../../../@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"
import { FindTopicoProfessorByNomeUseCase } from "../findTopicoProfessorByNome/findTopicoProfessorByNomeUseCase"

interface CreateTopicoProfessorUseCaseRequest {
    idProfessor: number
    idTopico: number
}

type CreateTopicoProfessorUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topicoProfessor: TopicoProfessor }
>

export class CreateTopicoProfessorUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute({ idProfessor, idTopico }: CreateTopicoProfessorUseCaseRequest): Promise<CreateTopicoProfessorUseCaseResponse> {

        const findTopicoProfessorByNomeUseCase = new FindTopicoProfessorByNomeUseCase(this.topicoProfessorsRepository)

        const possibleTopicoProfessor = await findTopicoProfessorByNomeUseCase.execute({ idProfessor, idTopico })

        if (possibleTopicoProfessor.isRight())
            return left({ error: new ResourceAlreadyExistsError(`Professor ${idProfessor} no Tópico ${idTopico}` ) })

        const topicoProfessor = await this.topicoProfessorsRepository.create({ idProfessor, idTopico })

        return right({ topicoProfessor })
    }
}