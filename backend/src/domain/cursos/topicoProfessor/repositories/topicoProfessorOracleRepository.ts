import { TopicoProfessorProps, TopicoProfessor, UpdateTopicoProfessorProps } from "../../@entities/topicoProfessor";
import { TopicoProfessorsRepository } from "./topicoProfessorInterfaceRepository";

export class TopicoProfessorsOracleRepository implements TopicoProfessorsRepository {
    create(data: TopicoProfessorProps): Promise<TopicoProfessor> {
        throw new Error("Method not implemented.");
    }
    findByIdProfessorTopico(idProfessor: number, idTopico: number): Promise<TopicoProfessor | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<TopicoProfessor | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<TopicoProfessor[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<TopicoProfessor | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateTopicoProfessorProps): Promise<TopicoProfessor | null> {
        throw new Error("Method not implemented.");
    }
}
