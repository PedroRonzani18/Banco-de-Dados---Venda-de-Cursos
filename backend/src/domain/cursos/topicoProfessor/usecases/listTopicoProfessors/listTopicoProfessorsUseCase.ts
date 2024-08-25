import { Either, left, right } from "@/core/types/either"
import { TopicoProfessor } from "../../../@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

type ListTopicoProfessorsUseCaseResponse = Either<
    { error: ResourceNotFoundError },
    { topicoProfessors: TopicoProfessor[] }
>

export class ListTopicoProfessorsUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute(): Promise<ListTopicoProfessorsUseCaseResponse> {

        const topicoProfessors = await this.topicoProfessorsRepository.list()

        if(topicoProfessors.length === 0)
            return left({ error: new ResourceNotFoundError('TopicoProfessors') })

        return right({ topicoProfessors })
    }
}