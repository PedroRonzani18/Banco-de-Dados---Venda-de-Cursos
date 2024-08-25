import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoProfessor } from "@/domain/cursos/@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"

interface FindTopicoProfessorByNomeUseCaseRequest {
    idProfessor: number
    idTopico: number
}

type FindTopicoProfessorByNomeUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoProfessor: TopicoProfessor }
>

export class FindTopicoProfessorByNomeUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute({ idProfessor, idTopico }: FindTopicoProfessorByNomeUseCaseRequest): Promise<FindTopicoProfessorByNomeUseCaseResponse> {

        const topicoProfessor = await this.topicoProfessorsRepository.findByIdProfessorTopico(idProfessor, idTopico)
        if (!topicoProfessor)
            return left({ error: new ResourceNotFoundError("TopicoProfessor") })

        return right({ topicoProfessor })
    }
}