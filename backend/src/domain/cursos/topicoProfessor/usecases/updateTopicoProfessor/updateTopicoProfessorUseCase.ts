import { Either, left, right } from "@/core/types/either"
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error"
import { TopicoProfessor, UpdateTopicoProfessorProps } from "../../../@entities/topicoProfessor"
import { TopicoProfessorsRepository } from "../../repositories/topicoProfessorInterfaceRepository"
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error"

interface UpdateTopicoProfessorUseCaseRequest {
    id: number
    data: UpdateTopicoProfessorProps
}

type UpdateTopicoProfessorUseCaseResponse = Either<
    { error: ResourceAlreadyExistsError },
    { topicoProfessor: TopicoProfessor }
>

export class UpdateTopicoProfessorUseCase {

    constructor(private topicoProfessorsRepository: TopicoProfessorsRepository) { }

    async execute({ id, data }: UpdateTopicoProfessorUseCaseRequest): Promise<UpdateTopicoProfessorUseCaseResponse> {

        const topicoProfessor = await this.topicoProfessorsRepository.update(id, data)

        if (!topicoProfessor)
            return left({ error: new ResourceNotFoundError(`TopicoProfessor ${id}`) })

        return right({ topicoProfessor })
    }
}