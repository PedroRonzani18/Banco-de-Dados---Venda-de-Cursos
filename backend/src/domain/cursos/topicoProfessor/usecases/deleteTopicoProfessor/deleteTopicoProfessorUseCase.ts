import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoProfessor } from "@/domain/cursos/@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"

interface DeleteTopicoProfessorUseCaseRequest {
    id: number
}

type DeleteTopicoProfessorUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoProfessor: TopicoProfessor }
>

export class DeleteTopicoProfessorUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute({ id }: DeleteTopicoProfessorUseCaseRequest): Promise<DeleteTopicoProfessorUseCaseResponse> {

        const topicoProfessor = await this.topicoProfessorsRepository.delete(id)
        if (!topicoProfessor)
            return left({ error: new ResourceNotFoundError("TopicoProfessor") })

        return right({ topicoProfessor })
    }
}