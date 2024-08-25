import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"
import { Either, left, right } from "@/core/types/either"
import { TopicoProfessor } from "@/domain/cursos/@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"

interface FindTopicoProfessorByIdUseCaseRequest {
    id: number
}

type FindTopicoProfessorByIdUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoProfessor: TopicoProfessor }
>

export class FindTopicoProfessorByIdUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute({ id }: FindTopicoProfessorByIdUseCaseRequest): Promise<FindTopicoProfessorByIdUseCaseResponse> {

        const topicoProfessor = await this.topicoProfessorsRepository.findById(id)
        if (!topicoProfessor)
            return left({error: new ResourceNotFoundError("TopicoProfessor")})

        return right({ topicoProfessor })
    }
}