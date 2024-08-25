import { TopicoProfessor, TopicoProfessorProps, UpdateTopicoProfessorProps } from "../../@entities/topicoProfessor"

export interface TopicoProfessorsRepository {
    create(data: TopicoProfessorProps): Promise<TopicoProfessor>
    findByIdProfessorTopico(idProfessor: number, idTopico: number): Promise<TopicoProfessor | null>
    findById(id: number): Promise<TopicoProfessor | null>
    list(): Promise<TopicoProfessor[]>
    delete(id: number): Promise<TopicoProfessor | null>
    update(id: number, data: UpdateTopicoProfessorProps): Promise<TopicoProfessor | null>
}