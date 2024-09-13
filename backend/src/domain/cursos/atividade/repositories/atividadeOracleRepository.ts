import { oracleConnection } from "@/core/db/oracle";
import { AtividadeProps, Atividade, UpdateAtividadeProps } from "../../@entities/atividade";
import { AtividadesRepository } from "./atividadeInterfaceRepository";

export class AtividadesOracleRepository implements AtividadesRepository {
    async create(idAula: number, data: AtividadeProps): Promise<Atividade> {

        await oracleConnection.execute(`
            INSERT INTO ECLBDIT215.ATIVIDADE(ENUNCIADO, TITULO, IDAULA, NUMERO) VALUES ('${data.enunciado}', '${data.titulo}', ${idAula}, 0)
        `); 

        await oracleConnection.commit();

        const result = await oracleConnection.execute(`SELECT IDATIVIDADE FROM ECLBDIT215.ATIVIDADE WHERE ENUNCIADO = '${data.enunciado}' AND TITULO = '${data.titulo}' AND IDAULA = ${idAula}`);

        const id = (result.rows as any[][])?.[0]?.[0];

        return new Atividade(data, id);
    }
    findByTituloIdAula(titulo: string, idAula: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Atividade[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: UpdateAtividadeProps): Promise<Atividade | null> {
        throw new Error("Method not implemented.");
    }
}
