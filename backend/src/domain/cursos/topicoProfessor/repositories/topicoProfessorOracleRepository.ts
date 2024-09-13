import { oracleConnection } from "@/core/db/oracle";
import { TopicoProfessorProps, TopicoProfessor, UpdateTopicoProfessorProps } from "../../@entities/topicoProfessor";
import { TopicoProfessorsRepository } from "./topicoProfessorInterfaceRepository";

export class TopicoProfessorsOracleRepository implements TopicoProfessorsRepository {
    async create(data: TopicoProfessorProps): Promise<TopicoProfessor> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.TOPICOPROFESSOR(IDPROFESSOR, IDTOPICO) VALUES (${data.idProfessor}, ${data.idTopico})`)

        await oracleConnection.commit()

        return new TopicoProfessor(data)
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
