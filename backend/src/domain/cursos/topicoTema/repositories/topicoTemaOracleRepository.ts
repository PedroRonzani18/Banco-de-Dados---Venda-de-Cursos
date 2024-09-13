import { oracleConnection } from "@/core/db/oracle";
import { TopicoTemaProps, TopicoTema, UpdateTopicoTemaProps } from "../../@entities/topicoTema";
import { TopicoTemasRepository } from "./topicoTemaInterfaceRepository";

export class TopicoTemasOracleRepository implements TopicoTemasRepository {
    async create(data: TopicoTemaProps): Promise<TopicoTema> {

        await oracleConnection.execute(`INSERT INTO ECLBDIT215.TOPICOTEMA(IDTOPICO, IDTEMA) VALUES (${data.idTopico}, ${data.idTema})`)
        await oracleConnection.commit()

        return new TopicoTema(data)
    }
    
    findByIdTopicoTema(idTopico: number, idTema: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<TopicoTema[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateTopicoTemaProps): Promise<TopicoTema | null> {
        throw new Error("Method not implemented.");
    }
}
